#!/usr/bin/env node
import estrella from "estrella";
import fsExtra from "fs-extra";
import chalk from "chalk";
import sass from "sass";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const { build, watch } = estrella;
const { remove, copy, writeFile } = fsExtra

const cssEntryFile = "src/styles/app.scss";
const cssTargetFile = "dist/static/app.css";

async function buildStyles(config) {
  const result = sass.renderSync({
    file: cssEntryFile,
    outputStyle: config.debug ? 'expanded' : 'compressed',
  });

  try {
    await writeFile(cssTargetFile, result.css)
    console.log(chalk.greenBright(`Wrote ${cssTargetFile}`))
  } catch (e) {
    console.warn(chalk.yellow(`Could not write ${cssTargetFile}`))
  }
  return result.stats.includedFiles;
}

build({
  entry: __dirname + "/src/index.ts",
  bundle: true,
  outdir: __dirname + "/dist",
  minify: false,
  external: ["__STATIC_CONTENT_MANIFEST"],
  outExtension: { ".js": ".mjs" },
  format: "esm",
  onStart: async (config, changedFiles, context) => {
    const isInitialBuild = changedFiles.length === 0;
    if (isInitialBuild) {

      try {
        await copy("static", "dist/static", { recursive: true });
      } catch (e) {
        console.warn(chalk.yellow("Could not remove existing dist folder and copy static assets (maybe you are running wrangler dev?)"))
      }

      const cssInputFiles = await buildStyles(config);
      if (config.watch) {
        watch(cssInputFiles, f => {
          buildStyles(config);
        });
      }
    }
  }
});