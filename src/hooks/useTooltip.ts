"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

// Global state for "one tooltip at a time" behavior
let activeTooltipId: string | undefined;
let closeActiveTooltip: (() => void) | undefined;

interface UseTooltipReturn {
  isVisible: boolean;
  triggerRef: <T extends HTMLElement>(node: T | null) => void;
  triggerRect: DOMRect | undefined;
  tooltipHandlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

const HIDE_DELAY_MS = 120;

export const useTooltip = (): UseTooltipReturn => {
  const tooltipId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | undefined>(
    undefined,
  );
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const triggerHoveredRef = useRef(false);
  const tooltipHoveredRef = useRef(false);

  const cancelHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current !== undefined) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = undefined;
    }
  }, []);

  const hide = useCallback(() => {
    cancelHideTimeout();
    triggerHoveredRef.current = false;
    tooltipHoveredRef.current = false;
    setIsVisible(false);
    if (activeTooltipId === tooltipId) {
      activeTooltipId = undefined;
      closeActiveTooltip = undefined;
    }
  }, [cancelHideTimeout, tooltipId]);

  const scheduleHide = useCallback(() => {
    cancelHideTimeout();
    hideTimeoutRef.current = setTimeout(() => {
      if (!triggerHoveredRef.current && !tooltipHoveredRef.current) {
        hide();
      }
    }, HIDE_DELAY_MS);
  }, [cancelHideTimeout, hide]);

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

    cancelHideTimeout();
    setIsVisible(true);
  }, [cancelHideTimeout, hide, tooltipId]);

  // Refs to always have access to latest callbacks without re-attaching listeners
  const showRef = useRef(show);
  const scheduleHideRef = useRef(scheduleHide);

  // Keep refs in sync with latest callbacks
  useEffect(() => {
    showRef.current = show;
    scheduleHideRef.current = scheduleHide;
  }, [show, scheduleHide]);

  // Stable handlers that read from refs - initialized synchronously
  const handlersRef = useRef({
    handleMouseEnter: () => {
      triggerHoveredRef.current = true;
      showRef.current();
    },
    handleMouseLeave: () => {
      triggerHoveredRef.current = false;
      scheduleHideRef.current();
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
    }

    // Set up new element
    triggerElementRef.current = node;
    if (node && handlersRef.current) {
      node.addEventListener("mouseenter", handlersRef.current.handleMouseEnter);
      node.addEventListener("mouseleave", handlersRef.current.handleMouseLeave);
    }
  }, []);

  const onTooltipMouseEnter = useCallback(() => {
    tooltipHoveredRef.current = true;
    cancelHideTimeout();
  }, [cancelHideTimeout]);

  const onTooltipMouseLeave = useCallback(() => {
    tooltipHoveredRef.current = false;
    scheduleHide();
  }, [scheduleHide]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelHideTimeout();
      if (activeTooltipId === tooltipId) {
        activeTooltipId = undefined;
        closeActiveTooltip = undefined;
      }
    };
  }, [cancelHideTimeout, tooltipId]);

  return {
    isVisible,
    triggerRef,
    triggerRect,
    tooltipHandlers: {
      onMouseEnter: onTooltipMouseEnter,
      onMouseLeave: onTooltipMouseLeave,
    },
  };
};
