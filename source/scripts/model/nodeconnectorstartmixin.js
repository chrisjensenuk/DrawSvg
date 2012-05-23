define(["node", "connector", "constants"], function(Node, Connector, Constants){
	
	var StartNodeMixin = {
	
		tryConnectorStart: function(connector){
		
			//draw a new connector
            var connector = new Connector({
                startNode: this,
                stroke: Constants.drawnConnectorColor
            });
			
			//set the beginning connector coords as the coords of this node
			connector.coords.add({
                x: this.get("x"),
                y: this.get("y")
            });
			
			this.startConnectors.add(connector);
			
			//this node can be set as an start node so return the connector
			return connector;
		},
		
	};
    
	return StartNodeMixin;
});