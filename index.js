(function (module) {
  'use strict';
  var Beep = {
    banned_words: undefined
  };
  var fs = require('fs'),
  path = require('path'),
  winston = module.parent.require('winston'),
  Meta = module.parent.require('./meta'),
  db = module.parent.require('./database');

  Beep.init = function(app, middleware, controllers) {
    function render(req, res, next) {
      res.render('admin/plugins/beep', {});
    }

    app.get('/admin/plugins/beep', middleware.admin.buildHeader, render);
    app.get('/api/admin/plugins/beep', render);
    app.get('/api/plugins/beep', function(req, res) {
      if (Beep.banned_words) {
        res.send(200, Beep.banned_words);
      } else {
        res.send(501);
      }
    });

    // Load Banned Words from config
    Meta.settings.getOne('beep', 'id', function(err, banned_words) {
      if (!err && banned_words && banned_words.length) {
        Beep.banned_words = banned_words;
      } else {
        Beep.banned_words = "anal,anus,arse,ass,ballsack,balls,bastard,bitch,biatch,bloody,blowjob,blow job,bollock,bollok,boner,boob,bugger,bum,butt,buttplug,clitoris,cock,coon,crap,cunt,damn,dick,dildo,dyke,fag,feck,fellate,fellatio,felching,fuck,f u c k,fudgepacker,fudge packer,flange,homo,jerk,jizz,knobend,knob end,labia,muff,nigger,nigga,penis,piss,poop,prick,pube,pussy,queer,sex,shit,s hit,sh1t,slut,smegma,spunk,tit,tosser,turd,twat,vagina,wank,whore";
        //winston.error('List of Banned Words was not specified. Please complete setup in the administration panel.');
      }
    });
  };

  Beep.parse = function (postContent, callback) {
    var badwords = Beep.banned_words.split(',');
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

  Beep.admin = {
    menu: function(custom_header, callback) {
      custom_header.plugins.push({
        "route": '/plugins/beep',
        "icon": 'fa-microphone-slash',
        "name": 'Censor Curse Words'
      });

      callback(null, custom_header);
    }
  };

  module.exports = Beep;
}(module));
