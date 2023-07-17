const { wordCounter } = require("../../lib/util/wordCounter");

/**
 * Get the word count of a paragraph.
 */
hexo.extend.helper.register("word_count", wordCounter);
