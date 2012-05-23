define(['backbone', 'node'], function(Backbone, Node){
	var Nodes = Backbone.Collection.extend({
        model: Node,
		
		destroyAll: function(){
            while(this.length > 0){
				this.at(0).destroy();
            }
        }
    });
	
	return Nodes;
});