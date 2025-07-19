// To be completed for Phase 2 Open Source

import js from "@eslint/js";
import stylistic from '@stylistic/eslint-plugin';
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        languageOptions: {
            ecmaVersion: 'latest',
            globals: {
                ...globals.node,
            },
        },
        files: ["**/*.js"],
        plugins: {
            js,
            "@stylistic/js": stylistic,
        },
        extends: ["js/recommended"],
        rules: {
            "array-callback-return": "error",
            "no-await-in-loop": "warn",
            "no-constructor-return": "error",
            "no-duplicate-imports": ["warn", {"allowSeparateTypeImports": true }],
            "no-inner-declarations": ["error", "both"],
            "no-promise-executor-return": "error",
            "no-self-compare": "warn",
            "no-template-curly-in-string": "error",
            "no-unused-vars": "warn",
            "no-unmodified-loop-condition": "error",
            "no-unreachable-loop": "warn",
            "no-use-before-define": "error",
            "no-useless-assignment": "warn",
            "require-atomic-updates": "error",
            "accessor-pairs": "warn",
            "arrow-body-style": "warn",
            "@stylistic/js/array-bracket-newline": ["warn", "consistent"],
            "@stylistic/js/array-bracket-spacing": "warn",
            "@stylistic/js/arrow-parens": "warn",
            "@stylistic/js/arrow-spacing": "warn",
            "@stylistic/js/block-spacing": ["warn", "never"],
            "@stylistic/js/brace-style": "warn",
            "@stylistic/js/comma-dangle": ["warn", "always-multiline"],
            "@stylistic/js/comma-spacing": "warn",
            "@stylistic/js/comma-style": "warn",
            "@stylistic/js/computed-property-spacing": "warn",
            "@stylistic/js/dot-location": ["warn", "property"],
            "@stylistic/js/function-call-spacing": "warn",
            "@stylistic/js/function-call-argument-newline": ["warn", "consistent"],
            "@stylistic/js/function-paren-newline": "warn",
            "@stylistic/js/implicit-arrow-linebreak": "warn",
            "@stylistic/js/indent": ["warn", 4, {"SwitchCase": 1}],
            "@stylistic/js/key-spacing": "warn",
        },
    },
]);
