---
title: Registering Sidebar Panels
---

This doc explains how to add custom sidebar panels in the ChaiBuilder editor.

> `registerChaiSidebarPanel`

The `registerChaiSidebarPanel` function allows you to add custom panels to the ChaiBuilder sidebar.

---

## **Usage**

```ts
import { registerChaiSidebarPanel } from "@chaibuilder/pages";

registerChaiSidebarPanel("panel-id", {
  position: "top",
  label: "Panel Label",
  panel: PanelComponent,
  button: ButtonComponent,
  width: 350,
  view: "modal",
});
```

**Parameters**

- `id` (string): Unique identifier for the panel
- `options` (object): Configuration options for the panel
  - `position` (string): `'top'` or `'bottom'` in sidebar
  - `label` (string): Display name for the panel
  - `panel` (Component): React component to render as the panel content
  - `button` (Component): React component for the toggle button
  - `width` (number): Width in pixels
  - `view` (string): `'modal'`, `'standard'`, `'overlay'`, `'drawer'`

---

## **Panel Component Props**

The panel component receives:

```ts
interface PanelProps {
  close: () => void; // Closes the panel (for modal/overlay/drawer)
}
```

---

## **Button Component Props**

The button component receives:

```ts
interface ButtonProps {
  isActive: boolean; // If the panel is active
  show: () => void; // Call to open the panel
}
```

Use these to:

- Style based on `isActive`
- Trigger panel with `show()`

---

## **Making API Calls**

Use the `useChaiFetch` hook for authenticated fetches:

```ts
import { useChaiFetch } from "@chaibuilder/pages";

export const MyPanelComponent = ({ close }) => {
  const fetcher = useChaiFetch();

  const handleSave = async () => {
    try {
      const response = await fetcher({
        url: "/your-endpoint",
        method: "POST",
        body: JSON.stringify({
          /* your data */
        }),
        headers: {
          /* your headers */
        },
      });

      console.log(response);
      close();
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};
```

`useChaiFetch` adds auth tokens automatically.

---

## **Controlling Panel Visibility**

Use `useChaiCurrentPage` in your button:

```ts
import { useChaiCurrentPage } from "@chaibuilder/pages";

export const MyCustomButton = ({ isActive, show }) => {
  const { data, isFetching } = useChaiCurrentPage();

  if (isFetching || !data || data.pageType !== "blog") {
    return null;
  }

  return (
    <button onClick={show} className={isActive ? "active-class" : ""}>
      {/* Your button content */}
    </button>
  );
};
```

`useChaiCurrentPage` gives:

- `data`: page info (pageType, slug, etc.)
- `isFetching`: boolean for loading

---

## **Example**

```ts
import { BlogueButton } from "./blogue/button";
import { BloguePanel } from "./blogue/panel";
import { registerChaiSidebarPanel } from "@chaibuilder/pages";

export const registerAutoRootPanels = () => {
  registerChaiSidebarPanel("blogue-settings", {
    position: "top",
    label: "Blogue Settings",
    panel: BloguePanel,
    button: BlogueButton,
    width: 350,
    view: "modal",
  });
};
```

This example registers a "Blogue Settings" panel that appears at the top and opens as a modal.
