module.exports = {
    "env": {
        "commonjs": true,
        "es2020": true,
        "node": true,
        "mocha": true,
        "jquery": true,
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 11
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
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
            "allman"
        ],
        "space-in-parens": [
            "error",
            "always",
            { "exceptions": [ "{}", "[]", "()" ] }
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
    }
};
