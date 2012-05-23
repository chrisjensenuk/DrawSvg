require(['order!underscore', 'order!backbone', 'boardview'], function(_, Backbone, BoardView){
	
	var AppRouter = Backbone.Router.extend({
		
		initialize: function(){
			
		},
		
		routes: {
			"level/:id": "loadLevel",
			"*actions": "defaultRoute"
		},
		
		defaultRoute: function( actions ){
            alert( actions ); 
        },
		
		loadLevel: function(levelId){
			var self = this;
			
			self.levelId = levelId;
			
			var levelModule = "level" + levelId;
			
			//load the level arrangement
			require([levelModule], function(arrangement){
				BoardView.load(arrangement);
			});
			
		}
	});

	// Instantiate the router
    var app_router = new AppRouter;
    
	// Start Backbone history a neccesary step for bookmarkable URL's
    Backbone.history.start();
	
	return app_router;

});