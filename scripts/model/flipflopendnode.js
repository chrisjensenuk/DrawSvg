define(["order!underscore", "node", "nodeconnectorendmixin", "constants"], function(_, Node, NodeConnectorEndMixin, Constants){
	
		var FlipFlopEndNode = Node.extend({
        initialize: function(options){
            this.constructor.__super__.initialize.apply(this, [options]);
			
			this.set({
				fill : Constants.endNodeFillColor,
				stroke: Constants.endNodeStrokeColor
			});
			
            this.startConnectors.on("add", this.startConnectorAdded, this);
			
			//listen to when the board is drawing a connector
			this.get("board").dispatcher.on("connectorStarted", function(){ 
				if(this.endConnectors.length == 0){
					this.set("highlight", true);
				};
				}, this);
			this.get("board").dispatcher.on("connectorEnded connectorCancelled", function(){ this.set("highlight", false);}, this);
        },
        
        startConnectorAdded: function(connector){
            connector.set("flipflopactive", (this.startConnectors.length == 1));
        },
        
        activeStartConnector: function(){
            return this.startConnectors.find(function(connector){
                return connector.get("flipflopactive");
            });
        },
        
        stepActiveStartConnector: function(){
            var current = this.activeStartConnector();
            var pos = this.startConnectors.indexOf(current);
            pos++;
            if(pos == this.startConnectors.length) pos = 0;
            current.set("flipflopactive", false);
            this.startConnectors.at(pos).set("flipflopactive", true);
        },
		
		
		spritePassingOver: function(sprite){
			//change the active start connector
			this.stepActiveStartConnector();
		}
        
    });
	
	//add end node functionality
	_.extend(FlipFlopEndNode.prototype, NodeConnectorEndMixin);
	
	return FlipFlopEndNode;
});