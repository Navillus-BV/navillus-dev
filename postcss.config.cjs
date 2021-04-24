const autoprefixer = require("autoprefixer");
const nesting = require("postcss-nesting");

const cssnano = require("cssnano");

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
