export default {
    testEnvironment: "miniflare",
    testMatch: ["<rootDir>/test/build/test/*\.test\.js"],
    // transformIgnorePatterns: [
    //     "<rootDir>/node_modules/(?!(sunder)/)" // Sunder has ES Module exports which Jest doesn't understand
    // ],
    moduleNameMapper: {
        "__STATIC_CONTENT_MANIFEST": "<rootDir>/test/build/test/manifest.js"
    }
};
