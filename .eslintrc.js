module.exports = {
    "env": {
        "commonjs": true,
        "es2020": true,
        "node": true,
        "mocha": true,
        "jquery": true,
        "browser": true,
    },
    "extends": "eslint:recommended",
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 11
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "off"
        ],
        "quotes": [
            "error",
            "double",
            { "allowTemplateLiterals": true }
        ],
        "semi": [
            "error",
            "always"
        ],
        "brace-style": [
            "error",
            "allman",
            { "allowSingleLine": true }
        ],
        "space-in-parens": [
            "off",
        ],
        "space-before-function-paren": [
            "error",
            "never",
        ],
        "array-bracket-spacing": [
            "error",
            "always"
        ],
        "object-curly-spacing": [
            "error",
            "always"
        ],
        "template-curly-spacing": [
            "error",
            "always"
        ],
        "camelcase": "off",
        "no-unused-vars": "warn"
    }
};
