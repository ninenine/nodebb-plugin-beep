<div class="acp-page-container">
	<!-- IMPORT admin/partials/settings/header.tpl -->

	<div class="row m-0">
		<div id="spy-container" class="col-12 px-0 mb-4" tabindex="0">
			<form role="form" class="beep-settings">
				<div class="mb-3">
					<h5 class="fw-bold tracking-tight settings-header">Illegal Words</h5>
					<div>
						<label class="form-label" for="illegal"><i>comma-separated</i> list of Illegal Words (post will not be allowed)</label>
						<textarea class="form-control" id="illegal" name="illegal" placeholder="eg. anal, anus, arse, ass, ballsack" rows="6"></textarea>
					</div>
				</div>
				<div class="mb-3">
					<h5 class="fw-bold tracking-tight settings-header">Banned Words</h5>

					<div>
						<label class="form-label" for="id"><i>comma-separated</i> list of Banned Words (post will be censored with asterisks)</label>
						<textarea class="form-control" id="id" name="id" placeholder="eg. anal, anus, arse, ass, ballsack" rows="6">anal, anus, arse, ass, ballsack, balls, bastard, bitch, biatch, bloody, blowjob, blow job, bollock, bollok, boner, boob, bugger, bum, butt, buttplug, clitoris, cock, coon, crap, cunt, damn, dick, dildo, dyke, fag, feck, fellate, fellatio, felching, fuck, f u c k, fudgepacker, fudge packer, flange, homo, jerk, jizz, knobend, knob end, labia, muff, nigger, nigga, penis, piss, poop, prick, pube, pussy, queer, sex, shit, s hit, sh1t, slut, smegma, spunk, tit, tosser, turd, twat, vagina, wank, whore</textarea>
					</div>
				</div>

				<div class="mb-3">
					<h5 class="fw-bold tracking-tight settings-header">Banned Urls</h5>

					<div class="form-group">
						<label for="urls"><i>comma-separated</i> list of Banned URLs (link will be shown as [link removed])</label>
						<textarea class="form-control" id="urls" name="urls" placeholder="eg. google.com, yahoo.com" rows="6"></textarea>
					</div>
				</div>

				<div class="mb-3">
					<h5 class="fw-bold tracking-tight settings-header">Censorship Settings</h5>

					<div class="form-check form-switch">
						<label class="form-check-label">Censor the entire word (as opposed to replacing the middle with <code>*</code>s)</label>
						<input class="form-check-input" type="checkbox" name="censorWholeWord">
					</div>
				</div>
			</form>
		</div>
	</div>
</div>



