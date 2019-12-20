import { Linter } from 'eslint';

/**
 * REACT plugin
 * @see https://github.com/yannickcr/eslint-plugin-react
 */
const reactRules: Linter.RulesRecord = {
  'react/no-danger': ['warn'],
  'react/no-danger-with-children': ['error'],
  'react/prefer-es6-class': ['error'],
  'react/no-multi-comp': ['warn', { ignoreStateless: true }],
  'react/prefer-stateless-function': ['warn', { ignorePureComponents: true }],

  // @FIXME makes sense only for JS files
  'react/prop-types': ['off'],

  'react/sort-comp': [
    'warn',
    {
      order: [
        'displayName',
        'mixins',
        'propTypes',
        'contextTypes',
        'childContextTypes',
        'defaultProps',
        'statics',
        'type-annotations',
        'instance-variables',
        'state',
        'constructor',
        'getDefaultProps',
        'getInitialState',
        'getChildContext',
        'componentWillMount',
        'componentDidMount',
        'componentWillReceiveProps',
        'shouldComponentUpdate',
        'componentWillUpdate',
        'componentDidUpdate',
        'componentWillUnmount'
      ]
    }
  ],

  'react/default-props-match-prop-types': ['off'], // @FIXME not needed with TS
  'react/forbid-prop-types': ['off'], // @FIXME not needed with TS
  'react/no-array-index-key': ['warn'],
  'react/no-children-prop': ['warn'],
  'react/no-did-mount-set-state': ['off'],
  'react/no-find-dom-node': ['warn'],
  'react/no-is-mounted': ['error'], // @FIXME check if createReactClass is used and remove if not
  'react/no-string-refs': ['error'],
  'react/no-unused-prop-types': ['warn'], // @FIXME makes sense only for JS files
  'react/no-will-update-set-state': ['warn'],
  'react/require-default-props': ['warn'], // @FIXME makes sense only for JS files
  'react/destructuring-assignment': ['off'],
  'react/no-access-state-in-setstate': ['error'],
  'react/no-this-in-sfc': ['error'],
  'react/no-unescaped-entities': ['warn'],

  // JSX related rules
  'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
  'react/jsx-no-bind': ['warn'],
  'react/jsx-handler-names': ['warn'],
  'react/jsx-curly-brace-presence': [
    'warn',
    { props: 'never', children: 'never' }
  ]
};

/**
 * REACT-HOOKS
 * @see https://www.npmjs.com/package/eslint-plugin-react-hooks
 */
const hookRules: Linter.RulesRecord = {
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn'
};

/**
 * JSX-A11Y
 * https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
 */
const jsx11yRules: Linter.RulesRecord = {
  'jsx-a11y/accessible-emoji': ['warn'],
  'jsx-a11y/alt-text': ['warn'],
  'jsx-a11y/anchor-has-content': ['warn'],
  'jsx-a11y/anchor-is-valid': [
    'warn',
    {
      aspects: ['noHref', 'invalidHref']
    }
  ],
  'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
  'jsx-a11y/aria-props': 'warn',
  'jsx-a11y/aria-proptypes': 'warn',
  'jsx-a11y/aria-role': 'warn',
  'jsx-a11y/aria-unsupported-elements': 'warn',
  'jsx-a11y/heading-has-content': 'warn',
  'jsx-a11y/img-redundant-alt': 'warn',
  'jsx-a11y/no-access-key': 'warn',
  'jsx-a11y/no-distracting-elements': 'warn',
  'jsx-a11y/no-redundant-roles': 'warn',
  'jsx-a11y/role-has-required-aria-props': 'warn',
  'jsx-a11y/role-supports-aria-props': 'warn',
  'jsx-a11y/scope': 'warn',
  'jsx-a11y/iframe-has-title': 'warn',

  // Disable strict jsx-a11y
  'jsx-a11y/click-events-have-key-events': ['off'],
  'jsx-a11y/img-has-alt': ['off'],
  'jsx-a11y/label-has-for': ['off'],
  'jsx-a11y/media-has-caption': ['off'],
  'jsx-a11y/mouse-events-have-key-events': ['off'],
  'jsx-a11y/no-autofocus': ['off'],
  'jsx-a11y/no-noninteractive-element-interactions': ['off'],
  'jsx-a11y/no-noninteractive-tabindex': ['off'],
  'jsx-a11y/no-static-element-interactions': ['off'],
  'jsx-a11y/tabindex-no-positive': ['off'],
  'jsx-a11y/label-has-associated-control': ['off']
};

export const config: Linter.Config = {
  extends: [
    // https://github.com/yannickcr/eslint-plugin-react#recommended
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/index.js#L119
    'plugin:react/recommended'
  ],
  plugins: ['jsx-a11y', 'react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    ...reactRules,
    ...hookRules,
    ...jsx11yRules
  }
};
