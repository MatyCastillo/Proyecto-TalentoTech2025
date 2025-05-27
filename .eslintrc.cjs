module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended', 
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier'], 
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'warn', 
    'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/prop-types': 'off',
    
  },
  settings: {
    react: {
    version: 'detect',
    },
  },
};
