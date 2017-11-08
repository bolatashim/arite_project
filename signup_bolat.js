
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
  
  const emailtxt = document.getElementById("email");
  const passwordtxt = document.getElementById("password");
  const institutiontxt = document.getElementById("institution");
  const registerbtn = document.getElementById("registerbtn");
  var occupation = "Undergrad";
  var gender = "Man";
  var age = 20;
  var avatar = 0;

  function addUser(user) {
    usersReference.push({
      email: user.email,
      institution: institutiontxt.value,
      gender: gender,
      occupation: occupation,
      age: age,
      avatar: avatar
    });
    alert("You are signed up!!!");
  }

  //registration event listener
  registerbtn.addEventListener("click", e => {
    const email = emailtxt.value;
    const password = passwordtxt.value;
    const auth = firebase.auth();

    console.log(email, password);

    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
      .then(user => addUser(user))
      .catch(e => console.log(e.message));
  });

  $('input[name="age"]', '#ages').on('change', function() {
    age = $(this).val();
  });


  $('input[name="gender_group"]', '#genders').on('change', function() {
    if($(this).is(':checked')) {
        gender = $(this).val();
    }
  });

  $('input[name="occupation_group"]', '#occupations').on('change', function() {
    if($(this).is(':checked')) {
        occupation = $(this).val();
    }
    console.log("before");
  });
  $('input[name="avatar_group"]', '#avatars').on('change', function() {
    if($(this).is(':checked')) {
        if ($(this).val() == "kim") {
          avatar = 1;
        } else {
          avatar = 0;
        }
    }
  });

  console.log("hehehe");
});