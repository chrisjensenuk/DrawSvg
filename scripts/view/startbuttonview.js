define(["jquery","backbone"],function(a,b){var c=b.View.extend({initialize:function(b){this.shape=b.board.paper.rect(),this.el=this.shape.node,this.$el=a(this.shape.node),this.delegateEvents(this.events),this.render()},events:{click:"click",touchstart:"click"},click:function(a){this.options.board.start()},render:function(){return this.shape.attr({x:500,y:10,width:50,height:50,fill:"green"}),this}});return c})