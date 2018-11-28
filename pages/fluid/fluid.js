var canvas;
var grid_size;
var maxVerticalLines;
var numHorizontalLines;
var bgMode;
var strokeMode;
var bgChanged;

// 0: small, 1: large
var responsiveMode;
var minWidth = 480;
var h = 1024;

// background gradient variables
var color, colorIndex;
var colorLimX, colorLimY;
var secondaryColors;

function setup() {
  if( windowWidth <= minWidth ) {
    responsiveMode = 0;
    maxVerticalLines = 5;
    numHorizontalLines = 27;
  } else {
    responsiveMode = 1;
    maxVerticalLines = 15;
    numHorizontalLines = 36;
  }
  grid_size = windowWidth / maxVerticalLines;
  h = grid_size * numHorizontalLines;
  canvas = createCanvas(windowWidth, h);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  $(function() {
    var $body = $(document);
    $body.bind('scroll', function() {
      // "Disable" the horizontal scroll.
      if ($body.scrollLeft() !== 0) {
        $body.scrollLeft(0);
      }
    });
  });
  $('.title-motion').bind('mouseover', onHoverMotion).bind('mouseout', onLeaveMotion);
  bgMode = 255;
  strokeMode = 0;
  bgChanged = false;
  secondaryColors = [color(119, 210, 175),
                      color(104, 140, 90),
                      color(167, 195, 140),
                      color(246, 231, 204),
                      color(220, 151, 137)];
  colorIndex = random(5);
  color = secondaryColors[int(colorIndex)];
  if(responsiveMode == 1) {
    colorLimX = windowWidth / grid_size / 2;
    colorLimY = windowHeight / grid_size / 2;
  } else if (responsiveMode == 0) {
    colorLimX = windowWidth / grid_size;
    colorLimY = windowHeight / grid_size;
  }
  strokeWeight(0.8);
  background(bgMode);
  stroke(strokeMode);
}

function draw() {
  background(bgMode);
  // stroke(strokeMode);

  // draw vertical lines
  for(var x = grid_size; x < windowWidth; x+=grid_size) {
    var dist = abs(x - mouseX) / grid_size;
    var alpha = dist / colorLimX * (-255) + 255;
    if(dist < colorLimX) stroke(red(color), green(color), blue(color), alpha);
    else stroke(200);
    if( responsiveMode == 1 ) {
      if (x > grid_size * 9 + 1 && x < grid_size * 14 - 1) {
        line(x, 0, x, grid_size);
        if(x > grid_size * 11 - 1 && x < grid_size * 14 - 1) line(x, 14.5 * grid_size, x, grid_size * 15);
        else line( x, 14 * grid_size, x, 15* grid_size);
        line(x, grid_size * 33, x, h);
      } else if (x >= grid_size && x <= grid_size * 3) {
        line(x, 0, x, h - grid_size);
      } else {
        line(x, 0, x, h);
      }
    }
    else if (responsiveMode == 0) {
      if(x == grid_size * 2) {
        line(x, 0, x, grid_size * 2);
        line(x, grid_size * 10.5, x, grid_size * 11);
        line(x, grid_size * 20, x, h - grid_size * 2);
      } else if (x == grid_size) {
        line(x, 0, x, h - grid_size * 2);
      } else if (x >= grid_size * 3 && x < windowWidth) {
        line(x, 0, x, grid_size * 2);
        line(x, grid_size * 10.5, x, grid_size * 11);
        line(x, grid_size * 20, x, h);
      } else {
        line(x, 0, x, h);
      }
    }
  }


  // draw horiziontal lines
  for(var y = grid_size; y < h; y+=grid_size) {
    if(responsiveMode == 1) {
      var dist = abs(y - mouseY) / grid_size;
      var alpha = dist / colorLimY * (-255) + 255;
      if(dist < colorLimY) stroke(red(color), green(color), blue(color), alpha);
      else stroke(200);
      if( (y > grid_size && y <= grid_size * 5) || (y >= grid_size * 19 + 1 && y <= grid_size * 21 - 1) || (y >= grid_size * 25 + 1 && y <= grid_size * 27 - 1) || (y >= grid_size * 31 + 1 && y <= grid_size * 33 - 1) ) {
        line(0, y, grid_size * 9, y);
        line(grid_size * 14, y, windowWidth, y);
      } else {
        line(0, y, windowWidth, y);
      }
    }
    else if (responsiveMode == 0) {
      if(y > grid_size * 2 && y <= grid_size * 7) {
        line(0, y, grid_size, y);
      } else if ( y > (h - grid_size) - 1) {
        line(grid_size * 3, y, windowWidth, y);
      } else {
        line(0, y, windowWidth, y);
      }
    }
  }
}

function onHoverMotion() {
  bgMode = 0;
  strokeMode = 255;
  $('.title-motion').css( {
                            'color': '#000',
                            '-webkit-text-stroke': ' #FFF 0.5px'
                          } );
  $('.text').css('color', '#FFF');
  $('.title-fluid').css('color', '#FFF');
  $('#large-logo').attr('src', '../../assets/img/large-light-logo.png');
  // $('.white-space').css('background-color', '#000');
}

function onLeaveMotion() {
  bgMode = 255;
  strokeMode = 0;
  $('.title-motion').css('-webkit-text-stroke', '0px');
  $('.text').css('color', '#000');
  $('.title-fluid').css('color', '#000');
  $('#large-logo').attr('src', '../../assets/img/large-dark-logo.png');
  // $('.white-space').css('background-color', '#FFF');
}

function windowResized() {
  if( windowWidth <= minWidth ) {
    responsiveMode = 0;
    maxVerticalLines = 5;
    numHorizontalLines = 27;
    colorLimX = windowWidth / grid_size;
    colorLimY = windowHeight / grid_size;
  } else {
    responsiveMode = 1;
    maxVerticalLines = 15;
    numHorizontalLines = 36;
    colorLimX = windowWidth / grid_size / 2;
    colorLimY = windowHeight / grid_size / 2;
  }
  grid_size = windowWidth / maxVerticalLines;
  h = grid_size * numHorizontalLines;
  colorLimY = windowHeight / grid_size / 2;
  resizeCanvas(windowWidth, h);
}
