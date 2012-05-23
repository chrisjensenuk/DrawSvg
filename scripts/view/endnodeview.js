define(['nodeview'], function(NodeView){
	
	var  EndNodeView = NodeView.extend({
        cursorUp: function(e) {
            if(this.model.get("board").connectorEnd(this.model)){
                e.stopPropagation();
                e.preventDefault();
            }
        }
    });
	
	return EndNodeView;
});