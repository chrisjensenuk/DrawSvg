define(["underscore", "node", "nodeconnectorendmixin", "sprites", "constants"], function(_, Node, NodeConnectorEndMixin, Sprites, Constants){
	
	var EndNode = Node.extend({
	
		initialize: function(options){
		
			this.constructor.__super__.initialize.apply(this, [options]);
			
			this.set({
				fill : Constants.endNodeFillColor,
				stroke: Constants.endNodeStrokeColor
			});
			
			//collection of sprites that end at this node
			this.finishedSprites = new Sprites();
			
			var board = this.get("board");
			
			//this is an EndNode so show the expecting markers
			this.setupExpectingMarkers();
			
			//listen to when the board is drawing a connector
			board.dispatcher.on("connectorStarted", function(){ 
				if(this.startConnectors.length == 0){
					this.set("highlight", true);
				}
			}, this);
			
			//if we are no longer joining a connector then clear the highlight
			board.dispatcher.on("connectorEnded connectorCancelled", function(){ this.set("highlight", false);}, this);
			
			//If the board says that the sprites have finished then validate
			board.dispatcher.on("spritesFinished", this.validateFinishedSprites, this);
		},
		
		//adds the markers for the end node
        setupExpectingMarkers: function(){
            
			var expecting = this.get("expecting");
			
            for(var i=0; i < expecting.length; i++){
                var position = this.getSpriteEndPosition(i);
                this.get("board").addMarker(position, expecting[i]);
            }
        },
        
        getSpriteEndPosition: function(finishedPosition){
            return {
                        x: ((this.get("expecting").length - finishedPosition ) * 35) + parseInt(this.get("x")),
                        y: parseInt(this.get("y")) + 50
                    };
        },
		
		spritePassingOver: function(sprite){
			//the sprite has over the top of the end node.
			var board = this.get("board");
			
			//sprite has reached the end node so it is no longer 'active'
			board.activeSprites.remove(sprite);
			
			//add sprite to the node's finished sprite
			this.finishedSprites.add(sprite);
			
			//move the sprite to the 'finished' collection
			board.finishedSprites.add(sprite);
			
			
		},
		
		validateFinishedSprites: function(){
			var self = this;
			
			var valid = (function(){
				//if we don't have enough sprites then it isn't valid
				if(self.finishedSprites.length != self.get("expecting").length) return false;
			
				for(var i = 0; i < self.finishedSprites.length; i++){
					//if the colour is different to what we expected then it is not valid
					if(self.finishedSprites.at(i).get("fill") != self.get("expecting")[i]) return false;
				}
				return true;
			})();
			
			if(valid == false) self.get("board").finishedSpritesAreValid = false;
		}
		
	});
	
	//add end node functionality
	_.extend(EndNode.prototype, NodeConnectorEndMixin);
    
	return EndNode;
});