define(["backbone", "constants", "connectors", "sprites"], function(Backbone, Constants, Connectors, Sprites){

	var Node = Backbone.Model.extend({
        defaults: {
            x: null,
            y: null,
            nodeId: null,
            fill: Constants.nodeFillColor,
            stroke: Constants.nodeStrokeColor,
            "stroke-width": "none",
            r: 25,
            board: null,
			highlight: false
        },
        
        initialize: function(options){
			
			//collection of connectors that start at this node
            this.startConnectors = new Connectors();
			
			//collection of connectors that end at this node
            this.endConnectors = new Connectors();
			
        },
		
		destroy: function(){
			//stop listening to events so can clean up.
			var board = this.get("board");
			if(board != null) board.dispatcher.off(null, null, this);
			
			return Backbone.Model.prototype.destroy.call(this);
		},
        
        activeStartConnector: function(){
            return this.startConnectors.first();
        },
		
		//overrdie on nodes that can be set as a Connector's start node
		tryConnectorStart: function(){
			return null;
		},
		
		//override on nodes that can be set as a Connector's end node
		tryConnectorEnd: function(connector){
			return false;
		},
		
		//override - called whenever a sprite passes over
		spritePassingOver: function(sprite){
		
		}
		
	
    });
	
	return Node;
});