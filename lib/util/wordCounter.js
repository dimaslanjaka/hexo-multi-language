const { decodeHTMLEntities } = require("./decodeHTMLEntities");

/**
 * word counter
 * @param {string} content
 * @returns
 * @example
 * // hello world = 2
 * // hello world my name is L3n4r0x = 6
 */
const wordCounter = (content) => {
	content = content
		.replace(/\<style\>.*?\<\/style\>/g, "")
		.replace(/\<style\s.*?\<\/style\>/g, "")
		.replace(/\<script\>.*?\<\/script\>/g, "")
		.replace(/\<script\s.*?\<\/script\>/g, "")
		.replace(/<\/?[a-z][^>]*>/gi, "");
	content = decodeHTMLEntities(content.trim());
	const length = content
		? (content.match(/[\u00ff-\uffff]|[a-zA-Z]+/g) || []).length
		: 0;

	// console.log(content, length);
	return length;
};


module.exports = { wordCounter };
