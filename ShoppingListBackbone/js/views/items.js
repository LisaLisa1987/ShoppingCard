var app = app || {};

$(function() {
	'use strict';

	//ShoppingCard Item View
	app.ShoppingCardView = Backbone.View.extend({

		//Das DOM-Element für ein neues Item = tr
		tagName:  'tr',

		//Die Template-Funktion für ein einzelnes item
		template: _.template( $('#item-template').html() ),

		//Die DOM-Events für ein Item
		events: {
			'click .toggle':	'toggleCompleted',
			'click .destroy':	'clear',
			'click .destroyAll': 'clearAll'
		},

		// The ShoppingCardView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **ShoppingCard** and a **ShoppingCardView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			this.$el.toggleClass( 'completed', this.model.get('completed') );
			this.toggleVisible();
			return this;
		},

		toggleVisible: function() {
			this.$el.toggleClass( 'hidden',  this.isHidden());
		},

		isHidden: function() {
			var isCompleted = this.model.get('completed');
			return ( 
				(!isCompleted === 'completed') || (isCompleted === 'active')
			);
		},

		//Hin- und herschalten des Status "completed" 
		toggleCompleted: function() {
			this.model.toggle();
		},

		//Ein item wird gelsöcht, das Model von localStorage entfernt und die dazugehörige View gelöscht
		clear: function() {
			this.model.destroy();
		}
	});
});
