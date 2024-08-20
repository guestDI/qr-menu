/* eslint-disable no-undef */
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 13,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		"react/react-in-jsx-scope": "off",
		"no-empty-function": "off",
		"@typescript-eslint/no-empty-function": [
			"error",
			{ allow: ["arrowFunctions"] },
		],
	},
}
