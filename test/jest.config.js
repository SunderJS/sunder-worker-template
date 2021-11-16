import { defaults } from "jest-config";

export default {
    testEnvironment: "miniflare",
    testMatch: ["**/*.test.js"],
    moduleFileExtensions: [...defaults.moduleFileExtensions, "mjs"],
};
