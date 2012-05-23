define(['constants', 'backbone'], function(Constants, Backbone){

	var Sprite = Backbone.Model.extend({
        defaults: {
            connector: null,
            x: null,
            y: null,
            pathPos: null,
            path: null,
            totalLength: null,
            stroke: "none",
            "stroke-width": 0,
            r: 10
        },

        setConnector: function(connector) {
            this.set({
                connector: connector,
                x: connector.coords.at(0).get("x"),
                y: connector.coords.at(0).get("y"),
                pathPos: 0
            });
        },
		
		increment: function(){
			
			var nextPathPos = this.get("pathPos") + Constants.spriteStepIncrement;
			var pointPath = this.get("connector").get("pointPath");
			
			//if pointPath 
			if(pointPath == null) return;
			
			//have we reached the end of the path?
			if (nextPathPos < pointPath.length) {
				
				var pos = pointPath[nextPathPos];
				
				this.set({
					x: pos.x,
					y: pos.y,
					pathPos: nextPathPos
				});
			}
			else {
				//we've reached the end of this path. is there another one to join?
				var currentConnector = this.get("connector")
				var node = currentConnector.get("endNode");
				var nextConnector = node.activeStartConnector();
				
				//fire the sprite passing over event on the node
				node.spritePassingOver(this);
				
				//we have another connector to move on to
				if (nextConnector != null) {
					//set the sprite to use the next connector
					this.setConnector(nextConnector);
				}
			}
		}
    });
	
	return Sprite;
});