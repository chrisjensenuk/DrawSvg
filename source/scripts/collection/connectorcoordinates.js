define(['backbone', 'connectorcoordinate'], function(Backbone, ConnectorCoordinate){

	var ConnectorCoordinates = Backbone.Collection.extend({
        model: ConnectorCoordinate
    });
	
	return ConnectorCoordinates;
});