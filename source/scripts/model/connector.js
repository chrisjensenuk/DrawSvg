define(['backbone', 'constants', 'connectorcoordinates'], function(Backbone, Constants, ConnectorCoordinates){
	var Connector = Backbone.Model.extend({
        defaults: {
            startNode: null,
            endNode: null,
            stroke: Constants.connectorStrokeColor,
            "stroke-width": 10,
            canDelete: true
        },

        initialize: function(options) {
            this.coords = new ConnectorCoordinates();
        },

        coordsToSVGPath: function() {
            var path = "";
            var coordsAry = this.coords.toArray();
            if (coordsAry.length > 0) {
                path += "M" + coordsAry[0].get("x") + "," + coordsAry[0].get("y") + " ";
                for (var i = 1; i < coordsAry.length; i++) {
                    path += "L" + coordsAry[i].get("x") + "," + coordsAry[i].get("y") + " ";
                }
            }
            return path;
        }
    });
	
	return Connector;
});