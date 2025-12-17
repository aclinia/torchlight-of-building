# UI Development Guide

## Pages

- `src/app/page.tsx` - Saves manager (list/create/delete saves)
- `src/app/builder/page.tsx` - Main builder (edit current save)
- `src/app/layout.tsx` - Root layout with providers

## Component Organization

Feature-organized in `src/app/components/`:
- `builder/` - Layout, tabs, sections
- `equipment/` - Gear slots, crafting, inventory
- `hero/` - Hero selection, memories, traits
- `talents/` - Talent trees, prisms, inverse images
- `divinity/` - Divinity slate placement
- `pactspirit/` - Pactspirit rings
- `skills/` - Active/passive skill selection
- `modals/` - Import/export dialogs
- `ui/` - Reusable primitives (Modal, SearchableSelect, Tooltip, Toast)

**Naming conventions:**
- `*Section.tsx` - Major UI sections
- `*Selector.tsx` - Selection components
- `*Inventory.tsx` - List/grid displays
- `*Crafter.tsx` - Creation interfaces
- `*Tab.tsx` - Tab content

## Component Patterns

```typescript
"use client";

interface ComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export const MyComponent: React.FC<ComponentProps> = ({ value, onChange }) => {
  // Minimal local state, prefer store integration
  return (
    <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
      {/* content */}
    </div>
  );
};
```

**Client components:** All interactive components use `"use client"` directive

**Props-driven:** Minimal internal state, prefer store integration

**Hydration safety:** Use mounted state for localStorage reads
```typescript
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;
```

## State Integration

Components integrate with stores via hooks:
```typescript
const loadout = useLoadout();
const builderActions = useBuilderActions();
const { selectedSlot } = equipmentUIStore();
```

Feature UI stores hold ephemeral state (crafting in progress, selections):
```typescript
// equipmentUIStore - current crafting state
// talentsUIStore - selected tree/node
// divinityUIStore - slate placement mode
```

## Reusable UI Components

**Modal** - Portal-based dialog with escape key support
```typescript
<Modal isOpen={open} onClose={close} title="Title">
  <ModalDescription>Content here</ModalDescription>
  <ModalActions>
    <ModalButton onClick={close}>Cancel</ModalButton>
    <ModalButton onClick={save} variant="primary">Save</ModalButton>
  </ModalActions>
</Modal>
```

**SearchableSelect** - Headless UI Combobox with filtering
```typescript
<SearchableSelect
  options={options}
  value={value}
  onChange={onChange}
  placeholder="Search..."
  size="sm" | "md" | "lg"
/>
```

**Tooltip** - Hover tooltips with positioning

## Styling (Tailwind CSS 4)

**Dark theme palette:**
- Backgrounds: `bg-zinc-900`, `bg-zinc-800`, `bg-zinc-700`
- Text: `text-zinc-50`, `text-zinc-200`, `text-zinc-400`
- Borders: `border-zinc-700`, `border-zinc-600`
- Accent (amber): `bg-amber-500`, `text-amber-400`
- Success (green): `text-green-500`, `bg-green-500`

**Common patterns:**
- Container: `bg-zinc-900 rounded-lg p-4 border border-zinc-700`
- Interactive: `hover:bg-zinc-700 cursor-pointer`
- Selected: `ring-2 ring-amber-500`
- Disabled: `opacity-50 cursor-not-allowed`
- Focus: `focus:ring-2 focus:ring-amber-500/30 focus:outline-none`
- Spacing: `p-4`, `gap-3`, `gap-4`
- Corners: `rounded-lg`

**Grid layouts:**
```typescript
grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3
```

## Key Files by Task

| Task | Key Files |
|------|-----------|
| Add UI section | `src/app/components/{feature}/`, update `PageTabs.tsx` |
| Add feature UI state | Create `src/app/stores/{feature}UIStore.ts` |
| Add reusable component | `src/app/components/ui/` |
