---
title: Registering Sidebar Panels
description: Learn how to add custom sidebar panels in the ChaiBuilder editor using the registerChaiSidebarPanel function.
keywords:
  [
    ChaiBuilder,
    sidebar panels,
    custom panels,
    web development,
    UI customization,
  ]
slug: developers/registering-sidebar-panels
---

ChaiBuilder allows you to extend its functionality by adding custom panels to the sidebar. This guide explains how to use the `registerChaiSidebarPanel` function to create and register your own sidebar panels.

## Overview

Sidebar panels are UI components that appear in the ChaiBuilder editor's sidebar. They can be used to add custom functionality, settings, or tools to the editor interface. Panels can be positioned at the top or bottom of the sidebar and can be displayed in various formats (standard, modal, overlay, or drawer).

## Installation

First, ensure you have the required package:

```bash
pnpm add @chaibuilder/sdk
```

## Basic Usage

```tsx
import { registerChaiSidebarPanel } from "@chaibuilder/sdk/runtime";

// Define your button component
const MyPanelButton = ({ isActive, show }) => (
  <button
    onClick={show}
    className={isActive ? "active-button" : "normal-button"}>
    My Panel
  </button>
);

// Define your panel component
const MyPanelContent = ({ close }) => (
  <div className="p-4">
    <h2>My Custom Panel</h2>
    <p>Panel content goes here...</p>
    <button onClick={close}>Close</button>
  </div>
);

// Register the panel
registerChaiSidebarPanel("my-custom-panel", {
  position: "top",
  label: "My Panel",
  panel: MyPanelContent,
  button: MyPanelButton,
  width: 350,
  view: "modal",
});
```

## API Reference

### `registerChaiSidebarPanel(panelId, options)`

#### Parameters

- `panelId` (string): Unique identifier for the panel. If a panel with this ID already exists, it will be overridden.

- `options` (object): Configuration options for the panel with the following properties:

| Property   | Type      | Required | Description                                                                                            |
| ---------- | --------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `position` | string    | Yes      | Position of the panel in the sidebar. Values: `"top"` or `"bottom"`.                                   |
| `label`    | string    | Yes      | Display name for the panel. Used for accessibility and tooltips.                                       |
| `button`   | Component | Yes      | React component for the sidebar button that toggles the panel.                                         |
| `panel`    | Component | No       | React component for the panel content.                                                                 |
| `width`    | number    | No       | Width of the panel in pixels. Default is determined by the view type.                                  |
| `view`     | string    | No       | How the panel should be displayed. Values: `"standard"` (default), `"modal"`, `"overlay"`, `"drawer"`. |

#### Button Component Props

| Prop       | Type     | Description                                    |
| ---------- | -------- | ---------------------------------------------- |
| `isActive` | boolean  | Whether the panel is currently active/open.    |
| `show`     | function | Function to open the panel.                    |
| `panelId`  | string   | The ID of the panel.                           |
| `position` | string   | The position of the panel ("top" or "bottom"). |

#### Panel Component Props

| Prop    | Type     | Description                  |
| ------- | -------- | ---------------------------- |
| `close` | function | Function to close the panel. |

#### View Types

| Type         | Description                                     |
| ------------ | ----------------------------------------------- |
| `"standard"` | Panel opens inline in the sidebar (default).    |
| `"modal"`    | Panel opens as a modal dialog.                  |
| `"overlay"`  | Panel opens as an overlay on top of the editor. |
| `"drawer"`   | Panel opens as a drawer from the side.          |

## Panel Types and Examples

### Standard Panel

A standard panel appears directly in the sidebar when activated.

```tsx
registerChaiSidebarPanel("standard-panel", {
  panel: () => <div className="p-4">Standard Panel Content</div>,
  button: ({ isActive, show }) => (
    <button onClick={show} className={isActive ? "bg-blue-500" : "bg-gray-200"}>
      Standard
    </button>
  ),
  label: "Standard Panel",
  position: "top",
  // view: "standard" is the default
});
```

