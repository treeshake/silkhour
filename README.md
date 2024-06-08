# Shopify Store

https://admin.shopify.com/store/vfinejewels

# Access, Permission and Apps

1. Obtain Read/write access to this GitHub Repository
2. From your Partner account, request collaborator access to the Shopify Store
3. Obtain the Theme Access (Shopify App) password token to development, pull, push and publish themes.

Please send your GitHub username, and your email address to the store owner to obtain these access permissions.

# Tech stack

Our store is built based on Shopify's official [Spotlight Theme](https://themes.shopify.com/themes/spotlight/styles/default). This theme is an official theme supplied and supported by Shopify and built using [Liquid](https://shopify.dev/themes/liquid/reference), [JavaScript](https://shopify.dev/themes/javascript-api) and CSS.<br>

In addition, we use the following to develop:

- [Shopify CLI](https://shopify.dev/themes/tools/cli)
- [Node](https://nodejs.org/en/) / [NPM](https://www.npmjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/)

# Development

The following are **mandatory** for all developers working on the Store's theme:

1. Use the [Shopify CLI](https://shopify.dev/themes/tools/cli) for working with themes. <br />
2. Use GitHub for version control and code review. <br />

## Setup

1. Log out of any existing sessions: `shopify auth logout`
2. Log into Shopify CLI: `shopify theme list --store vfinejewels.myshopify.com`

or using `npm`:

```zsh
npm run theme:auth
```

Start a development theme: `shopify theme dev --path src/theme`

or using `npm`:

```
npm run theme:dev
```

## **\*\*IMPORTANT\*\*** Working with the Shopify Theme

**\*\*DO NOT\*\*** modify **any** of the base theme's files e.g. `main-*.liquid`, `*.liquid`, `component-*-.css`, `component-*.css` `*.js` and many others. <br>
This will prevent updating the base theme as new versions of `Spotlight` get released by the Shopify Team.

**\*\*ALWAYS\*\*** create or update custom files labelled with the keyword `custom` and reference them in product|collection `template` jsons and other `custom` files as required. To extend/customize base functionality provided by the theme, simply clone (copy) them over to a new file ensuring the keyword `custom` is in the filename so it can be identified as a custom development file.

For example, if you're wanting to extend the `main-product.liquid` file, copy it to a new file e.g. `custom-main-product-something.liquid` and make the changes there.

## Changes to Javascript (.js) files

Changes to the theme's `.js` files, must be done through the [Modern Tooling Environment](#modern-tooling-environment), MTE. Use either Typescript (preferred) or Javascript. <br /><br />
Please see `src/ts` folder for existing examples. If adding new files, then also remember to update the `webpack.config.js` file so it is included and uploaded to the theme's `assets` folder and can be included in any liquid files.

Example:

```javascript

```

```html
<script src="{{ 'custom-product-list.js' | asset_url }}" defer="defer"></script>
```

# Modern Tooling Environment

The MTE is required when making changes to javascript and for working with css frameworks like `tailwind`.

## Prerequisites

Install `node` and `npm` from the [Node.js website](https://nodejs.org/en/).<br />

We also recommend using `nvm` to manage the node versions.

Install it from [here](https://github.com/nvm-sh/nvm). The version of `node` is within the `.nvmrc` file.

Run command: `nvm use` to switch to the correct version of node.

## Setup and Running

We use `webpack` to bundle Typescript / Javascript files before deploying them to the theme's `asset` folder.<br>

Run `npm run start:dev`. <br>
<br>
This will:
<br>

1. Watch for changes to files and recompile any tailwind css to `assets/tailwind.css`
2. Watch for changes to typescript files, recompile, bundle and re-upload to `assets/custom-.*.js`

## Publishing the theme

Once completed, publish your theme for review to the Shopify store using the Shopify CLI.

## Submitting changes through GitHub

1. All features must be developed in a `feature` branch.
2. Commit changes into your `feature` branch and push the changes to GitHub
3. Once the feature is completed, it must be merged into `main` through submitting a GitHub Pull Request. Once approved, the branch is then merged.
4. __\*\*NEVER\*\*__ edit the `live` theme directly
5. __\*\*NEVER\*\*__ push to `main` directly.

## GitHub instructions

1. From GitHub, clone the `main` branch
2. Create a new branch and switch to it with the `theme_id` for example, `feature/<github-username>-<theme_id>`
3. Push the branch to GitHub
````zsh
git clone https://github.com/treeshake/silkhour.git
git branch feature/<github-username>-<theme_id>
git push origin feature/<github-username>-<theme_id>
```
