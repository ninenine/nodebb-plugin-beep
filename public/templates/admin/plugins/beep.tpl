<h1><i class="fa fa-microphone-slash"></i>NodeBB Censor Curse Words Plugin</h1>

<div class="alert alert-info">
	<p>
		This is a NodeBB Plugin that allows users to censor curse words in their posts.
	</p>
</div>
<form role="form" class="beep-settings">
	<fieldset>
		<div class="form-group">
			<label for="illegal"><i>comma-separated</i> list of Illegal Words (post will not be allowed)</label>
			<input type="text" class="form-control" id="illegal" name="illegal" placeholder="eg. anal,anus,arse,ass,ballsack" value="" />

			<label for="id"><i>comma-separated</i> list of Banned Words (post will be censored with asterisks)</label>
			<input type="text" class="form-control" id="id" name="id" placeholder="eg. anal,anus,arse,ass,ballsack" value="anal,anus,arse,ass,ballsack,balls,bastard,bitch,biatch,bloody,blowjob,blow job,bollock,bollok,boner,
boob,bugger,bum,butt,buttplug,clitoris,cock,coon,crap,cunt,damn,dick,dildo,dyke,fag,feck,fellate,fellatio,
felching,fuck,f u c k,fudgepacker,fudge packer,flange,homo,jerk,jizz,knobend,knob end,labia,muff,nigger,
nigga,penis,piss,poop,prick,pube,pussy,queer,sex,shit,s hit,sh1t,slut,smegma,spunk,tit,tosser,turd,twat,
vagina,wank,whore" />
		</div>

		<div class="form-group">
			<label for="urls"><i>comma-separated</i> list of Banned URLs (link will be shown as [link removed])</label>
			<input type="text" class="form-control" id="urls" name="urls" placeholder="eg. google.com,yahoo.com" value="" />
		</div>
		

		<button class="btn btn-lg btn-primary" id="save" type="button">Save</button>
	</fieldset>
</form>

<script type="text/javascript">
	require(['settings'], function(Settings) {
		Settings.load('beep', $('.beep-settings'));

		$('#save').on('click', function() {
			Settings.save('beep', $('.beep-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'beep-saved',
					title: 'Success',
					message: 'Curse word settings have been successfully saved'
				});
			});
		});
	});
</script>