// copy source posts into source/_posts

const { path, fs } = require("sbg-utility");

hexo.extend.filter.register("after_init", function () {
	const src = path.join(__dirname, "../sample-posts");
	const dest = path.join(hexo.base_dir, "source/_posts");
	fs.copySync(src, dest, { overwrite: true });
  // logging
	const logsrc = src.replace(path.toUnix(hexo.base_dir), "");
  const logdest = dest.replace(path.toUnix(hexo.base_dir), "");
	hexo.log.i("init", "copy posts", logsrc, "->", logdest);
});
