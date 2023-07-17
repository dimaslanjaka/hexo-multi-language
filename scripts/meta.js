/**
 * create meta.json in public root
 * forked from https://gist.github.com/mh61503891/544d3c1eefd00b1012463b860222d34f
 * this file contains all post data
 */

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
		if (!meta.tags.includes(tag.name)) meta.tags.push(tag.name);
	});
	locals.categories.sort("name").each(function (category) {
		if (!meta.categories.includes(category.name))
			meta.categories.push(category.name);
	});
	locals.posts.sort("name").each(function (post) {
		meta.posts.push({
			title: post.title,
			url: encodeURI(post.permalink),
			date: post.date.toDate().toISOString(),
			updated: post.updated.toDate().toISOString()
		});
	});
	return { path: "meta.json", data: JSON.stringify(meta) };
});
