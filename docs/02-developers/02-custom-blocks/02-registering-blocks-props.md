---
title: Registering Block Props
---

> Editable props are declared with **`registerChaiBlockSchema`**.

Under the hood we use [**react-jsonschema-form (RJSF)**](https://github.com/rjsf-team/react-jsonschema-form) to auto-generate the Settings panel.

```ts
import { registerChaiBlockSchema } from "@chaibuilder/pages/runtime";
```

---

## Basic Usage

```ts
registerChaiBlockSchema({
  properties: {
    title: { type: "string", title: "Heading", default: "Hello" },
    count: { type: "number", title: "Items", default: 3 },
    active: { type: "boolean", title: "Enabled?", default: true },
  },
});
```

RJSF takes the JSON Schema and renders inputs automatically.

### Supported Core Types

- `string`
- `number`
- `boolean`
- `object`
- `array`

---

## Special Helper Props

| Helper                                   | Purpose                                                                                        |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `styleProp(defaultClasses)`              | Concise Tailwind / CSS injection with live preview.                                            |
| `closestBlockProp(targetType, propName)` | Read a prop from the nearest ancestor of type `targetType`. Great for inherited theme colors.  |
| `builderProp()`                          | Exists **only** inside the builder (never shipped to the live page). Use for dev-time toggles. |

**Example:**

```ts
properties: {
  styles: styleProp("px-4 py-2 bg-primary text-white"),
  themeColor: closestBlockProp("Section", "themeColor"),
  debugInfo: builderProp(),
}
```

---

## UI Widgets

Map custom inputs via the `ui:` key (RJSF convention).

```ts
image: {
  type: "string",
  title: "Hero Image",
  ui: { "ui:widget": "image" }
}
```

Built-in widgets: `image`, `richtext`, `color`, `icon`, …
