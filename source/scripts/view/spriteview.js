define(['jquery', 'backbone'], function($, Backbone){
	
	var SpriteView = Backbone.View.extend({
        initialize: function(options) {
            this.shape = options.board.paper.circle();
            this.shape.attr({fill: this.model.get("fill"), stroke: this.model.get("stroke"), "stroke-width": this.model.get("stroke-width"), "r": this.model.get("r")})
            this.el = this.shape.node;
            this.$el = $(this.shape.node);
            this.delegateEvents(this.events);
            
			this.model.on("change", this.updateSprite, this);
            this.model.on("destroy", this.destroyed, this);
            
			this.render(); 
        },
        
        updateSprite: function() {
            this.shape.attr({
                cx: this.model.get("x"),
                cy: this.model.get("y")
            });
        },
        
        destroyed: function(){
					
            this.remove();
        },

        render: function() {
            this.shape.attr({
                fill: this.model.get("fill"),
            });
            this.updateSprite();
        }
    });
	
	return SpriteView;
});