### Modal Panel

A modal panel appears as a dialog box centered on the screen.

```tsx
registerChaiSidebarPanel("modal-panel", {
  panel: ({ close }) => (
    <div className="p-4">
      <h2>Modal Panel</h2>
      <p>This is a modal panel that appears in the center of the screen.</p>
      <button onClick={close}>Close</button>
    </div>
  ),
  button: ({ isActive, show }) => <button onClick={show}>Modal Panel</button>,
  label: "Modal Panel",
  position: "top",
  view: "modal",
  width: 400,
});
```

### Conditional Button Rendering

You can conditionally render buttons based on the editor state:

```tsx
import { useBlocksStore } from "@chaibuilder/sdk";

const ConditionalButton = ({ isActive, show }) => {
  const [blocks] = useBlocksStore();

  // Only show button when canvas is empty
  if (blocks.length > 0) {
    return null;
  }

  return <button onClick={show}>Add First Block</button>;
};

registerChaiSidebarPanel("empty-canvas-panel", {
  panel: ({ close }) => (
    <div>
      <h2>Get Started</h2>
      <p>Your canvas is empty. Add your first block to get started.</p>
      <button onClick={close}>Close</button>
    </div>
  ),
  button: ConditionalButton,
  label: "Empty Canvas Helper",
  position: "top",
  view: "modal",
});
```

### Using UI Libraries

You can use UI libraries like Shadcn UI or other component libraries:

```tsx
import { Button } from "@/ui/shadcn/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/shadcn/components/ui/popover";
import { SettingsIcon } from "lucide-react";

const PopoverPanelButton = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" size="icon">
          <SettingsIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right">
        <div className="p-4">
          <h4 className="font-medium">Quick Settings</h4>
          <p>Adjust common settings here</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

registerChaiSidebarPanel("popover-panel", {
  button: PopoverPanelButton,
  label: "Quick Settings",
  position: "bottom",
});
```

## Integration with ChaiBuilder APIs

### Making API Calls

Use the `useChaiFetch` hook for authenticated API calls:

```tsx
import { useChaiFetch } from "@chaibuilder/pages";

export const ApiPanel = ({ close }) => {
  const fetcher = useChaiFetch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetcher({
        url: "/api/your-endpoint",
        method: "POST",
        body: JSON.stringify({
          // your data
        }),
      });
      setData(response);
      setLoading(false);
    } catch (error) {
      console.error("API call failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2>API Integration</h2>
      <button onClick={handleSave} disabled={loading}>
        {loading ? "Loading..." : "Save"}
      </button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <button onClick={close}>Close</button>
    </div>
  );
};
```

### Accessing Page Information

Use `useChaiCurrentPage` to get information about the current page:

```tsx
import { useChaiCurrentPage } from "@chaibuilder/pages";

export const PageInfoButton = ({ isActive, show }) => {
  const { data, isFetching } = useChaiCurrentPage();

  // Only show for blog pages
  if (isFetching || !data || data.pageType !== "blog") {
    return null;
  }

  return (
    <button onClick={show} className={isActive ? "active" : ""}>
      Blog Settings
    </button>
  );
};
```

## Best Practices

1. **Unique IDs**: Always use unique, descriptive IDs for your panels to avoid conflicts.

2. **Responsive Design**: Ensure your panel content is responsive and works well at different widths.

3. **Error Handling**: Implement proper error handling for API calls and state changes.

4. **Performance**: Keep panel components lightweight to avoid performance issues.

5. **Accessibility**: Ensure your panels are accessible with proper ARIA attributes and keyboard navigation.

6. **Consistent UI**: Follow ChaiBuilder's design patterns for a consistent user experience.

## Troubleshooting

- If your panel doesn't appear, check that you've imported `registerChaiSidebarPanel` from the correct package.

- If your panel button doesn't show up, ensure the `position` property is set correctly.

- For conditional rendering issues, verify that your conditions are working as expected.

- Check the browser console for any errors related to your panel components.
