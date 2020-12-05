# sunder-worker-template

A batteries-included template for [Cloudflare Workers](https://workers.cloudflare.com) with the following modern configuration:

* Uses the [Sunder](https://sunderjs.com) minimal web framework.
* ESBuild for builds in <50ms.
* Typescript for typechecking.
* Jest for testing.

## 🚀 Getting started

Press the green *"Use this template"* button in the top right to make a Github repository based on this one.

**Alternative**

```
wrangler generate my-project https://github.com/gzuidhof/sunder-worker-template
```

## Development

To watch changes and build as you go, use 
```
npm run watch
```

## Testing

The tests are run using Jest. Use `npm test` to run your tests.

> ⚠️ Jest runs tests in a Node environment, this template has polyfills that make this environment as close as possible to a normal Cloudflare environment, but it may still be slightly different.

## Previewing and Publishing
```
wrangler dev
```

This is best combined with `npm run watch` in another terminal so the build gets updated automatically.

To publish, first make a build using `npm run build` and then use the Wrangler CLI tool.
