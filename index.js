(function () {
  'use strict';
  var winston = module.parent.require('winston'),
  fs = require('fs'),
  path = require('path'),
  meta = module.parent.require('./meta'),
  Beep = {
    banned_words: undefined,
    init: function (app, middleware, controllers, callback) {
      function render(req, res, next) {
        res.render('admin/plugins/beep', {});
      }
      app.get('/admin/plugins/beep', middleware.admin.buildHeader, render);
      app.get('/api/admin/plugins/beep', render);
      app.get('/api/plugins/beep', function (req, res) {
        if (Beep.banned_words) {
          res.send(200, Beep.banned_words);
        } else {
          res.send(501);
        }
      });
      Beep.loadList();
      callback();
    },
    loadList: function () {
      // Load Banned Words from config
      meta.settings.getOne('beep', 'id', function (err, banned_words) {
        if (!err && banned_words && banned_words.length) {
          Beep.banned_words = banned_words;
        } else {
          Beep.banned_words = 'anal,anus,arse,ass,ballsack,balls,bastard,bitch,biatch,bloody,blowjob,blow job,bollock,bollok,boner,boob,bugger,bum,butt,buttplug,clitoris,cock,coon,crap,cunt,damn,dick,dildo,dyke,fag,feck,fellate,fellatio,felching,fuck,f u c k,fudgepacker,fudge packer,flange,homo,jerk,jizz,knobend,knob end,labia,muff,nigger,nigga,penis,piss,poop,prick,pube,pussy,queer,sex,shit,s hit,sh1t,slut,smegma,spunk,tit,tosser,turd,twat,vagina,wank,whore';
          winston.info('Default list of Banned Words is enabled. Please go to administration panel to change the list.');
        }
      });
    },
    onListChange: function (hash) {
      if (hash === 'settings:beep') {
        Beep.loadList();
      }
    },
    parse: function (postContent, callback) {
      var badwords = Beep.banned_words.split(',');
      for (var w in badwords) {
        var re = new RegExp(badwords[w], 'ig');
        var hidesting = '';
        for (var i = 0; i < badwords[w].length - 2; i++) {
          hidesting += '*';
        }
        var re2 = new RegExp(badwords[w].substring(1, badwords[w].length - 1), 'ig');
        if (postContent.match(re)) {
          var match = postContent.match(re);
          var hashword = match[0].replace(re2, hidesting);
          postContent = postContent.replace(re, hashword);
        }
      }
      callback(null, postContent);
    },
    admin: {
      menu: function (custom_header, callback) {
        custom_header.plugins.push({
          'route': '/plugins/beep',
          'icon': 'fa-microphone-slash',
          'name': 'Censor Curse Words'
        });
        callback(null, custom_header);
      },
    }
  };
  module.exports = Beep;
}) ();
