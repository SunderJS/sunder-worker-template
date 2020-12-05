module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ["<rootDir>/test/setup.ts"],
    transform: {
        '.+\\.(jt)s?$': 'ts-jest',
        '.*': 'ts-jest'
    },
    modulePathIgnorePatterns: [
        "<rootDir>/dist"
    ],
    transformIgnorePatterns: [
        "node_modules/(?!(sunder)/)" // Sunder has ES Module exports which Jest doesn't understand
    ]
}
