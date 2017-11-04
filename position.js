var AVAT_HEIGHT = 50;
var AVAT_WIDTH = 50;
var WIDTH = 600;
var HEIGHT = 500;
var TEXT_SIZE = 50
$( document ).ready(function() {
    console.log( "ready!" );
    $('body').append("asd")
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    canvas.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      var message = '' + mousePos.x + ',' + mousePos.y;
      writeMessage(canvas, message);
      context.fillStyle = 'green'
      context.fillRect(mousePos.x - AVAT_WIDTH/2,mousePos.y - AVAT_HEIGHT/2,AVAT_HEIGHT,AVAT_WIDTH);
    }, false);

});
function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(WIDTH, HEIGHT - TEXT_SIZE, canvas.width, canvas.height);
    context.font = TEXT_SIZE + 'pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, WIDTH, HEIGHT);
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
