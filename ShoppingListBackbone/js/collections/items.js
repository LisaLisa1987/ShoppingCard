var app = app || {};

(function() {
	'use strict';

	//Item Collection

	var ItemList = Backbone.Collection.extend({

		//Referenz zum Model der Collection
		model: app.Item,

		localStorage: new Store('items-backbone'),

		//Filtern aller Items, die den Status "completed" haben
		completed: function() {
			return this.filter(function(items) {
				return items.get('completed');
			});
		},

		remaining: function() {
			return this.without.apply( this, this.completed() );
		},

		//Durch diese Funktion werden Items mit einem Index versehen, der sich inkrementiell verhält
		nextOrder: function() {
			if ( !this.length ) {
				return 1;
			}
			return this.last().get('order') + 1;
		},

		//Items werden nach alphabetisch nach "Store" gespeichert
		comparator: function(items) {
			return items.get('store');
		}
	});

	app.Items = new ItemList();

}());
