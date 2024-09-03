/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const withReactSvg = require("next-react-svg")
const path = require("path")

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["images.immediate.co.uk", "www.aperol.com", "www.everyday-delicious.com", "cocktail-society.com", "www.acouplecooks.com", "www.appetitemag.co.uk"],
	},
	...withReactSvg({
		include: path.resolve(__dirname, "src/inline-img/svg"),
		webpack(config, options) {
			return config
		},
	}),
}
