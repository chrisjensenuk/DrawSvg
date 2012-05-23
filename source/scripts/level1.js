//As the modelModules and viewModules are not known to the Board and are instantiated at runtime make sure they are available by requireing them here
define(["startnode", "joinendnode", "joinstartnode", "endnode", "flipflopendnode", "startnodeview", "joinendnodeview", "joinstartnodeview", "endnodeview"], function(){
	var arrangement = {
		nodes: [{nodeId: "s1", x: "100", y: "200", modelModule: "startnode", viewModule:"startnodeview", starting:["#35733E", "#35733E"]},
				{nodeId: "s2", x: "400", y: "100", modelModule: "startnode", viewModule:"startnodeview", starting:["#FF0090", "#FF0090"]},
				{nodeId: "j1", x: "160", y: "300", modelModule: "joinendnode", viewModule:"joinendnodeview"},
				{nodeId: "j2", x: "240", y: "300", modelModule: "joinendnode", viewModule:"joinendnodeview"},
				{nodeId: "j3", x: "200", y: "370", modelModule: "joinstartnode", viewModule:"joinstartnodeview"},
				{nodeId: "e1", x: "300", y: "500", modelModule: "endnode", viewModule:"endnodeview", expecting:["#FF0090", "#FF0090", "#35733E", "#35733E"]}],

		connections: [
			{from: "j1", to: "j3"},
			{from: "j2", to: "j3"},
		]
	};
	
	return arrangement;
    
});