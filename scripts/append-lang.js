const { pathJoin, isDefaultLanguage, getPageLanguage } =
	require("../lib/i18n")(hexo);

/**
 * Append language directory to the post tags and categories
 */
hexo.extend.filter.register("before_post_render", function (data) {
	data.lang = getPageLanguage(data);
	data._categories = data.categories
		? data.categories.map((category) => {
				return {
					name: category.name,
					path: !isDefaultLanguage(data.lang)
						? pathJoin(data.lang, category.path)
						: category.path,
				};
		  })
		: [];
	data._tags = data.tags
		? data.tags.map((tag) => {
				return {
					name: tag.name,
					path: !isDefaultLanguage(data.lang)
						? pathJoin(data.lang, tag.path)
						: tag.path,
				};
		  })
		: [];
	return data;
});
