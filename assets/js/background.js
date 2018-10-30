var canvas;
var grid_size;
var maxVerticalLines;
var bgMode;
var strokeMode;
var bgChanged;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  document.getElementById('title-fluid').addEventListener('mouseover', onHoverFluid);
  document.getElementById('title-motion').addEventListener('mouseover', onHoverMotion);
  document.getElementById('title-fluid').addEventListener('mouseout', onLeaveFluid);
  document.getElementById('title-motion').addEventListener('mouseout', onLeaveMotion);
  maxVerticalLines = 15;      // number of vertical lines is fixed
  grid_size = windowWidth / maxVerticalLines;
  bgMode = 255;
  strokeMode = 0;
  bgChanged = false;
  strokeWeight(0.5);
  background(bgMode);
  stroke(strokeMode);
}

function draw() {
  // clear draw from previous frame
  background(bgMode);
  stroke(strokeMode);
  for(var x = grid_size; x < windowWidth; x+=grid_size) {
    if (x >= grid_size && x <= grid_size * 4) {
      var numHorizontalLines = Math.floor(windowHeight / grid_size);
      var blockTop = (numHorizontalLines - 1) * grid_size;
      line(x, 0, x, blockTop);
      line(x, blockTop + grid_size, x, windowHeight);
    } else {
      line(x, 0, x, windowHeight);
    }
  }
  for(var y = grid_size; y < windowHeight; y+=grid_size) {
    line(0, y, windowWidth, y);
  }
}

function onHoverFluid() {
  bgMode = 255;
  strokeMode = 0;
  var fluid = document.getElementById('title-fluid');
  var imgFluid = document.getElementById('img-fluid');
  fluid.style.color = "white";
  fluid.style.webkitTextStroke = "0.5px black";
  // imgFluid.style.display = "inline";
  imgFluid.style.height = Math.floor(windowHeight / grid_size) *grid_size + "px";
  imgFluid.classList.remove('hide');
  imgFluid.classList.add('show');
}

function onHoverMotion() {
  bgMode = 0;
  strokeMode = 255;
  document.getElementById('logo').src = '../../assets/img/small-light-logo.png';
  var fluid = document.getElementById('title-fluid');
  var motion = document.getElementById('title-motion');
  var imgMotion = document.getElementById('img-motion');
  var blocks = document.getElementsByClassName('block');
  fluid.style.color = "white";
  motion.style.color = "black";
  motion.style.webkitTextStroke = "0.5px white";
  imgMotion.style.width = ( grid_size * 9 ) + "px";
  imgMotion.classList.remove('hide');
  imgMotion.classList.add('show');
  for(var i = 0; i < blocks.length; i++) blocks[i].style.color = "white";
}

function onLeaveFluid() {
  bgMode = 255;
  strokeMode = 0;
  var fluid = document.getElementById('title-fluid');
  var motion = document.getElementById('title-motion');
  var imgFluid = document.getElementById('img-fluid');
  fluid.style.color = "black";
  motion.style.color = "black";
  fluid.style.webkitTextStrokeWidth = "0px";
  imgFluid.classList.remove('show');
  imgFluid.classList.add('hide');
}

function onLeaveMotion() {
  bgMode = 255;
  strokeMode = 0;
  document.getElementById('logo').src = '../../assets/img/small-dark-logo.png';
  var fluid = document.getElementById('title-fluid');
  var motion = document.getElementById('title-motion');
  var imgMotion = document.getElementById('img-motion');
  var blocks = document.getElementsByClassName('block');
  fluid.style.color = "black";
  motion.style.webkitTextStrokeWidth = "0px";
  imgMotion.classList.remove('show');
  imgMotion.classList.add('hide');
  for(var i = 0; i < blocks.length; i++) blocks[i].style.color = "black";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  grid_size = windowWidth / maxVerticalLines;
}
