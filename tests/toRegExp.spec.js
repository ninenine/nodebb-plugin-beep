'use strict';

var assert = require('assert');

var toRegExp = require('../lib/toRegExp');

assert.deepStrictEqual(toRegExp(['bad', 'words', 'here']), 'bad|words|here');
assert.deepStrictEqual(toRegExp('bad,words, here'), 'bad|words|here');
assert.deepStrictEqual(toRegExp(null), '^(?!x)x');