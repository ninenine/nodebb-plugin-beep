<div class="beep" class="row">
	<div class="col-xs-12">
		<form role="form" class="beep-settings">
			<div class="row">
				<div class="col-sm-2 col-xs-12 settings-header">Illegal Words</div>
				<div class="col-sm-10 col-xs-12">
					<fieldset>
						<div class="form-group">
							<label for="illegal"><i>comma-separated</i> list of Illegal Words (post will not be allowed)</label>
							<textarea class="form-control" id="illegal" name="illegal" placeholder="eg. anal, anus, arse, ass, ballsack"></textarea>
						</div>
					</fieldset>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-2 col-xs-12 settings-header">Banned Words</div>
				<div class="col-sm-10 col-xs-12">
					<fieldset>
						<div class="form-group">
							<label for="id"><i>comma-separated</i> list of Banned Words (post will be censored with asterisks)</label>
							<textarea class="form-control" id="id" name="id" placeholder="eg. anal, anus, arse, ass, ballsack">anal, anus, arse, ass, ballsack, balls, bastard, bitch, biatch, bloody, blowjob, blow job, bollock, bollok, boner, boob, bugger, bum, butt, buttplug, clitoris, cock, coon, crap, cunt, damn, dick, dildo, dyke, fag, feck, fellate, fellatio, felching, fuck, f u c k, fudgepacker, fudge packer, flange, homo, jerk, jizz, knobend, knob end, labia, muff, nigger, nigga, penis, piss, poop, prick, pube, pussy, queer, sex, shit, s hit, sh1t, slut, smegma, spunk, tit, tosser, turd, twat, vagina, wank, whore</textarea>
						</div>
					</fieldset>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-2 col-xs-12 settings-header">Banned URLs</div>
				<div class="col-sm-10 col-xs-12">
					<fieldset>

						<div class="form-group">
							<label for="urls"><i>comma-separated</i> list of Banned URLs (link will be shown as [link removed])</label>
							<textarea class="form-control" id="urls" name="urls" placeholder="eg. google.com, yahoo.com"></textarea>
						</div>

					</fieldset>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-2 col-xs-12 settings-header">Censorship Settings</div>
				<div class="col-sm-10 col-xs-12">
					<fieldset>
						<div class="checkbox">
							<label>
								<input type="checkbox" name="censorWholeWord">
								Censor the entire word (as opposed to replacing the middle with <code>*</code>s)
							</label>
						</div>
					</fieldset>
				</div>
			</div>

		</form>
	</div>
</div>

<!-- IMPORT admin/partials/save_button.tpl -->

