define(['backbone'], function(Backbone){
	var ConnectorCoordinate = Backbone.Model.extend({
        defaults: {
            x: null,
            y: null
        }
    });
	
	return ConnectorCoordinate;
});