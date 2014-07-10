(function (module) {
  'use strict';
  var Beep = {};
  Beep.parse = function (postContent, callback) {
    var badwords = [
      'anal',
      'anus',
      'arse',
      'ass',
      'ballsack',
      'balls',
      'bastard',
      'bitch',
      'biatch',
      'bloody',
      'blowjob',
      'blow job',
      'bollock',
      'bollok',
      'boner',
      'boob',
      'bugger',
      'bum',
      'butt',
      'buttplug',
      'clitoris',
      'cock',
      'coon',
      'crap',
      'cunt',
      'damn',
      'dick',
      'dildo',
      'dyke',
      'fag',
      'feck',
      'fellate',
      'fellatio',
      'felching',
      'fuck',
      'f u c k',
      'fudgepacker',
      'fudge packer',
      'flange',
      'homo',
      'jerk',
      'jizz',
      'knobend',
      'knob end',
      'labia',
      'muff',
      'nigger',
      'nigga',
      'penis',
      'piss',
      'poop',
      'prick',
      'pube',
      'pussy',
      'queer',
      'sex',
      'shit',
      's hit',
      'sh1t',
      'slut',
      'smegma',
      'spunk',
      'tit',
      'tosser',
      'turd',
      'twat',
      'vagina',
      'wank',
      'whore'
    ];
    for (var w in badwords) {
      var re = new RegExp(badwords[w], 'ig');
      var hidesting = '';
      for (var i = 0; i < badwords[w].length - 2; i++) {
        hidesting += '*';
      }
      var re2 = new RegExp(badwords[w].substring(1, badwords[w].length - 1), 'ig');
      var hashword = badwords[w].replace(re2, hidesting)
      if (postContent.match(re)) {
        postContent = postContent.replace(re, hashword);
      }
    }
    callback(null, postContent);
  };
  module.exports = Beep;
}(module));
