var AVAT_HEIGHT = 50;
var AVAT_WIDTH = 50;
var WIDTH = 800;
var HEIGHT = 600;
var TEXT_SIZE = 50
var username = 'cena'
$( document ).ready(function() {
    console.log( "ready!" );
    $('body').append("asd")
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var background = new Image();
    background.src = "emotion_graph_800_600.png"
    background.onload = function(){
      context.drawImage(background,0,0)
    }
    canvas.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      var message = '' + parseInt(mousePos.x) + ',' +  parseInt(mousePos.y);
      writeMessage(canvas, message);
      avatar = new Image();
      avatar.src = username + "_avatar.png";
      avatar.onload = function(){
        context.drawImage(avatar,mousePos.x - AVAT_WIDTH/2,mousePos.y - AVAT_HEIGHT/2);
      }
      //context.fillStyle = 'green'
      //context.fillRect(mousePos.x - AVAT_WIDTH/2,mousePos.y - AVAT_HEIGHT/2,AVAT_HEIGHT,AVAT_WIDTH);
    }, false);

});
function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(WIDTH, HEIGHT, canvas.width, canvas.height);
    context.font = TEXT_SIZE + 'pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, WIDTH, HEIGHT+TEXT_SIZE);
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
