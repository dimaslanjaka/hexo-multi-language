var entities = {
	amp: "&",
	apos: "'",
	"#x27": "'",
	"#x2F": "/",
	"#39": "'",
	"#47": "/",
	lt: "<",
	gt: ">",
	nbsp: " ",
	quot: '"',
};

function decodeHTMLEntities(text) {
	return text.replace(/&([^;]+);/gm, function (match, entity) {
		return entities[entity] || match;
	});
}

module.exports = { decodeHTMLEntities };
