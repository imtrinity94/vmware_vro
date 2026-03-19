# vRealize Orchestrator (vRO) JavaScript Action Library

![vRO Portal Logo](scripts/image.png)

A comprehensive, standardized library of JavaScript actions for VMware Aria Automation Orchestrator (vRO). Includes utilities for vSphere, vRA, Active Directory, NSX, and more.

## 🚀 Live Documentation Portal
The entire library is searchable and documented with source code previews in our custom portal:
**[👉 View Actions Reference](https://imtrinity94.github.io/vmware_vro/)**

---

## 📂 Project Structure

- `Actions/`: Core vRO action scripts, organized by function/plugin.
- `Library/`: Supplementary utility scripts and legacy helper actions.
- `scripts/`: Custom documentation build system and portal assets.
- `.github/workflows/`: CI/CD pipeline for automatic JSDoc extraction and portal deployment.

## 🛠️ Development & Build

This repository uses a custom Node.js build script to generate a documentation portal from JSDoc comments within the `.js` files.

### Prerequisite:
- [Node.js](https://nodejs.org/) (v18+)

### Local Build:
To build and preview the documentation portal locally:

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the build**:
    ```bash
    npm run build:docs
    ```

3.  **Preview**:
    Open `dist/index.html` in your favorite browser.

## 📜 Coding Standards
- All actions should use **camelCase** for filenames and variables.
- Filenames should follow the **verb + Noun + ExtraInfo** format (e.g., `createVmSnapshot.js`).
- Standard `for` loops are preferred over `for each` for widest compatibility across vRO versions.
- Actions should include proper JSDoc blocks including `@description`, `@param` (with types), and `@returns`.

---
*Created and maintained by [Mayank Goyal](https://github.com/imtrinity94).*
