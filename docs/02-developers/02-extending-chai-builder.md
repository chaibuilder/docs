---
title: Extending Chai Builder
description: Learn how to extend Chai Builder with custom functionality using the various extension options available in the SDK.
keywords:
  [
    ChaiBuilder,
    extensions,
    custom functionality,
    sidebar panels,
    custom fonts,
    blocks,
    web development,
  ]
slug: developers/extending-chai-builder
---

# Extending Chai Builder

Chai Builder provides a powerful extension system that allows you to customize and enhance its functionality. This guide covers all the available extension options and how to implement them in your projects.

## Overview

You can extend Chai Builder in various ways:

1. [Add custom blocks](#registering-custom-blocks)
2. [Register sidebar panels](#registering-sidebar-panels)
3. [Add custom fonts](#registering-custom-fonts)
4. [Customize the top bar](#customizing-the-top-bar)
5. [Add custom media manager](#customizing-the-media-manager)
6. [Add custom block settings](#customizing-block-settings)
7. [Add custom "Add Block" tabs](#adding-custom-add-block-tabs)
8. [Add "Save to Library" functionality](#adding-save-to-library-functionality)

## Installation

First, ensure you have the required package:

```bash
pnpm add @chaibuilder/sdk
```

## Basic Setup

Create an extension file in your project (e.g., `extensions.tsx`) and import the necessary functions from `@chaibuilder/sdk` or `@chaibuilder/sdk/runtime`. Then call your extension function in your main application file before initializing Chai Builder.

## Registering Custom Blocks

Custom blocks allow you to add new components to the Chai Builder editor. For detailed information on registering custom blocks, see the [Register Custom Blocks](/docs/developers/custom-blocks/register-custom-blocks) guide.

**Function Signature:**

```tsx
registerChaiBlock<T>(component: React.ComponentType<T>, config: ChaiBlockConfig): void
```

**Parameters:**

- `component`: React component to be used as a block
- `config`: Configuration object for the block (type, category, label, etc.)

## Registering Sidebar Panels

Sidebar panels provide additional UI components in the Chai Builder editor. For detailed information, see the [Register Sidebar Panels](/docs/developers/registering-sidebar-panels) guide.

**Function Signature:**

```tsx
registerChaiSidebarPanel(panelId: string, panelOptions: ChaiSidebarPanel): void
```

**Parameters:**

- `panelId`: Unique identifier for the panel
- `panelOptions`: Configuration object with the following properties:
  - `position`: "top" or "bottom"
  - `label`: Display name for the panel
  - `button`: React component for the sidebar button
  - `panel`: React component for the panel content
  - `width`: (Optional) Width of the panel in pixels
  - `view`: (Optional) "standard", "modal", "overlay", or "drawer"

## Registering Custom Fonts

Custom fonts enhance the typography options in your Chai Builder projects. For detailed information, see the [Register Custom Fonts](/docs/developers/register-custom-fonts) guide.

**Function Signature:**

```tsx
registerChaiFont(fontName: string, options: ChaiFontViaUrl | ChaiFontViaSrc): void
```

**Parameters:**

- `fontName`: Name of the font to register
- `options`: Font configuration, either:
  - `ChaiFontViaUrl`: For fonts loaded via URL (e.g., Google Fonts)
    - `url`: URL to the font stylesheet
    - `fallback`: Fallback font family
  - `ChaiFontViaSrc`: For fonts loaded via source files
    - `fallback`: Fallback font family
    - `src`: Array of font source objects with url and format properties

## Customizing the Top Bar

The top bar is the main navigation bar at the top of the Chai Builder editor.

**Function Signature:**

```tsx
registerChaiTopBar(component: React.ComponentType): void
```

**Parameters:**

- `component`: React component to be used as the top bar

## Customizing the Media Manager

The media manager allows users to select and manage media assets in the editor.

**Function Signature:**

```tsx
registerChaiMediaManager(component: React.ComponentType<MediaManagerProps>): void
```

**Parameters:**

- `component`: React component to be used as the media manager

**MediaManagerProps Interface:**

```tsx
type MediaManagerProps = {
  assetId?: string;
  close: () => void;
  onSelect: (assets: ChaiAsset | ChaiAsset[]) => void;
  mode?: "image" | "video" | "audio";
};
```

## Customizing Block Settings

Block settings allow you to customize how block properties are edited in the editor.

**Function Signatures:**

```tsx
registerBlockSettingWidget(id: string, component: React.ComponentType<any>): void
registerBlockSettingField(id: string, component: React.ComponentType<any>): void
registerBlockSettingTemplate(id: string, component: React.ComponentType<any>): void
```

**Parameters:**

- `id`: Unique identifier for the widget, field, or template
- `component`: React component to be used as the widget, field, or template
  - Widget components receive `{ value, onChange }` props
  - Field components receive field-specific properties
  - Template components receive the entire form structure including children

## Adding Custom "Add Block" Tabs

Add Block tabs appear in the block insertion panel and can be customized.

**Function Signature:**

```tsx
registerChaiAddBlockTab(id: string, tab: AddBlockTab): void
```

**Parameters:**

- `id`: Unique identifier for the tab
- `tab`: Configuration object with the following properties:
  - `tab`: React component for the tab button
  - `tabContent`: React component for the tab content

## Adding Save to Library Functionality

The Save to Library feature allows users to save block configurations for reuse.

**Function Signature:**

```tsx
registerChaiSaveToLibrary(component: ComponentType<SaveToLibraryProps>): void
```

**Parameters:**

- `component`: React component to be used for the Save to Library functionality

**SaveToLibraryProps Interface:**

```tsx
type SaveToLibraryProps = {
  blockId: string;
  blocks: ChaiBlock[];
  close: () => void;
};
```

## Extension Summary

Here's a summary of all the extension functions available in Chai Builder:

```tsx
// Import all extension functions
import {
  registerChaiBlock,
  registerChaiFont,
  registerChaiSidebarPanel,
  registerChaiTopBar,
  registerChaiMediaManager,
  registerBlockSettingWidget,
  registerBlockSettingField,
  registerBlockSettingTemplate,
  registerChaiAddBlockTab,
  registerChaiSaveToLibrary,
} from "@chaibuilder/sdk/runtime";
```

For detailed examples of each extension type, refer to the specific documentation pages linked in the sections above.

## Best Practices

1. **Performance**: Keep your extension components lightweight to avoid impacting editor performance.

2. **Error Handling**: Implement proper error handling in your extension components.

3. **Consistency**: Follow Chai Builder's design patterns for a consistent user experience.

4. **Initialization**: Register all extensions before the Chai Builder editor initializes.

5. **Modularity**: Keep your extension code modular and focused on specific functionality.

## Troubleshooting

- If your extensions aren't appearing, ensure you're calling the extension functions before the Chai Builder editor initializes.

- Check the browser console for any errors related to your extension components.

- Verify that you've imported the extension functions from the correct package.

## Further Reading

- [Register Custom Blocks](/docs/developers/custom-blocks/register-custom-blocks)
- [Register Block Props](/docs/developers/custom-blocks/register-blocks-props)
- [Register Sidebar Panels](/docs/developers/registering-sidebar-panels)
- [Register Custom Fonts](/docs/developers/register-custom-fonts)
