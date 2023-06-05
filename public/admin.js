'use strict';

define('admin/plugins/beep', ['settings', 'alerts'], function (Settings, alerts) {
	const admin = {};
	admin.init = function () {
		Settings.load('beep', $('.beep-settings'));

		$('#save').on('click', function() {
			Settings.save('beep', $('.beep-settings'), function() {
				alerts.success('Curse word settings have been successfully saved');
			});
		});
	};
	return admin;
});
