define(['backbone'], function(Backbone){
	
	return{
		
		//size of the board
		boardWidth: 600,
		boardHeight: 600,
		
		//how often should sprites be released
		releaseRate: 200,
		
		//how far should the sprites step
		spriteStepIncrement: 1,
		
		//milliseconds to wait before incrementing
		timeout: 1,
		
		//colours
		nodeFillColor: "#F25C05",
		nodeStrokeColor: "#F25C05",
		endNodeFillColor: "#CCCCCC",
		endNodeStrokeColor: "#CCCCCC",
		connectorStrokeColor: "#F25C05",
		flipFlopDeactiveColor: "#F2B28A",
		drawnConnectorColor: "#93A605",
		nodeHighlightColor: "#FFE303"
	};
	
});