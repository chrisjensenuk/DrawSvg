define(["underscore", "backbone", "node", "sprites", "nodeconnectorstartmixin"], function(_, Backbone, Node, Sprites, NodeConnectorStartMixin){
	
	var StartNode = Node.extend({
        initialize: function(options){
            this.constructor.__super__.initialize.apply(this, [options]);
			
			//collection of sprites that start from this node
			this.startSprites = new Sprites();
			
			//add the marker rings for each starting sprite
			this.addStartSpriteMarkers();
			
			var board = this.get("board");
			board.dispatcher.on("createSprites", this.createSprites, this);
			board.dispatcher.on("releaseSprite", this.releaseSprite, this);
        },
		
		//Add the starting markers for the sprites
		addStartSpriteMarkers: function(){
			var startingSpriteFills = this.get("starting");
			
			for(var i = 0; i < startingSpriteFills.length; i++){
				var position = this.getSpriteStartPosition(i);
				this.get("board").addMarker(position, startingSpriteFills[i]);
			};
		},
		
		//create the sprites and add at starting position
		createSprites: function(){
			
			var startingSpriteFills = this.get("starting");
			
			for(var i = 0; i < startingSpriteFills.length; i++){
				var position = this.getSpriteStartPosition(i);
				this.get("board").addSprite(this, position, startingSpriteFills[i]);
			}
		},
		
		//placement for the sprites when starting
		getSpriteStartPosition: function(startingPosition){
            return {
                        x: (parseInt(this.get("x") - (startingPosition) * 35)),
                        y: parseInt(this.get("y")) - 50
                    };
        },
		
		releaseSprite: function(){
			if(this.startSprites.length > 0){
				var sprite = this.startSprites.at(0);
				if(this.activeStartConnector() != null){
					this.startSprites.remove(sprite);
					sprite.setConnector(this.activeStartConnector());
					this.get("board").activeSprites.add(sprite);                        
				}
			}
		}
		
    });
	
	//add start node functionality
	_.extend(StartNode.prototype, NodeConnectorStartMixin);
	
	return StartNode;
});