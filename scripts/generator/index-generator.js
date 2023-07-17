const _ = require("lodash");
const indexGenerator = require("hexo-generator-index/lib/generator");
const { pathJoin, isDefaultLanguage, postFilter, injectLanguages } =
	require("../../lib/i18n")(hexo);
const utility = require("sbg-utility");

/**
 * Multi-language index generator.
 *
 * ATTENTION: This will override the default index generator!
 */
hexo.extend.generator.register(
	"index",
	injectLanguages(function (languages, locals) {
		let c = 0;
		return _.flatten(
			languages
				.map((language) => {
					c++;
					// Filter posts by language considering. Posts without a language is considered of the default language.
					const posts = locals.posts.filter(postFilter(language));
					if (posts.length === 0) {
						return null;
					}
					const routes = indexGenerator.call(
						this,
						Object.assign({}, locals, {
							posts: posts,
						})
					);
					if (isDefaultLanguage(language)) {
						return routes;
					}
					const mapped = routes.map((route) => {
						const data = Object.assign({}, route.data, {
							base: pathJoin(language, route.data.base),
							current_url: pathJoin(language, route.data.current_url),
						});
						return Object.assign({}, route, {
							path: pathJoin(language, route.path),
							data: data,
						});
					});
					const saveto = utility.path.join(
						__dirname,
						"../tmp/index-generator/mapped-" + c + ".json"
					);
          utility.writefile(saveto, utility.jsonStringifyWithCircularRefs(mapped));
					return mapped;
				})
				.filter((post) => post !== null)
		);
	})
);
