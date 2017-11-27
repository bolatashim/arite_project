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

function arrangeOutput() {
	console.log("no longer waiting");
	while (true) {
		// console.log("expected: ", )
		// setTimeout(function(){ console.log("waiting"); }, 1);

		if (expected_length == Object.keys(connections_dict)) {
			organizeNodesEdges();
			console.log("no longer waiting");
			console.log(outp);
			break;
		}
	}
}

retrieveConnections();
arrangeOutput();

console.log("hello");





