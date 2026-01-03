"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

// Global state for "one tooltip at a time" behavior
let activeTooltipId: string | undefined;
let closeActiveTooltip: (() => void) | undefined;

interface UseTooltipReturn {
  isVisible: boolean;
  isPinned: boolean;
  triggerRef: <T extends HTMLElement>(node: T | null) => void;
  triggerRect: DOMRect | undefined;
  tooltipHandlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

export const useTooltip = (): UseTooltipReturn => {
  const tooltipId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | undefined>(
    undefined,
  );
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const triggerHoveredRef = useRef(false);
  const isPinnedRef = useRef(false);

  const hide = useCallback(() => {
    triggerHoveredRef.current = false;
    isPinnedRef.current = false;
    setIsPinned(false);
    setIsVisible(false);
    if (activeTooltipId === tooltipId) {
      activeTooltipId = undefined;
      closeActiveTooltip = undefined;
    }
  }, [tooltipId]);

  const show = useCallback(() => {
    // Close any other open tooltip instantly
    if (activeTooltipId !== tooltipId && closeActiveTooltip) {
      closeActiveTooltip();
    }

    // Register this tooltip as active
    activeTooltipId = tooltipId;
    closeActiveTooltip = hide;

    // Capture trigger element's position
    if (triggerElementRef.current) {
      setTriggerRect(triggerElementRef.current.getBoundingClientRect());
    }

    setIsVisible(true);
  }, [hide, tooltipId]);

  const togglePin = useCallback(() => {
    if (isPinnedRef.current) {
      // Unpin and hide
      hide();
    } else {
      // Pin (show if not already visible)
      isPinnedRef.current = true;
      setIsPinned(true);
      show();
    }
  }, [hide, show]);

  // Refs to always have access to latest callbacks without re-attaching listeners
  const showRef = useRef(show);
  const hideRef = useRef(hide);
  const togglePinRef = useRef(togglePin);

  // Keep refs in sync with latest callbacks
  useEffect(() => {
    showRef.current = show;
    hideRef.current = hide;
    togglePinRef.current = togglePin;
  }, [show, hide, togglePin]);

  // Stable handlers that read from refs - initialized synchronously
  const handlersRef = useRef({
    handleMouseEnter: () => {
      triggerHoveredRef.current = true;
      showRef.current();
    },
    handleMouseLeave: () => {
      triggerHoveredRef.current = false;
      // Only hide if not pinned
      if (!isPinnedRef.current) {
        hideRef.current();
      }
    },
    handleClick: (e: MouseEvent) => {
      // Only toggle pin if clicking on the trigger itself, not child interactive elements
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "INPUT") {
        return;
      }
      togglePinRef.current();
    },
  });

  const triggerRef = useCallback(<T extends HTMLElement>(node: T | null) => {
    // Clean up old element
    if (triggerElementRef.current && handlersRef.current) {
      triggerElementRef.current.removeEventListener(
        "mouseenter",
        handlersRef.current.handleMouseEnter,
      );
      triggerElementRef.current.removeEventListener(
        "mouseleave",
        handlersRef.current.handleMouseLeave,
      );
      triggerElementRef.current.removeEventListener(
        "click",
        handlersRef.current.handleClick,
      );
    }

    // Set up new element
    triggerElementRef.current = node;
    if (node && handlersRef.current) {
      node.addEventListener("mouseenter", handlersRef.current.handleMouseEnter);
      node.addEventListener("mouseleave", handlersRef.current.handleMouseLeave);
      node.addEventListener("click", handlersRef.current.handleClick);
    }
  }, []);

  // Hide pinned tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isPinnedRef.current) return;

      const target = e.target as Node;
      if (
        triggerElementRef.current &&
        !triggerElementRef.current.contains(target)
      ) {
        hideRef.current();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // These handlers are no-ops now since we hide immediately on mouse leave
  // But we keep them for API compatibility with the Tooltip component
  const onTooltipMouseEnter = useCallback(() => {
    // No-op: tooltip hover no longer keeps it visible
  }, []);

  const onTooltipMouseLeave = useCallback(() => {
    // No-op: hiding is handled by trigger mouse leave
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (activeTooltipId === tooltipId) {
        activeTooltipId = undefined;
        closeActiveTooltip = undefined;
      }
    };
  }, [tooltipId]);

  return {
    isVisible,
    isPinned,
    triggerRef,
    triggerRect,
    tooltipHandlers: {
      onMouseEnter: onTooltipMouseEnter,
      onMouseLeave: onTooltipMouseLeave,
    },
  };
};
