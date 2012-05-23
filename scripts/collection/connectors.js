define(['backbone', 'connector'], function(Backbone, Connector){

	var Connectors = Backbone.Collection.extend({
        model: Connector,
		
		destroyAll: function(){
            while(this.length > 0){
                this.at(0).destroy();
            }
        }
    });
	
	return Connectors;

});