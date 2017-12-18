daylogs = [];

function getUnique(arr) {
	var temp = 0;
	var counter = 0;
	if (arr.length > 0) {
		temp = arr[0];
		counter = 1;
	}
	for (var i = 1; i < arr.length; i++) {
		var oldc = counter;
		if (arr[i] != temp){
			counter = counter + 1;
			temp = arr[i];
		}
	}
	return counter;
}

function getthedata() {
  usersReference.once("value", function(snap){
      snap.forEach(function(user){
        database.ref("users/" + user.key + "/days").once("value",  function(day) {
		day.forEach(function(finput){
 			var theday = finput.val().date;
            daylogs.push(finput.val().reason);
        });
      })
    });
  });
}
