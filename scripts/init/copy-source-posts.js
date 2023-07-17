// copy source posts into source/_posts after init (hexo.init())

const { path, fs } = require("sbg-utility");

hexo.extend.filter.register("after_init", function () {
	const src = path.join(hexo.base_dir, hexo.config.post_dir);
	const dest = path.join(hexo.base_dir, "source/_posts");
	fs.copySync(src, dest, { overwrite: true, dereference: true });
	// logging
	const logsrc = src.replace(path.toUnix(hexo.base_dir), "");
	const logdest = dest.replace(path.toUnix(hexo.base_dir), "");
	hexo.log.i("init", "copy posts", logsrc, "->", logdest);
});
