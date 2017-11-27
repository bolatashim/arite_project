var config = {
  apiKey: "AIzaSyBIuiGklPwChoeJ2PFWQVOJCvhO82Dbh0o",
  authDomain: "arite-project-6982b.firebaseapp.com",
  databaseURL: "https://arite-project-6982b.firebaseio.com",
  projectId: "arite-project-6982b",
  storageBucket: "",
  messagingSenderId: "281398737861"
};
firebase.initializeApp(config);
var database = firebase.database();
var usersReference = database.ref("users");
var expected_length = 99999;
var connections_dict = {};
var outp = {"nodes": [], "links": []};

/* stores all of the edges in the connections_dict */
/* if connections_dict[email]["empty"] is 1, it means this node has no outward edges */
function retrieveConnections() {
  	usersReference.once("value", function(snap){
		expected_length = snap.numChildren();
		console.log("expected ", expected_length, "children");
		snap.forEach(function(user){
			connections_dict[user.val().email] = {"empty": 1};
			connections_dict[user.val().email]["avatar"] = user.val().avatar;
    		database.ref("users/" + user.key + "/conections").once("value",  function(connection) { //need to change to connections after completion
      			connection.forEach(function(email) {
        			console.log(user.val().email, " : ", email.val().email);
        			connections_dict[user.val().email]["empty"] = 0;
        			connections_dict[user.val().email][email.val().email] = 1;
    			});
  			})
		});
	});
}


function organizeNodesEdges() {
	for (var email in connections_dict) {    
    	var node = {"id": email, "avatar": connections_dict[email]["avatar"]}
    	outp["nodes"].push(node);
    	for (var edge in connections_dict[email]) {
    		if (edge != "empty" && edge != "avatar") {
    			var link = {"source": email, "target": edge,"weight": 1}
    			outp["links"].push(link);
    		}
    	}
	}
}

async function arrangeOutput() {
	while (true) {
    await sleep(2000);
		if (expected_length == Object.keys(connections_dict).length) {
			organizeNodesEdges();
			break;
		}
	}
}

function together() {
  retrieveConnections();
  arrangeOutput();  
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




//code starts here
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("miserables.json", function(error, graph) {
  if (error) throw error;

  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function(d) { return color(d.group); })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }
});
//functions from M bostock
function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

