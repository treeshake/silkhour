# Silkhour / V FINE Jewels / Lab Concierge Shopify Theme Development

Please follow this README.MD to get started with Shopify Theme Development for our Store.

## Tech stack

Our store is built based on Shopify's official [Spotlight Theme](https://themes.shopify.com/themes/spotlight/styles/default). This theme is an official theme supplied by Shopify and built using [Liquid](https://shopify.dev/themes/liquid/reference), [JavaScript](https://shopify.dev/themes/javascript-api) and plain CSS.<br>

In addition, we use the following to develop:

- [Shopify CLI](https://shopify.dev/themes/tools/cli)
- [Node](https://nodejs.org/en/) / [NPM](https://www.npmjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/)

Collectively, these additional tools allow us to develop and maintain the store with an improved Developer experience, add new frameworks, libraries and utilities as needed and ensure that we can upgrade the underlying official theme in the future.

## Shopify Store

https://admin.shopify.com/store/vfinejewels

## Before you start

1. Obtain Read/write access to this Github Repository
2. From your Partner account, request collaborator access to the Shopify Store
3. Obtain the Theme Access (password) token, for using the Shopify CLI

Please send your Github username, and your email address to the store owner to obtain these access permissions.

## Setup

1. From the Shopify Admin, duplicate the current live Spotlight Theme, then rename it to include your `github-username` and the `theme_id`.
2. From Github, clone the `main` branch
3. Create a new branch and switch to it with the `theme_id` for example, `feature/<github-username>-<theme_id>`
4. Pull down the theme using the Shopify CLI, using your `theme_access_token` and the `theme_id`

```zsh
git clone https://github.com/treeshake/silkhour.git
git branch feature/<github-username>-<theme_id>
shopify theme pull --store vfinejewels.myshopify.com --password <theme_access_token> --theme <theme_id>
```

5. Start the development server

```zsh
shopify theme dev <theme_id>
```
6. Push the branch

```zsh
git push origin feature/<github-username>-<theme_id>
```

## Working with the Shopify Theme

**NEVER** modify the base theme's files directly e.g. `main-*.liquid`, `*.liquid`, `component-*-.css`, `component-*.css` `*.js` and many other files. <br>
This will prevent updating the base theme as new versions of Spotlight get released by the Shopify Team.

Instead, you **MUST** always create or update custom files labelled with the keyword `custom` and reference them in `template` jsons and other `custom` files as required. If you need to build upon the base functionality provided by the theme, simply copy them over to a new file ensuring the keyword `custom` is in the filename so it can be identified as a custom development file.

For example, if you're wanting to extend the `main-product.liquid` file, copy it to a new file e.g. `main-product-custom-something.liquid` and make the changes there.

### Exceptions to this rule

There are some exceptions:

1. You can modify `theme.liquid` to include new assets (javascript/css).

## Modern Tooling Environment

As mentioned in the [tech stack section](#tech-stack), we use additional tooling to develop new functionality. Collectively, we refer to these as the Modern Tooling Environment or MTE for short.

### Installation

Install `node` and `npm` from the [Node.js website](https://nodejs.org/en/). We also recommend using `nvm` to manage your node versions. You can install nvm from [here](https://github.com/nvm-sh/nvm). The version of `node` is within the `.nvmrc` file.

### Setup

We use `webpack` to bundle our compiled sources before deploying them to the `asset` folder. At the moment, we have included `tailwind` and `typescript` with plans to add `react` in the near future.<br>
Start a new terminal console, and, run `npm run start:dev`. <br>
<br>
This will:
<br>

1. Watch for changes to files and recompile any tailwind css to `assets/tailwind.css`
2. Watch for changes to typescript files, recompile, bundle and re-upload to `assets/custom.js`

### Others

We recommend development using VSCode IDE, with the following extensions:
- ESLint
- Code Spell Checker
- GitHub Copilot (Account required)
- Github Copilot Chat
- Prettier - Code formatter
- Shopify Liquid
- Tailwind CSS IntelliSense
- Headwind

## Submitting code changes

1. All features must be developed in a `feature` branch as outlined in the [setup](setup) instructions.
2. Commit changes into your feature branch and push the changes to Github
3. Once you have completed your feature, it must be merged into `main` through submitting a Github pull request. Once approved, the branch is then merged.
4. You must NOT edit the `live` theme directly.
5. You must NOT push to `main` directly.

## Coding Challenge

To demonstrate your understand of the above, please complete a simple code challenge. The code challenge is timed and must be completed in about 30-60 minutes. It does not require setting up the [MTE](modern-tooling-environment), although if you can demonstrate this in your coding challenge, then this is a huge advantage.<br>

### Task

Your task is to extend the product form, and add new a new form field called `Engraving`. This field should be a dropdown. It should be the last field in the product form with options "Yes" and "No". Create a new collection and product to showcase this new field.

### Requirements

You must:

1. Use Github and submit your code as a pull request, following the instructions in this README.
2. Clone the existing theme, following the instructions in this README. 
2. Create a new custom product template, you may base it on the default product template
3. Create custom data for the new field and use it in your product.

### Bonus

4. Using the MTE, validate that the Engraving option is set before adding to cart. If it is not selected, show an error message.

### Helpful articles

Some references to help get you started in the right direction:

1. [Shopify templates](https://help.shopify.com/en/manual/online-store/themes/theme-structure/templates)
2. [Shopify custom data](https://help.shopify.com/en/manual/custom-data)
