const mode = process.env.NODE_ENV;
const dev = mode === 'development';

module.exports = {
	plugins: [
		require('autoprefixer'),
		require('postcss-nesting')(),
		require('postcss-combine-media-query'),

		!dev &&
			require('cssnano')({
				preset: 'default'
			})
	]
};
