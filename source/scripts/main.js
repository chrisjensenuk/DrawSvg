// Require.js allows us to configure shortcut alias
// There usage will become more apparent futher along in the tutorial.
require.config({
  baseUrl: "scripts",
  paths: {
  
	//libraries
	raphael: 'raphael.amd',
    jquery: 'jquery-1.7.2.min',
    underscore: 'underscore.amd',
    backbone: 'backbone.amd',
	
	constants: 'constants',
	
	//routers
	approuter: 'router/approuter',
	
	//models
	node: 'model/node',
	startnode: 'model/startnode',
	endnode: 'model/endnode',
	joinstartnode: 'model/joinstartnode',
	joinendnode: 'model/joinendnode',
	flipflopendnode: 'model/flipflopendnode',
	connector: 'model/connector',
	connectorcoordinate: 'model/connectorcoordinate',
	sprite: 'model/sprite',
	
	//model mixins
	nodeconnectorendmixin: 'model/nodeconnectorendmixin',
	nodeconnectorstartmixin: 'model/nodeconnectorstartmixin',
	
	//collections
	nodes: 'collection/nodes',
	connectors: 'collection/connectors',
	connectorcoordinates: 'collection/connectorcoordinates',
	sprites: 'collection/sprites',
	
	
	//views
	connectorview: 'view/connectorview',
	nodeview: 'view/nodeview',
	startnodeview: 'view/startnodeview',
	joinstartnodeview: 'view/joinstartnodeview',
	endnodeview: 'view/endnodeview',
	joinendnodeview: 'view/joinendnodeview',
	flipflopendnodeview: 'view/flipflopendnodeview',
	spriteview: 'view/spriteview',
	boardview: 'view/boardview',
	startbuttonview: 'view/startbuttonview'
	
  },
  priority: ['jquery', 'raphael', 'underscore', 'backbone']
});

define(["order!jquery", "order!raphael", "order!underscore", "order!backbone", "boardview", "approuter"],
	function($, Raphael, _, Backbone, BoardView){
	
	}
);