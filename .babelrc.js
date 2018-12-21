module.exports = {
    "presets": [
        "@babel/preset-typescript",
        ["@babel/env", { "targets": { "node": "8" } }]
    ],
    "plugins": [
        "@babel/proposal-class-properties"
    ],
    "ignore": [
        "**/*.d.ts"
    ]
}
