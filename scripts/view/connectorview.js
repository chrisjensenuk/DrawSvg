define(['constants', 'jquery', 'backbone'], function(Constants, $, Backbone){

	var ConnectorView = Backbone.View.extend({
        initialize: function(options) {
            this.shape = options.board.paper.path();
            this.shape.toBack();
            this.shape.attr({stroke: this.model.get("stroke"), "stroke-width": this.model.get("stroke-width")});
            this.el = this.shape.node;
            this.$el = $(this.shape.node);
            
			this.model.coords.on("add", this.render, this);
            this.model.on("change:flipflopactive", this.flipFlopActiveChanged, this);
            this.model.on("destroy", this.destroyed, this);
			
            this.render();
        },

        events: {
            "click" : "destroy",
            "touchend" : "destroy"
        },
        
        flipFlopActiveChanged: function(connector){
            //change the color of the connector
            if(connector.get("flipflopactive")){
                this.shape.attr({"stroke": Constants.connectorStrokeColor});
            }
            else{
                this.shape.attr({"stroke": Constants.flipFlopDeactiveColor});
            }
        },
        
        destroy: function(e){
            var self = this;
            if(self.model.get("canDelete")){
                self.model.destroy();
            }
        },

        render: function() {
            //we work out the SVG path on render and update the model with it
            var path = this.model.coordsToSVGPath();
            this.shape.attr({
                path: path
            });
            this.model.set("path", path);
        },

		destroyed: function(){
			this.remove();
		}


    });
	
	return ConnectorView;
});