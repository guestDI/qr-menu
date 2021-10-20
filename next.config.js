/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const withReactSvg = require("next-react-svg")
const path = require("path")

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["images.immediate.co.uk"],
	},
	...withReactSvg({
		include: path.resolve(__dirname, "src/inline-img/svg"),
		webpack(config, options) {
			return config
		},
	}),
}
