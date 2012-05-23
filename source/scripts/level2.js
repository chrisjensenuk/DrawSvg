//As the modelModules and viewModules are not know to the Board and are instantiated at runtime make sure they are available by requireing them here
define(["startnode", "joinendnode", "joinstartnode", "endnode", "flipflopendnode", "startnodeview", "joinendnodeview", "joinstartnodeview", "endnodeview", "flipflopendnodeview"], function(){
	
	var arrangement = {
		nodes: [{nodeId: "s1", x: "300", y: "100", modelModule: "startnode", viewModule:"startnodeview", starting:["#35733E", "#FF0090", "#35733E", "#FF0090"]},
				{nodeId: "j1", x: "160", y: "350", modelModule: "joinendnode", viewModule:"joinendnodeview"},
				{nodeId: "j2", x: "240", y: "350", modelModule: "joinendnode", viewModule:"joinendnodeview"},
				{nodeId: "j3", x: "200", y: "420", modelModule: "joinstartnode", viewModule:"joinstartnodeview"},
				{nodeId: "j4", x: "400", y: "200", modelModule: "flipflopendnode", viewModule:"flipflopendnodeview"},
				{nodeId: "j5", x: "360", y: "270", modelModule: "joinstartnode", viewModule:"joinstartnodeview"},
				{nodeId: "j6", x: "440", y: "270", modelModule: "joinstartnode", viewModule:"joinstartnodeview"},
				{nodeId: "e1", x: "300", y: "500", modelModule: "endnode", viewModule:"endnodeview", expecting: ["#35733E", "#35733E", "#FF0090", "#FF0090"]}],

		connections: [
			{from: "j1", to: "j3"},
			{from: "j2", to: "j3"},
			{from: "j4", to: "j5"},
			{from: "j4", to: "j6"},
		]
		
	}
	
	return arrangement;
    
});