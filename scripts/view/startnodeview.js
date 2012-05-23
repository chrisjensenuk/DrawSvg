define(['nodeview'], function(NodeView){

	var StartNodeView = NodeView.extend({
        cursorDown: function(e) {
            this.model.get("board").connectorStart(this.model);
        }
    });
	
	return StartNodeView;
});