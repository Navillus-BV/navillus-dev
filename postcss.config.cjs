const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const { default: nesting } = require("postcss-nesting");

const mode = process.env.NODE_ENV;
const dev = mode === "development";

module.exports = {
	plugins: [
		autoprefixer,
		nesting,

		!dev && cssnano({
			preset: "default",
		}),
	],
};
