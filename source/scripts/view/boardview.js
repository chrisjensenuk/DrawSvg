define(
	[
	'order!underscore',
	'order!backbone',
	'order!raphael',
	'order!jquery',
	'constants',
	'node',
	'nodes',
	'nodeview',
	'connector',
	'connectors',
	'connectorview',
	'sprite',
	'sprites',
	'spriteview',
	'startbuttonview'
	], 
	
	function(_, Backbone, Raphael, $, Constants,  Node, Nodes, NodeView, Connector, Connectors, ConnectorView, Sprite, Sprites, SpriteView, StartButtonView){
	
	//this the the connector that is currently being drawn
	var tmpConnectorView = null;
	
    var BoardView = Backbone.View.extend({
		
        initialize: function() {
            var self = this;
            
            self.paper = Raphael("board", Constants.boardWidth, Constants.boardHeight);
            self.el = self.paper.canvas;
            self.$el = $(self.el);
            self.offset = self.$el.offset();

            self.nodes = new Nodes();
            self.nodes.on("add", self.nodeAdded, self);
			
            self.connectors = new Connectors();
            self.connectors.on("add", self.connectorAdded, self);
            
            self.allSprites = new Sprites();
            self.activeSprites = new Sprites();
			
			self.markers = new Nodes();
            
            self.finishedSprites = new Sprites();
            self.finishedSprites.on("add", self.spriteFinished, self);
			
			//create an event dispatcher so Nodes can listen in to BoardView state changes
			self.dispatcher = _.clone(Backbone.Events);
            
            //bind to events outside of the View
            $("body").on("mouseup", _.bind(self.cursorUp, self));
            $("body").on("touchend", _.bind(self.cursorUp, self));

            //add the start/stop button
            var startButtonView = new StartButtonView({
                board: this
            });
			
        },

        events: {
            "mousemove": "cursorMove",
            "touchmove": "cursorMove",
            "touchend": "touchEnd",
			"touchstart": function(e) {
				//just ignore touch start on the boad
                e.preventDefault();
            },
        },
		
		load: function(arrangement, levelNo){
			var self = this;
			
			//clear out the last level
			self.allSprites.destroyAll();
			self.nodes.destroyAll();
			self.connectors.destroyAll();
			self.markers.destroyAll();
			
			self.levelNo = levelNo;
			
			//save the arrangement of the level
			self.arrangement = arrangement;
		
			//arrage the board
            self.setupNodes(arrangement);
            self.setupConnectors(arrangement);
			
			//setup the sprites
            self.resetSprites(arrangement);
		},
		
		//add the nodes as specified in the arrangement
        setupNodes: function(arrangement) {
            var self = this;
            _.each(arrangement.nodes, function(config) {
				require([config.modelModule], function(Model){
					var options = _.extend({}, config, {board: self});
					var node = new Model(options);
					self.nodes.add(node);
				});
            });
        },

        
		//called when a node is added to the nodes collection
        nodeAdded: function(node){
			//get the right view for the node and render it
			require([node.get("viewModule")], function(View){
				var view = new View({model: node});
			});
        },

		//Add the connectors specified in the arrangement
        setupConnectors: function(arrangement) {
            var self = this;

            _.each(arrangement.connections, function(config) {
                
                var startNode = self.nodes.find(function(node) {
                    return node.get("nodeId") == config.from
                });
                
                var endNode = self.nodes.find(function(node) {
                    return node.get("nodeId") == config.to;
                });
                
                var connector = new Connector(_.extend({}, config, {
                    startNode: startNode,
                    endNode: endNode,
                    canDelete: false
                }));
                connector.coords.add({
                    x: startNode.get("x"),
                    y: startNode.get("y")
                });
                connector.coords.add({
                    x: endNode.get("x"),
                    y: endNode.get("y")
                });
                
                var connectorView = new ConnectorView({
                    model: connector,
                    board: self
                });
                    
                self.connectors.add(connector);
                startNode.startConnectors.add(connector);
            });
        },

		//Try to start drawing a connector
        connectorStart: function(node) {
            //only allow one connector to be drawn per node
            if(node.startConnectors.length > 0) return false;
			
			//if the node can be used as a start node then it will return a connector when we try to start a connector
            var connector = node.tryConnectorStart();
			
			//see if we can set
			if(connector != null){
				tmpConnectorView = new ConnectorView({
                model: connector,
                board: this
				});
				
				this.dispatcher.trigger("connectorStarted");
			}
        },

		//Try to complete the drawing of a connector
        connectorEnd: function(node) {
		
            //if we are not currently drawing a connector then we can't end it. Return false;
            if(tmpConnectorView == null) return false;

            //can only have one connection to an end node
            if(node.endConnectors.length > 0) return false;
			
			if(node.tryConnectorEnd(tmpConnectorView.model)){	
				this.connectors.add(tmpConnectorView.model);
				tmpConnectorView = null;
				this.dispatcher.trigger("connectorEnded");
				return true;
			}
			
			//not allowed to set this type of node as an endnode
			return false;
        },
        
		//called after a connector is added to connectors collection
        connectorAdded: function(connector){
            //calculate the point path from the SVG path
            var pointPath = Raphael.getPointPath(connector.get("path"))
            connector.set("pointPath", pointPath.path);
        },

		//handles touchend event. locates the position the touchend happened and if there is a node then calls connectorEnd
        touchEnd: function(e) {
            
            if (tmpConnectorView == null) return;

            var pageX = e.originalEvent.changedTouches[0].clientX;
            var pageY = e.originalEvent.changedTouches[0].clientY;

            var x = pageX - this.offset.left;
            var y = pageY - this.offset.top;

            var shape = this.paper.getElementByPoint(x, y);

            if (shape == null || shape.node.id == null) return;

            var node = this.nodes.find(function(n) {
                return n.id == shape.node.id
            });

			if(this.connectorEnd(node)){
				e.stopPropagation();
				e.preventDefault();
			}
        },

		//fires for mousemove & touchmove events
        cursorMove: function(e) {

            if (tmpConnectorView != null) {

                var pageX = e.pageX || e.originalEvent.touches[0].pageX;
                var pageY = e.pageY || e.originalEvent.touches[0].pageY;

                var x = pageX - this.offset.left;
                var y = pageY - this.offset.top;

                //we are drawing a connector
                tmpConnectorView.model.coords.add({
                    x: x,
                    y: y
                });
            }
        },
		
		//fires for mouseup & touchend for the whole body of the page
        cursorUp: function(e) {

            //This is the default behaviour should a cursor be released on an element that doesn't have its own non propagating cursorup event.
            if (tmpConnectorView != null) {
                tmpConnectorView.model.destroy();
				this.dispatcher.trigger("connectorCancelled");
                tmpConnectorView = null;
            }
        },

		//see if we have any sprites waiting to be released and if its time then release them
        checkSpriteRelease: function(){
            var self = this;
            if(this.releaseCount % Constants.releaseRate === 0){
                //get appropriate nodes to release a sprite if they need to
				this.dispatcher.trigger("releaseSprite");
            }
            this.releaseCount++;
        },
        
		//start releasing the sprites
        start: function() {
            var self = this;
            if(self.timer != null) clearInterval(self.timer);
            self.resetSprites(self.arrangement);

			self.working = false;
			self.timer = setInterval(function() {
					self.stepSprites()
				}, Constants.timeout);
        },
    
		//increment the sprites
        stepSprites: function(){
            var self = this;
            
            //all the sprites have finished so no need to continue
            if(this.finishedSprites.length == this.spriteCount) return;
            
			//see if there are any sprites that a due to be released
            this.checkSpriteRelease();
            
			//for each 'active' sprite increment it along their path
            this.activeSprites.each(function(sprite) {
			
				sprite.increment();
			
            });
        },
        
		//destroy the current sprites and setup
        resetSprites: function(arrangement){
            var self = this;
            
            self.allSprites.destroyAll();
            self.releaseCount = 0;
			
			self.dispatcher.trigger("createSprites");
			
			self.spriteCount = self.allSprites.length;
			self.finishedSpritesAreValid = true;
        },
		
		addSprite: function(node, position, fill){
			var self = this;
			
			var sprite = new Sprite(_.extend(position, {fill: fill}));
			
			node.startSprites.add(sprite);
			self.allSprites.add(sprite);
			
			var spriteView = new SpriteView({
				model: sprite,
				board: self
			});
		},
        
		//adds a marker ring
        addMarker: function(position, stroke){
			
            var options = _.extend({}, position, {fill: "none",
                                    stroke: stroke,
                                    "stroke-width": 3,
                                    r: 14,
									board: this});
                var marker = new Node(options);
				
				this.markers.add(marker);
				
                var markerView = new NodeView({
                    model: marker
                });
        },
        
		//called when a sprite is added to the finishedSprites collection
        spriteFinished : function(sprite){
			var self = this;
            var endNode = sprite.get("connector").get("endNode")
            var pos = endNode.finishedSprites.indexOf(sprite);
			
			//move the sprite to their finished marker
			sprite.set(endNode.getSpriteEndPosition(pos));
            
            //have we done it?
            if(this.finishedSprites.length == this.spriteCount){
                //all our expected sprites have finished.  Are they in the right order?
				clearInterval(this.timer);
				
				//this will trigger the end nodes to validate their finished sprites and set the self.finishedSpritesAreValid flag
				this.dispatcher.trigger("spritesFinished");
                
				//wrap message in a timeout to allow UI to update
                setTimeout(function(){
                if(self.finishedSpritesAreValid){
                    alert("You Win!");
					
					//move onto the next level
					var nextLevel = self.levelNo + 1;
					if(nextLevel = Constants.levelCount) nextLevel = 0;
					var route = "level/" + nextLevel;
					self.navigate(route, {trigger: true});
                }
                else{
                    alert("You Lose!");
                }
                }, 50);
            }
        },
    });

	return new BoardView();
});