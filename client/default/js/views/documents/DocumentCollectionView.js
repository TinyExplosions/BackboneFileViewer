define([
    'underscore',
    'backbone',
    'hammer',
    'utils',
    'views/documents/DocumentListItemView'
], function(  _, Backbone, Hammer, Utils, DocumentListItemView ){

    var DocumentCollectionView = Backbone.View.extend({
    	tagName: 'ul',
    	attributes: {
    		class: "docList"
    	},
        initialize : function(options) {
              // bind the functions 'add' and 'remove' to the view.
            App.headerView.model.set("title",options.title);
			$("li").removeClass("active");
            $("li."+options.selectedTab).addClass("active");
            this.render = _.bind(this.render, this);
            _(this).bindAll('add', 'remove', 'reset');

            this._docCollectionView = [];

            if(this.collection) {
                // add each doc to the view
                this.collection.each(this.add);
            }

            // bind this view to the add and remove events of the collection!
            this.collection.bind('add', this.add);
            this.collection.bind('remove', this.remove);
            this.collection.bind('reset', this.reset);
        },

        events: {
        },

        reset: function(collection) {
            // this._docCollectionView = [];
            // $(this.el).empty();
            console.log("reset!",collection);
            // _(collection.models).each(function(model) {
            //     console.log(model);
            //     this.add(model);
            // }.bind(this));
            // this.render();
        },

        add : function(model) {
            console.log("Add Model");
            var docView = new DocumentListItemView({
                model : model
            });
            this._docCollectionView.push(docView);

            // If the view has been rendered, then
            // we immediately append the rendered image.
            if (this._rendered) {
                $(this.el).append(docView.render().el);
            }
        },

        remove : function(model) {
            console.log("Remove");
			if(model) {
				var viewToRemove = _(this._docCollectionView).select(function(cv) {
					return cv.model === model;
				});
				this._docCollectionView = _(this._docCollectionView).without(viewToRemove[0]);

				if (this._rendered) {
					$(viewToRemove[0].el).remove();
				}
			}
        },

        render : function() {
            // We keep track of the rendered state of the view
            this._rendered = true;

            $(this.el).empty();

            var content = [];
            _(this._docCollectionView).each(function(docView) {
                content.push(docView.render().el);
            });
            $(this.el).append(content);
            this.$el.hammer();
            return this;
        }
  });

  return DocumentCollectionView;

});