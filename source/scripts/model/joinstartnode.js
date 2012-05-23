define(["underscore", "node", "nodeconnectorstartmixin"], function(_, Node, NodeConnectorStartMixin){
	var JoinStartNode = Node.extend();
	
	//add start node functionality
	_.extend(JoinStartNode.prototype, NodeConnectorStartMixin);
    
	return JoinStartNode;
});