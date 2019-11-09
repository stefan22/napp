module.exports = {
    "env": {
        "browser": true,
        "es6": true,
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react","babel"
    ],
    "rules": {
      "no-unused-vars": 0,
      "semi": ["error", "never"],
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "no-mixed-spaces-and-tabs": 0
    }
};
