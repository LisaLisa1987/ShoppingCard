var app = app || {};

$(function( $ ) {
	'use strict';

	app.AppView = Backbone.View.extend({

		//Die View wird an das Element #wrapper gebunden
		el: '#wrapper',

		//Das Template für Angaben im Footer der Applikation
		statsTemplate: _.template( $('#stats-template').html() ),

		//Events zum Löschen und Hinzufügen von Elementen sowie zum Markieren aller Elemente
		events: {
			'click #addItem': 'createOnEnter',
			'click #clear-all': 'clearAll',
			'click #toggle-all': 'toggleAllComplete',
		},

		//Durch die Initialisierung werden events an die Collection von Items gebunden
		initialize: function() {
			this.allCheckbox = this.$('#toggle-all')[0];
			this.$item = this.$('#newItem');
			this.$quantity = this.$('#newQuantity');
			this.$price = this.$('#newPrice');
			this.$store = this.$('#newStore');
			this.$footer = this.$('#footer');
			this.$main = this.$('#main');

			this.listenTo(app.Items, 'add', this.addOne);
			this.listenTo(app.Items, 'reset', this.addAll);
			this.listenTo(app.Items, 'change:completed', this.filterOne);
			this.listenTo(app.Items, 'filter', this.filterAll);
			this.listenTo(app.Items, 'all', this.render);

			app.Items.fetch();
		},

		//Die Render-Funktion rendert nur den Footer, der Rest der Seite wird nicht erneut geladen
		render: function() {
			var completed = app.Items.completed().length;
			var remaining = app.Items.remaining().length;
			var all = app.Items.length;

			if ( app.Items.length ) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.statsTemplate({
					completed: completed,
					remaining: remaining,
					all: all
				}));

				this.$('#filters li a')
					.removeClass('selected')
					.addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},

		//Ein einzelnes Item wird der Liste hinzugefügt; dabei wird eine View erzeugt und an das Element #wrapper angefügt
		addOne: function( items ) {
			var view = new app.ShoppingCardView({ model: items });
			$('#shopping-card').append( view.render().el );
		},

		addAll: function() {
			this.$('#shopping-card').html('');
			app.Items.each(this.addOne, this);
		},

		filterOne: function( items ) {
			items.trigger('visible');
		},

		filterAll: function() {
			app.Items.each(this.filterOne, this);
		},

		//Die Attribute für ein neues Item werden hier definiert
		newAttributes: function() {
			return {
				item: this.$item.val(),
				quantity: this.$quantity.val(),
				price: this.$price.val(),
				store: this.$store.val(),
				order: app.Items.nextOrder(),
				completed: false
			};
		},

		//Durch drücken des Hinzufüge-Buttons wird ein neues Item-Model erstellt
		createOnEnter: function(e) {
			app.Items.create( this.newAttributes() );
			this.$item.val('');
			this.$quantity.val('');
			this.$price.val('');
			this.$store.val('');
		},

		//Alle mit "completed" - markierten Items und deren Models werden gelöscht
		clearAll: function() {
			_.invoke(app.Items.completed(), 'destroy');
			return false;
		},

		priceAlltogether: function() {
			var erg = 0;
			app.Items.each(function(items){
				erg += items.get('price') * items.get('quantity');
			});

			return erg;
		},

		priceAllMarked: function() {
			var erg = 0;
			app.Items.each(function(items){
				if(items.get('completed') == true) {
					erg += items.get('price') * items.get('quantity');
				}
			});
			return erg;
		},

		toggleAllComplete: function() {
			var completed = this.allCheckbox.checked;

			app.Items.each(function(items) {
				items.save({
					'completed': completed
				});
			});
		}
	});
});
