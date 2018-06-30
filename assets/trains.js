var config = {
  // how do I protect the apiKey?
  apiKey: "AIzaSyDaY_v5Av_DAEFUkeELOvs2xBWZsR8qAvw",
  authDomain: "trains-rushjob.firebaseapp.com",
  databaseURL: "https://trains-rushjob.firebaseio.com",
  projectId: "trains-rushjob",
  storageBucket: "trains-rushjob.appspot.com",
  messagingSenderId: "464928123166"
};
firebase.initializeApp(config);


var database = firebase.database();

var trainName = "";
var trainDestination = "";
var trainStarts = null;
var trainHowLongUntil = null;

$("#addTrain").on("click", function(event) {
  event.preventDefault();
  var trainID = $("#train-name-input").val().trim();
  var lastStop = $("#destination").val().trim();
  var engineStart = moment($("#primero").val().trim(), 'hh:mm').format ("X");
  var nextOneComing = $("#howOften").val().trim();

  var newLine = {
    name: trainID,
    destination: lastStop,
    primero: engineStart,
    soon: nextOneComing

  };

  database.ref().push(newLine);

  console.log(newLine.name);
  console.log(newLine.destination);
  console.log(newLine.primero);
  console.log(newLine.soon);

  // here would be a neat spot for a modal box stating that the new train line has been successfully added.

  // these should clear the input form, but it may not work as I am expecting on the time and frequency lines.

  // $("#train-name-input").val("");
  // $("#destination").val("");
  // $("#primero").empty();
  // $("#howOften").empty();

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childShanpshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStarts = childSnapshot.val().primero;
    var trainHowLongUntil = childSnapshot.val().soon;

    // train line information
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStarts);
    console.log(trainHowLongUntil);

    // calculate the time for the next train
    // frequency variable needs to be up at the top here.
    var trainHowLongUntil = $("#howOften");
    var preordained = moment(engineStart, "hh:mm").subtract(1, "years");
    console.log(preordained);
    // have computer recognise what time it is...
    var currentTime = moment();
    console.log("current time: " + moment(currentTime).format("hh:mm"));
    //Difference between the times...
    var diffTime = moment().diff(moment(preordained), "minutes");
    console.log("difference in time: " + diffTime);
    //how soon?
    var timeLeft = diffTime % trainHowLongUntil;
    console.log(timeLeft);
    // 
    var countDown = trainHowLongUntil - timeLeft;
    console.log("minutes until train " + countDown);
    
    var nextTrain = moment().add(countDown, "minutes");
    var nextTrainB = ("arrival time: " + moment(nextTrain).format('hh:mm'));

    

    // create the train line
    var newLine = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(nextOneComing),
      $("<td>").text(nextTrainB),
      $("<td>").text(trainHowLongUntil)
    );

    $("#trainTable > tbody").append(newRow);

  })

})
