define(["node"], function(Node){
	
	var EndNodeMixin = {
	
		tryConnectorEnd: function(connector){
			
			//set the final connecotr coords as the coords of this node
			connector.coords.add({
						x: this.get("x"),
						y: this.get("y")
					});
			
			//set this node as the connector's end node
			connector.set("endNode", this);
			
			//end this connector to the node's endConnector list
			this.endConnectors.add(connector);
			
			//this node can be set as an end node so return true
			return true;
		},
		
	};
    
	return EndNodeMixin;
});