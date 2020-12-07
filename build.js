#!/usr/bin/env node
const { build, watch } = require("estrella");
const { remove, copy, writeFile } = require("fs-extra");
const chalk = require("chalk");
const sass = require("sass");

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
  } catch(e) {
    console.warn(chalk.yellow(`Could not write ${cssTargetFile}`))
  }

  return result.stats.includedFiles;
}

build({
  entry: "src/index.ts",
  outfile: "dist/bundle.js",
  bundle: true,
  onStart: async (config, changedFiles, context) => {
    const isInitialBuild = changedFiles.length === 0;
    if (isInitialBuild) {

      try {
        await remove("dist");
        await copy("static", "dist/static", {recursive: true});
      } catch(e) {
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