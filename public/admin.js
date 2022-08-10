'use strict';

define('admin/plugins/beep', ['settings'], function (Settings) {
	const admin = {};
	admin.init = function () {
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
	};
	return admin;
});
