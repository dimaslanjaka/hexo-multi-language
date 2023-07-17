/**
 * turn html into text
 * @param {string} inStr
 * @returns
 */
const replaceHTMLtoText = (inStr) => {
	let tmpStr = inStr;
	tmpStr = tmpStr
		.replace(/\r|\n/g, "")
		.replace(/\<style\>.*?\<\/style\>/g, "")
		.replace(/\<style\s.*?\<\/style\>/g, "")
		.replace(/\<script\>.*?\<\/script\>/g, "")
		.replace(/\<script\s.*?\<\/script\>/g, "")
		.replace(/\<figure\s.*?\<\/figure\>/g, "")
		.replace(/\<code.*?\<\/code\>/g, "")
		.replace(/\<a\>/g, "")
		.replace(/\<a\s.*?\>/g, "")
		.replace(/\<\/a>/g, "")
		.replace(/\<b\>/g, "")
		.replace(/\<\/b\>/g, "")
		.replace(/\<strong\>/g, "")
		.replace(/\<\/strong\>/g, "")
		.replace(/\<em\>/g, "")
		.replace(/\<\/em\>/g, "")
		.replace(/\<kbd\>/g, "")
		.replace(/\<\/kbd\>/g, "")
		.replace(/\<del\>/g, "")
		.replace(/\<\/del\>/g, "")
		.replace(/\<code\>/g, "")
		.replace(/\<\/code\>/g, "")
		.replace(/\<span\>/g, "")
		.replace(/\<\/span\>/g, "")
		.replace(/\<span\s.*?\>/g, "")
		.replace(/\<\/span\>/g, "")
		.replace(/\<.*?>/g, "\n")
		.replace(/(\n\s)+/g, "\n")
		.replace(/\n+/g, "%0D%0A");

	// console.log('\n\n' + '--- debug ---' + tmpStr +'\n\n')

	return tmpStr;
};

module.exports = { replaceHTMLtoText };
