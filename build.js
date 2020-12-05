#!/usr/bin/env node
const { build } = require("estrella");

build({
  entry: "src/index.ts",
  outfile: "dist/worker.js",
  bundle: true
});
