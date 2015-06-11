(function() {
    'use strict';
    var badwords = '';
    jQuery('document').ready(function() {
        $.get(RELATIVE_PATH + '/api/plugins/beep').success(function(banned_words) {
            badwords = banned_words.split(',');
        }).fail(function() {
            badwords = [
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
        });
        $(window).on('action:ajaxify.end', function(ev, data) {
            if (data.url.match(/^category/) || data.url.match(/^unread/) || data.url.match(/^recent/) || data.url.match(/^popular/)) {
                censorTopics();
            }
            if (data.url.match(/^topic/)) $(window).on('scroll', censorTopics);
        });
        $(window).on('action:categories.loaded', censorTopics);
        $(window).on('action:categories.new_topic.loaded', censorTopics);
        $(window).on('action:topic.loaded', censorTopics);
        socket.on('event:post_edited', function() {
            setTimeout(censorTopics, 270);
        });
    });

    function censorTopics() {
        for (var w in badwords) {
            var re = new RegExp(badwords[w], 'ig');
            var hidesting = '';
            for (var i = 0; i < badwords[w].length - 2; i++) {
                hidesting += '*';
            }
            var re2 = new RegExp(badwords[w].substring(1, badwords[w].length - 1), 'ig');

            //Document Body
            $('body').children().each(function(index) {
                if ($(this).text().match(re) && !($(this).find('a').text().match(re))) {
                    var match = $(this).text().match(re);
                    var hashword = match[0].replace(re2, hidesting);
                    $(this).html($(this).html().replace(re, hashword));
                }
            });

            //Document title
            if (document.title.match(re)) {
                var match = document.title.match(re);
                var hashword = match[0].replace(re2, hidesting);
                document.title = document.title.replace(re, hashword);
            }

            // Meta title and og:title
            $('meta[name="title"], meta[property="og:title"]').each(function() {
                var title = $(this).attr('content');
                if (title) {
                    var match = title.match(re);
                    if (match && match.length > 0) {
                        var hashword = match[0].replace(re2, hidesting);
                        $(this).attr('content', title.replace(re, hashword));
                    }
                }
            });

        }
    }
}());
