'use strict';

function toRegExp(arr) {
  if (!Array.isArray(arr)) {
    arr = (arr || '').toString().split(',');
  }

  var str = arr.filter(Boolean).map(function (word) {
    return word.trim().replace(/([-[\]{}()*+?.,\\^$|#\s])/g, '\\$1');
  }).join('|');

  return str || '^(?!x)x';
}

module.exports = toRegExp;