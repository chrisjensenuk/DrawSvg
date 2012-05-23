//As the modelModules and viewModules are not known to the Board and are instantiated at runtime make sure they are available by requireing them here
define(["startnode", "endnode"], function(){
	var arrangement = {
		nodes: [{nodeId: "s1", x: "200", y: "100", modelModule: "startnode", viewModule:"startnodeview", starting:["#35733E", "#FF0090"]},
				{nodeId: "e1", x: "400", y: "500", modelModule: "endnode", viewModule:"endnodeview", expecting:["#35733E", "#FF0090"]}],

		connections: []
	};
	
	return arrangement;
    
});