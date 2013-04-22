var app = app || {};

(function() {
	'use strict';

	app.Item = Backbone.Model.extend({

		// Definition der Attribute und setzen von default-Werten
		defaults: {
			item: '',
			quantity: 0,
			price: 0,
			store: null,
			completed: false
		},

		//Wechseln vom Status 'completed' auf true/false
		toggle: function() {
			this.save({
				completed: !this.get('completed')
			});
		}
	});
}());
