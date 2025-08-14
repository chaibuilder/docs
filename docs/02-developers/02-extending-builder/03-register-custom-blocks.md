---
title: Registering Custom Blocks
---

> Core entry-point for bringing any React component into ChaiBuilder.

`registerChaiBlock` turns a plain React component into a reusable draggable “block” inside the builder.

Think of it as the bridge between **UI code** and **builder UX**.

```ts
registerChaiBlock<T>(Component, Config);
```

| Parameter   | Type                                   | Purpose                         |
| ----------- | -------------------------------------- | ------------------------------- |
| `Component` | `React.FC<ChaiBlockComponentProps<T>>` | What gets rendered on the page  |
| `Config`    | `BlockConfig`                          | How the block appears & behaves |

---

## Minimal Example

```ts
import { registerChaiBlock, ChaiBlockComponentProps } from "chai-next/blocks";
import { styleProp, registerChaiBlockSchema } from "chai-next/blocks";

// 1. Props interface
export type ButtonProps = { text: string; styles: ChaiStyles };

// 2. Component
const Button = ({
  blockProps,
  text,
  styles,
}: ChaiBlockComponentProps<ButtonProps>) => (
  <button {...blockProps} {...styles}>
    {text}
  </button>
);

// 3. Config
const Config = {
  type: "Button",
  label: "Button",
  category: "core",
  group: "basic",
  ...registerChaiBlockSchema({
    properties: {
      text: { type: "string", title: "Text", default: "Click me" },
      styles: styleProp("px-4 py-2 rounded"),
    },
  }),
};

// 4. Register
registerChaiBlock<ButtonProps>(Button, Config);
```

---

## The `BlockConfig` Shape

```ts
{
  type: string;                     // **Required.** Unique id (slug-style).
  label: string;                    // Builder palette label.
  category: string;                 // Broad grouping ("core", "form", …).
  group: string;                    // Fine-grained subgroup.
  icon?: React.FC<IconProps>;       // 20×20 SVG or React icon.
  description?: string;             // Tooltip / docs snippet.
  blocks?: () => ChaiBlock[];       // Default children when dropped.
  canAcceptBlock?: (type: string) => boolean; // Nesting guard.
  canMove?: () => boolean
  canDelete?: () => boolean
  // + any fields returned from registerChaiBlockSchema
}
```

---

## Next Steps

- [**Registering Block Props**](https://www.notion.so/surajair/registering-block-props.md) – Define editable props with JSON Schema
- **Client vs Server Blocks** – When to use RSC, when to stay client-side (WIP)
