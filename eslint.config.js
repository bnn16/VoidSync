const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

const baseConfig = {
    files: ['**/*.{ts,tsx}'],
    plugins: {
        '@typescript-eslint': typescript,
        'simple-import-sort': require('eslint-plugin-simple-import-sort'),
        'unused-imports': require('eslint-plugin-unused-imports'),
        'import': require('eslint-plugin-import'),
        'import-newlines': require('eslint-plugin-import-newlines'),
    },
    languageOptions: {
        parser: typescriptParser,
        parserOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            project: ['./packages/*/tsconfig.json', './packages/*/tsconfig.*.json'],
            tsconfigRootDir: __dirname,
        }
    },
    rules: {
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'warn',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        "semi": [2, "always"],
        "no-extra-semi": "error",
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        "linebreak-style": ["error", "unix"],
        "max-len": ["error", 100],

        // TypeScript specific base rules
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                'selector': 'memberLike',
                'modifiers': ['private'],
                'leadingUnderscore': 'require',
                'format': ['camelCase'],
            },
            {
                'selector': 'memberLike',
                'modifiers': ['protected'],
                'leadingUnderscore': 'require',
                'format': ['camelCase'],
            },
            {
                'selector': 'memberLike',
                'modifiers': ['public'],
                'leadingUnderscore': 'forbid',
                'format': ['PascalCase', 'camelCase'],
            },
            {
                'selector': 'enumMember',
                'format': ['PascalCase', 'camelCase'],
            },
            {
                'selector': 'function',
                'format': ['camelCase'],
            },
            {
                'selector': 'variable',
                'modifiers': ['const'],
                'format': ['camelCase', 'PascalCase', 'UPPER_CASE'],
            },
            {
                'selector': 'memberLike',
                'modifiers': [],
                'format': ['PascalCase', 'camelCase'],
            },
            {
                'selector': 'objectLiteralProperty',
                'modifiers': [],
                'format': null,
            },
            {
                'selector': 'objectLiteralMethod',
                'modifiers': [],
                'format': null,
            },
        ],

        // Import sorting and formatting
        'simple-import-sort/imports': 'error',
        'unused-imports/no-unused-imports': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import-newlines/enforce': ['error', {
            'items': 1,
            'max-len': 100,
        }],
    },
};

module.exports = [
    {
        ignores: ['**/dist/**', '**/build/**', '**/node_modules/**', '.eslintrc.cjs']
    },
    baseConfig,
    {
        files: ['packages/frontend/**/*.{ts,tsx}'],
        plugins: {
            ...baseConfig.plugins,
            'react': require('eslint-plugin-react'),
            'react-hooks': require('eslint-plugin-react-hooks'),
            'react-refresh': require('eslint-plugin-react-refresh'),
        },
        settings: {
            react: { version: 'detect' },
        },
        languageOptions: {
            ...baseConfig.languageOptions,
            parserOptions: {
                ...baseConfig.languageOptions.parserOptions,
                project: [
                    './packages/frontend/tsconfig.json',
                    './packages/frontend/tsconfig.app.json',
                    './packages/frontend/tsconfig.node.json'
                ],
            }
        },
        rules: {
            ...baseConfig.rules,
            // React specific rules
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
            'react/no-unused-prop-types': 'error',
            'react/self-closing-comp': 'error',
            'react/void-dom-elements-no-children': 'error',
            'react/jsx-props-no-multi-spaces': 'error',
            'react/jsx-wrap-multilines': ['error', {
                'declaration': 'never',
                'assignment': 'parens-new-line',
                'arrow': 'parens-new-line',
                'return': 'never',
                'condition': 'parens-new-line',
                'logical': 'parens-new-line',
                'prop': 'ignore'
            }],
            'react/jsx-child-element-spacing': 'error',
            'react/jsx-curly-brace-presence': 'error',
            'react/jsx-curly-newline': 'error',
            'react/jsx-curly-spacing': 'error',
            'react/jsx-equals-spacing': 'error',
            'react/jsx-first-prop-new-line': 'error',
            'react/jsx-indent': ['error', 4],
            'react/jsx-fragments': 'error',
            'react/jsx-max-props-per-line': 'error',
            'react/jsx-one-expression-per-line': 'error',
            'react/jsx-pascal-case': 'error',
            'react/jsx-tag-spacing': 'error',
            'react/function-component-definition': ['error', {
                'namedComponents': 'arrow-function',
                'unnamedComponents': 'arrow-function',
            }],
            'react/no-danger': 'error',
            'react/jsx-boolean-value': 'error',
            'react/no-unstable-nested-components': 'error',

            // React Refresh
            'react-refresh/only-export-components': ['warn', {
                allowConstantExport: true
            }],

            // Skill issue
            'no-restricted-syntax': ['error', {
                selector: 'CallExpression[callee.name="useEffect"]',
                message: 'Don`t be a noob, use something else. Ignore this if you really have to...'
            }],
        },
    },
    // Backend specific config
    {
        files: ['packages/backend/**/*.ts'],
        plugins: {
            ...baseConfig.plugins,
            'security': require('eslint-plugin-security'),
        },
        languageOptions: {
            ...baseConfig.languageOptions,
            parserOptions: {
                ...baseConfig.languageOptions.parserOptions,
                project: ['./packages/backend/tsconfig.json'],
            }
        },
        rules: {
            ...baseConfig.rules,
            'no-process-env': 'warn',

            // Type safety
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/no-floating-promises': 'error',

            // Code quality
            '@typescript-eslint/no-unnecessary-condition': 'warn',
            '@typescript-eslint/prefer-nullish-coalescing': 'warn',
            '@typescript-eslint/prefer-optional-chain': 'warn',

            // Async/Promise handling
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/no-misused-promises': ['error', {
                checksVoidReturn: false,
                checksConditionals: true
            }],

            // Security
            'security/detect-object-injection': 'warn',
            'security/detect-non-literal-fs-filename': 'warn',

            // Additional TypeScript specific rules
            '@typescript-eslint/no-unsafe-member-access': 'error',
            '@typescript-eslint/no-unsafe-assignment': 'error',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-return': 'error',
            '@typescript-eslint/restrict-template-expressions': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        },
    },
];