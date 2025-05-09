The @chaibuilder/sdk is the core foundation of the ChaiBuilder ecosystem. It is a pure React-based website builder that provides all the essential tools and components needed to create and customize websites visually using React and Tailwind CSS.

##Key Features
- Pure React Implementation: Built entirely with React, making it compatible with the React ecosystem
- Tailwind CSS Integration: First-class support for Tailwind CSS styling
- Visual Building Experience: Intuitive interface for rapid website creation
- Framework Agnostic: Can be integrated into any React-based framework
- Rendering API: Helper APIs to render the built pages as either HTML or React components
- Extensibility: Allows extending builder via specific extension points in UI, plus the ability to create custom blocks

## Installation
```bash
pnpm add @chaibuilder/sdk
```

## Basic Usage
To implement the ChaiBuilder SDK in your React application:

Step 1: Add a custom tailwind config. Create a new file: tailwind.chaibuilder.config.ts.

Pass the path to your source files.
```ts
import { getChaiBuilderTailwindConfig } from "@chaibuilder/sdk/tailwind";
export default getChaiBuilderTailwindConfig(["./src/**/*.{js,ts,jsx,tsx}"]);
```

Step 2: Create a new chaibuilder.tailwind.css
```css
@config "./tailwind.chaibuilder.config.ts";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Step 3: Add the builder to your page.
```ts
import "./chaibuilder.tailwind.css";
import "@chaibuilder/sdk/styles";
import {loadWebBlocks} from "@chaibuilder/sdk/web-blocks";
import { ChaiBuilderEditor } from "@chaibuilder/sdk";

loadWebBlocks();

const BuilderFullPage = () => {
  return  (
      <ChaiBuilderEditor
          blocks={[{
	          _type: 'Heading', 
	          _id: 'a', 
	          content: 'This is a heading', 
	          styles: '#styles:,text-3xl font-bold'
	        }]}
          onSave={async ({ blocks, theme } ) => {
            console.log(blocks, theme);
            return true
          }}
      />
  );
}
```

## Rendering Pages
One of the key features of the SDK is the ability to render built pages as both HTML and React components:
```tsx
import {RenderChaiBlocks} from "@chaibuilder/sdk/render";
import type { ChaiType } from "@chaibuilder/sdk";

// Example in NextJS page.tsx
export default async function Page () => {
	// implement your function
	const pageblocks: ChaiBlock[] = await getPageBlocks();
  return <RenderChaiBlocks blocks={pageBlocks} />
}
```

## Extending Builder
The SDK allows you to extend its functionality by adding custom blocks. Also the builder allows you to add/overwrite certain functionality via our extension apis.

- `registerChaiBlock()`
- `registerChaiMediaManager()`
- `registerChaiFont()`
- `registerChaiSidebarPanel()`

### When to Use SDK vs. Pages
Use @chaibuilder/sdk when you want to build your own solution. You will need to handle everything from storage to authentication and more.
Use @chaibuilder/pages when you want a complete solution where everything is handled for you.

> 💡 [Learn more](/docs/chaibuilder-sdk-vs-pages) about @chaibuilder/sdk vs @chaibuklder/pages 

## Open Source
The ChaiBuilder SDK is open source and available on GitHub. Contributions from the community are welcome.