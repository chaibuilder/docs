---
title: Registering Custom Fonts
description: Learn how to register and use custom fonts in your Chai Builder projects using the registerChaiFont function.
keywords:
  [
    ChaiBuilder,
    custom fonts,
    web fonts,
    Google Fonts,
    typography,
    web development,
  ]
slug: developers/register-custom-fonts
---

ChaiBuilder allows you to register custom fonts for use in your projects. This guide explains how to register fonts using the `registerChaiFont` function from the `@chaibuilder/sdk/runtime` package.

## Overview

The `registerChaiFont` function allows you to add custom fonts to your Chai Builder project in two ways:

1. Via URL (Google Fonts or other external font services)
2. Via direct source files (local font files)

## Installation

First, ensure you have the required package:

```bash
pnpm add @chaibuilder/sdk
pnpm add @chaibuilder/pages //if you are using @chaibuilder/pages
```

## Usage

Import the necessary functions:

```tsx
import {
  registerChaiFont,
  ChaiFontViaUrl,
  ChaiFontViaSrc,
} from "@chaibuilder/sdk/runtime";

//or

import {
  registerChaiFont,
  ChaiFontViaUrl,
  ChaiFontViaSrc,
} from "chai-next/blocks"; //if you are using chai-next
```

### Method 1: Register Font via URL (e.g., Google Fonts)

```tsx
registerChaiFont("Ubuntu", {
  url: "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
  fallback: `sans-serif`,
} as ChaiFontViaUrl);
```

### Method 2: Register Font via Source Files

```tsx
registerChaiFont("Geist", {
  fallback: `"Geist Fallback", Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol`,
  src: [{ url: "/fonts/Geist.woff", format: "woff" }],
} as ChaiFontViaSrc);
```

## API Reference

### `registerChaiFont(fontName, options)`

#### Parameters

| Parameter  | Type                             | Description                                                                                          |
| ---------- | -------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `fontName` | string                           | The name of the font to register. This will be used in the font selector in the Chai Builder editor. |
| `options`  | ChaiFontViaUrl \| ChaiFontViaSrc | Configuration for the font.                                                                          |

#### ChaiFontViaUrl Options

| Property   | Type   | Description                                                   |
| ---------- | ------ | ------------------------------------------------------------- |
| `url`      | string | URL to the font stylesheet (e.g., Google Fonts URL)           |
| `fallback` | string | Fallback font family to use if the primary font fails to load |

#### ChaiFontViaSrc Options

| Property   | Type   | Description                                                   |
| ---------- | ------ | ------------------------------------------------------------- |
| `fallback` | string | Fallback font family to use if the primary font fails to load |
| `src`      | Array  | Array of font source objects with the following properties:   |

**src Array Item Properties:**

| Property | Type   | Description                                                   |
| -------- | ------ | ------------------------------------------------------------- |
| `url`    | string | Path to the font file                                         |
| `format` | string | Format of the font file (e.g., 'woff', 'woff2', 'ttf', 'otf') |

## Example Implementation

Here's a complete example showing how to register multiple custom fonts in your Chai Builder extension:

```tsx
import {
  ChaiFontViaSrc,
  ChaiFontViaUrl,
  registerChaiFont,
} from "@chaibuilder/sdk/runtime";

export const extendChaiBuilder = () => {
  // Register Google Font
  registerChaiFont("Ubuntu", {
    url: "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
    fallback: `sans-serif`,
  } as ChaiFontViaUrl);

  // Register local font
  registerChaiFont("Geist", {
    fallback: `"Geist Fallback", Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol`,
    src: [{ url: "/fonts/Geist.woff", format: "woff" }],
  } as ChaiFontViaSrc);
};
```

## Best Practices

1. **Provide fallbacks**: Always include fallback fonts to ensure text remains readable if the custom font fails to load.

2. **Font formats**: When using local font files, provide multiple formats (woff2, woff, ttf) for better browser compatibility.

3. **Font licensing**: Ensure you have the proper licenses for any fonts you include in your project.

4. **Performance**: Consider the performance impact of loading multiple custom fonts. Each font adds to the page load time.

## Troubleshooting

- If your font isn't appearing in the font selector, ensure you've called `registerChaiFont` before the Chai Builder editor initializes.

- Check browser console for any font loading errors.

- Verify that font file paths are correct and accessible.
