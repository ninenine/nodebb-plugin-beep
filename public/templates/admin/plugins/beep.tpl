<h1><i class="fa fa-microphone-slash"></i>NodeBB Censor Curse Words Plugin</h1>

<div class="alert alert-info">
	<p>
		This is a NodeBB Plugin that allows users to censor curse words in their posts.
	</p>
</div>
<form role="form" class="beep-settings">
	<fieldset>
		<div class="form-group">
			<label for="id"><i>comma-separated</i> list of Banned Words</label>
			<input type="text" class="form-control" id="id" name="id" placeholder="eg. anal,anus,arse,ass,ballsack" />
		</div>
		<p class="help-block">
			if invalid entry, default is:
		</p>
		<pre>anal,anus,arse,ass,ballsack,balls,bastard,bitch,biatch,bloody,blowjob,blow job,bollock,bollok,boner,
		boob,bugger,bum,butt,buttplug,clitoris,cock,coon,crap,cunt,damn,dick,dildo,dyke,fag,feck,fellate,fellatio,
		felching,fuck,f u c k,fudgepacker,fudge packer,flange,homo,jerk,jizz,knobend,knob end,labia,muff,nigger,
		nigga,penis,piss,poop,prick,pube,pussy,queer,sex,shit,s hit,sh1t,slut,smegma,spunk,tit,tosser,turd,twat,
		vagina,wank,whore</pre>

		<button class="btn btn-lg btn-primary" id="save" type="button">Save</button>
	</fieldset>
</form>
<div class="alert alert-warning">
	<p>
		Urls with banned words will also be blocked. They mostly 404.
	</p>
</div>
<script type="text/javascript">
	require(['settings'], function(Settings) {
		Settings.load('beep', $('.beep-settings'));

		$('#save').on('click', function() {
			Settings.save('beep', $('.beep-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'beep-saved',
					title: 'Restart Required',
					message: 'Please restart your NodeBB to complete configuration of this plugin',
					clickfn: function() {
						socket.emit('admin.restart');
					}
				});
			});
		});
	});
</script>