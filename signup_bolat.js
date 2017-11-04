
$(document).ready(function() {
  //initialize firebase
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

  const passwordtxt = document.getElementById("password");
  const emailtxt = document.getElementById("username");
  const registerbtn = document.getElementById("registerbtn");

  function addUser(user) {
    usersReference.push({
      email: user.email,
      location: "Daejeon",
      institution: "KAIST",
      gender: "male",
      occupation: "undergrad"
    });
    alert("You are signed up!!!");
  }

  //registration event listener
  btnregister.addEventListener("click", e => {
    const email = emailtxt.value;
    const password = passwordtxt.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
      .then(user => addUser(user))
      .catch(e => console.log(e.message));
  });









});