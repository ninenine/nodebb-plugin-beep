'use strict';

var isLatin = /^\w+$/;

function toRegExp(arr, fullWord) {
	if (!Array.isArray(arr)) {
		arr = (arr || '').toString().split(',');
	}
	arr = arr.filter(Boolean);

	var str;
	if (fullWord) {
		var latin = arr.filter(function (word) {
			return isLatin.test(word);
		}).map(function (word) {
			return word.trim().replace(/([-[\]{}()*+?.,\\^$|#\s])/g, '\\$1');
		}).join('|');

		var notLatin = arr.filter(function (word) {
			return !isLatin.test(word);
		}).map(function (word) {
			return word.trim().replace(/([-[\]{}()*+?.,\\^$|#\s])/g, '\\$1');
		}).join('|');

		if (latin && notLatin) {
			str = '\\b(?:' + latin + ')\\b|(?:' + notLatin + ')';
		} else if (latin) {
			str = '\\b(?:' + latin + ')\\b';
		} else if (notLatin) {
			str = notLatin;
		}
	} else {
		str = arr.filter(Boolean).map(function (word) {
			return word.trim().replace(/([-[\]{}()*+?.,\\^$|#\s])/g, '\\$1');
		}).join('|');
	}

	return new RegExp(str || '^(?!x)x', 'ig');
}

module.exports = toRegExp;
