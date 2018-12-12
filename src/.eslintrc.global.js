const commonRules = {
    indent: ['error', 2],
    'no-trailing-spaces': ['warn', {
        skipBlankLines: true
    }],
    'linebreak-style': 0,
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-console': 0,
    'no-trailing-spaces': [1, {skipBlankLines: true}],
    'quote-props': 0,
    'object-curly-spacing': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'no-restricted-globals': 0,
    'padded-blocks': 0,
    'import/prefer-default-export': 0,
    'no-plusplus': 1,
    'no-unused-vars': 1,
    'no-else-return': 1,
    'operator-linebreak': 0,
    'prefer-destructuring': 1,
    'radix': 0,
    'consistent-return': 1,
    'no-param-reassign': 1,
    'arrow-parens': 0,
    'lines-between-class-members': 0,
    'dot-notation': 2,
    'camelcase': 1,
    'object-curly-newline': 0,
    'prefer-template': 1,
    'import/prefer-default-export': 0
};

const reactRules = {
    // react
    'react/no-deprecated': 0,
    'react/destructuring-assignment': 0,
    'react/no-did-update-set-state': 1,
    'react/sort-comp': 1,
    'react/no-access-state-in-setstate': 1,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-tag-spacing': 0,
    'react/jsx-wrap-multilines': 0,
    'react/forbid-prop-types': 1,
    // 'react/jsx-uses-react': 1,
    // 'react/prop-types': 1,

    // jsx
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/alt-text': 0
};


function createEslintConfig (isReact = false) {
    let rules = {...commonRules};

    if (isReact) rules = {...rules, ...reactRules};

    return {
        env: {
            es6: true,
            browser: true,
            jest: true,
            jquery: true
        },
        parser: 'babel-eslint',
        parserOptions: {
            sourceType: 'module',
            ecmaFeatures: {
                experimentalObjectRestSpread: true,
                jsx: true
            }
        },
        rules
    }
}

module.exports = createEslintConfig;
