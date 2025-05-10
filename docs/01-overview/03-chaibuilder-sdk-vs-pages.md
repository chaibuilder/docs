---
title: Chai Builder SDK vs Pages
description: This page explains the difference between @chaiBuilder/sdk and @chaibuilder/pages packages
---

ChaiBuilder offers two primary methods for creating and deploying websites: **SDK** and **Pages**. Each provides unique functionalities tailored to different user needs and project complexities.

## Chai Builder SDK (Software Development Kit)

The ChaiBuilder SDK is a React library featuring a component that integrates a complete visual website builder directly into your React application. It handles the rendering and editing of website blocks through structured JSON data, which can be saved and fetched by your custom logic.

### Key Features:

* **React Integration:** Easily embed a full-featured visual website builder within your existing React applications.
* **JSON Structure:** Simple structure management—enter structured JSON, edit visually, then export updated JSON.
* **RenderChaiBlock Component:** Directly render JSON structures as HTML using the `RenderChaiBlock` component.
* **Extensible API:** Extend builder functionality through the Extensions API, including custom sidebar panels, custom blocks, custom top bars, and more.

### Best suited for:

* Developers needing deep integration within custom React applications.
* Projects requiring precise control over data handling, storage, and block rendering.
* Teams wanting to build custom extensions and functionalities.

### Limitations:

* Requires manual handling of saving and fetching block data.
* Targeted towards developers familiar with React.

---

## Chai Builder Pages

ChaiBuilder Pages extends the functionality of the SDK by leveraging its Extensions API to provide a fully integrated and user-friendly website-building solution. Pages adds built-in panels for essential website management tasks such as SEO, publishing, version control, language management, and more.

### Key Features:

* **Enhanced Visual Builder:** Pre-configured builder environment optimized for end-users.
* **Built-in Panels:** Integrated SEO management, publishing, restoration of previous versions, and multilingual support.
* **Cloud Service Integration:** Premium service relying on ChaiBuilder cloud infrastructure for data storage and seamless operation.
* **White Label Offering:** Available as a white-label solution for businesses needing branding control and customization.

### Best suited for:

* Users seeking an out-of-the-box, comprehensive website builder.
* Teams preferring minimal development effort and rapid deployment.
* Companies requiring a white-label website builder solution.

### Limitations:

* Dependent on ChaiBuilder’s cloud service (unless utilizing white-label).
* Premium product offering with associated costs.

---

## Comparative Overview

| Aspect                     | SDK                            | Pages                          |
| -------------------------- | ------------------------------ | ------------------------------ |
| **Core Functionality**     | JSON-based visual builder      | Enhanced, integrated builder   |
| **Customization Level**    | High with Extensions API       | Moderate with pre-built panels |
| **Integration Complexity** | Developer-managed integrations | Built-in integrations          |
| **Cloud Dependency**       | None (optional)                | Required (premium offering)    |
| **User Experience**        | Developer-oriented             | End-user friendly              |
| **White-label Solution**   | Custom-built                   | Available as turnkey solution  |

### Decision Guide:

* **Choose SDK** for detailed customization, full control over data and integration, and developer-centric use cases.
* **Choose Pages** for streamlined, ready-to-use, end-user-friendly site-building, supported by ChaiBuilder cloud services, with optional white-label branding.
