var canvas;
var grid_size;
var maxVerticalLines;
var numHorizontalLines = 36;
var bgMode;
var strokeMode;
var bgChanged;

// 0: small, 1: large
var responsiveMode;
var minWidth = 480;
var h = 1024;

function setup() {
  if( windowWidth <= minWidth ) {
    responsiveMode = 0;
    maxVerticalLines = 5;
  } else {
    responsiveMode = 1;
    maxVerticalLines = 15;
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
  strokeWeight(0.5);
  background(bgMode);
  stroke(strokeMode);
}

function draw() {
  background(bgMode);
  stroke(strokeMode);
  for(var x = grid_size; x < windowWidth; x+=grid_size) {
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
    // else if (responsiveMode == 0) {
    //   if (x >= grid_size && x <= grid_size * 2) {
    //     var numHorizontalLines = Math.floor(h / grid_size);
    //     var blockTop = (numHorizontalLines - 1) * grid_size;
    //     line(x, 0, x, blockTop);
    //     line(x, blockTop + 2 * grid_size, x, h);
    //   } else {
    //     line(x, 0, x, h);
    //   }
    // }
  }
  for(var y = grid_size; y < h; y+=grid_size) {
    if(responsiveMode == 1) {
      if( (y > grid_size && y <= grid_size * 5) || (y >= grid_size * 19 + 1 && y <= grid_size * 21 - 1) || (y >= grid_size * 25 + 1 && y <= grid_size * 27 - 1) || (y >= grid_size * 31 + 1 && y <= grid_size * 33 - 1) ) {
        line(0, y, grid_size * 9, y);
        line(grid_size * 14, y, windowWidth, y);
      } else {
        line(0, y, windowWidth, y);
      }
    }
    // else if (responsiveMode == 0) {
    //   if( y >= h - grid_size ) {
    //     line(grid_size * 3 , y, windowWidth, y);
    //   } else {
    //     line(0, y, windowWidth, y);
    //   }
    // }
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
  } else {
    responsiveMode = 1;
    maxVerticalLines = 15;
  }
  grid_size = windowWidth / maxVerticalLines;
  h = grid_size * numHorizontalLines;
  resizeCanvas(windowWidth, h);
}
