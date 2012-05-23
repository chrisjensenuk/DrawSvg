define(['backbone', 'sprite'], function(Backbone, Sprite){
	
	var Sprites = Backbone.Collection.extend({
        model: Sprite,
        
        destroyAll: function(){
            while(this.length > 0){
                this.at(0).destroy();
            }
        }
    });
	
	return Sprites;
	
});