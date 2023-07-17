/**
 * create meta.json in public root
 * forked from https://gist.github.com/mh61503891/544d3c1eefd00b1012463b860222d34f
 * this file contains all post data
 */

const { wordCounter } = require("../../lib/util/wordCounter");

const meta = {
	tags: [],
	posts: [],
	categories: [],
};

hexo.log.i(
	"create meta.json",
	`can be accessed at ${hexo.config.url}/${hexo.config.root.replace(
		/\//gm,
		""
	)}/meta.json`
);

hexo.extend.generator.register("meta", function (locals) {
	locals.tags.sort("name").each(function (tag) {
		const existingName = meta.tags.findIndex((item) => item.name === tag.name);
		if (existingName === -1) {
			meta.tags.push({
				name: tag.name,
				permalink: tag.permalink,
			});
		}
	});
	locals.categories.sort("name").each(function (category) {
		const existingName = meta.categories.findIndex(
			(item) => item.name === tag.name
		);
		if (existingName === -1) {
			meta.categories.push({
				name: category.name,
				permalink: category.permalink,
			});
		}
	});
	locals.posts.sort("name").each(function (post) {
		const existingId = meta.posts.findIndex((item) => item._id === post._id);
		const existingTitle = meta.posts.findIndex(
			(item) => item.title === post.title
		);
		if (existingId === -1 && existingTitle === -1) {
			meta.posts.push({
				id: post._id,
				title: post.title,
				url: encodeURI(post.permalink),
				date: post.date.toDate().toISOString(),
				updated: post.updated.toDate().toISOString(),
				words: wordCounter(post.content),
			});
		}
	});
	return { path: "meta.json", data: JSON.stringify(meta) };
});
