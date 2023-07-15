const _ = require("lodash");
const archiveGenerator = require("hexo-generator-archive/lib/generator");
const categoryGenerator = require("hexo-generator-category/lib/generator");
const tagGenerator = require("hexo-generator-tag/lib/generator");
const { pathJoin, isDefaultLanguage, postFilter, injectLanguages } =
	require("../lib/i18n")(hexo);

/**
 * Multi-language archive generator.
 *
 * ATTENTION: This will override the default archive generator!
 */
hexo.extend.generator.register(
	"archive",
	injectLanguages(function (languages, locals) {
		return _.flatten(
			languages
				.map((language) => {
					// Filter posts by language considering. Posts without a language is considered of the default language.
					const posts = locals.posts.filter(postFilter(language));
					if (posts.length === 0) {
						return null;
					}
					const routes = archiveGenerator.call(
						this,
						Object.assign({}, locals, {
							posts: posts,
						})
					);
					if (isDefaultLanguage(language)) {
						return routes;
					}
					return routes.map((route) => {
						const data = Object.assign({}, route.data, {
							base: pathJoin(language, route.data.base),
							current_url: pathJoin(language, route.data.current_url),
						});
						return Object.assign({}, route, {
							path: pathJoin(language, route.path),
							data: data,
						});
					});
				})
				.filter((post) => post !== null)
		);
	})
);

/**
 * Multi-language category generator.
 *
 * ATTENTION: This will override the default category generator!
 */
hexo.extend.generator.register(
	"category",
	injectLanguages(function (languages, locals) {
		return _.flatten(
			languages
				.map((language) => {
					const categories = locals.categories
						.map((category) => {
							// Filter posts by language considering. Posts without a language is considered of the default language.
							const posts = category.posts.filter(postFilter(language));
							if (posts.length === 0) {
								return null;
							}
							return Object.assign({}, category, {
								posts: posts,
							});
						})
						.filter((category) => category !== null);
					if (categories.length === 0) {
						return null;
					}

					const routes = categoryGenerator.call(
						this,
						Object.assign({}, locals, {
							categories: categories,
						})
					);
					if (isDefaultLanguage(language)) {
						return routes;
					}
					return routes.map((route) => {
						const data = Object.assign({}, route.data, {
							base: pathJoin(language, route.data.base),
							current_url: pathJoin(language, route.data.current_url),
						});
						return Object.assign({}, route, {
							path: pathJoin(language, route.path),
							data: data,
						});
					});
				})
				.filter((post) => post !== null)
		);
	})
);

/**
 * Multi-language tag generator.
 *
 * ATTENTION: This will override the default tag generator!
 */
hexo.extend.generator.register(
	"tag",
	injectLanguages(function (languages, locals) {
		return _.flatten(
			languages
				.map((language) => {
					const tags = locals.tags
						.map((tag) => {
							// Filter posts by language considering. Posts without a language is considered of the default language.
							const posts = tag.posts.filter(postFilter(language));
							if (posts.length === 0) {
								return null;
							}
							return Object.assign({}, tag, {
								posts: posts,
							});
						})
						.filter((category) => category !== null);
					if (tags.length === 0) {
						return null;
					}

					const routes = tagGenerator.call(
						this,
						Object.assign({}, locals, {
							tags: tags,
						})
					);
					if (isDefaultLanguage(language)) {
						return routes;
					}

					return routes.map((route) => {
						const data = Object.assign({}, route.data, {
							base: pathJoin(language, route.data.base),
							current_url: pathJoin(language, route.data.current_url),
						});
						return Object.assign({}, route, {
							path: pathJoin(language, route.path),
							data: data,
						});
					});
				})
				.filter((post) => post !== null)
		);
	})
);
