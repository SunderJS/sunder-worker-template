# 🌄 sunder-worker-template

A batteries-included template for [Cloudflare Workers](https://workers.cloudflare.com) with the following configuration:

* [Sunder](https://sunderjs.com) minimal web framework.
* [ESBuild](https://esbuild.github.io/) for builds in <50ms.
* [Typescript](https://www.typescriptlang.org/) for typechecking.
* [Miniflare](https://miniflare.dev) and [Jest](https://jestjs.io/) for testing.
* [Sass](https://sass-lang.com/) for CSS preprocessing and minification.
* [Workers Sites](https://developers.cloudflare.com/workers/platform/sites) for static files.

If you disagree with any of these choices it's easy to swap out that decision.

## 🚀 Getting started

Press the green *"Use this template"* button in the top right to make a Github repository based on this one.

## Development
To build and preview using Miniflare, use
```
npm run miniflare
```

To serve using Miniflare, watch changes and build as you make changes, use 
```
npm run watch
```

To make a production build use
```
npm run build
```

### Testing

The tests are run using Jest. Use `npm test` to run your tests.

This is the recommended way to develop most of your app. Write tests for core functionality instead of relying on Miniflare or `wrangler dev`.

### Publishing
To publish, first make a build using `npm run build` and then use the Wrangler CLI tool.
