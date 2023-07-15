const util = require("hexo-util");
const {
	pathJoin,
	isDefaultLanguage,
	url_for,
	postFilter,
	injectLanguages,
} = require("../lib/i18n")(hexo);

/**
 * Multi-language insight search content.json generator.
 *
 * ATTENTION: This will override the default insight search content.json generator!
 */
hexo.extend.generator.register(
	"insight",
	injectLanguages(function (languages, locals) {
		function minify(str) {
			return util
				.stripHTML(str)
				.trim()
				.replace(/\n/g, " ")
				.replace(/\s+/g, " ")
				.replace(/&#x([\da-fA-F]+);/g, (match, hex) => {
					return String.fromCharCode(parseInt(hex, 16));
				})
				.replace(/&#([\d]+);/g, (match, dec) => {
					return String.fromCharCode(dec);
				});
		}
		function postMapper(post) {
			return {
				title: post.title,
				text: minify(post.content),
				link: url_for(post.path),
			};
		}
		function tagMapper(language) {
			return function (tag) {
				return {
					name: tag.name,
					slug: tag.slug,
					link: url_for(
						isDefaultLanguage(language)
							? tag.path
							: pathJoin(language, tag.path)
					),
				};
			};
		}
		return languages.map((language) => {
			const site = {
				pages: locals.pages.filter(postFilter(language)).map(postMapper),
				posts: locals.posts.filter(postFilter(language)).map(postMapper),
				tags: locals.tags
					.filter((tag) => tag.posts.some(postFilter(language)))
					.map(tagMapper(language)),
				categories: locals.categories
					.filter((category) => category.posts.some(postFilter(language)))
					.map(tagMapper(language)),
			};
			return {
				path: isDefaultLanguage(language)
					? "content.json"
					: "content." + language + ".json",
				data: JSON.stringify(site),
			};
		});
	})
);
