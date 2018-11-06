var canvas;
var grid_size;
var maxVerticalLines;
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
  h = grid_size * 36;
  canvas = createCanvas(windowWidth, h);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  $('.title-fluid').bind('mouseover', onHoverFluid).bind('mouseout', onLeaveFluid);
  bgMode = 0;
  strokeMode = 255;
  bgChanged = false;
  strokeWeight(0.5);
  background(bgMode);
  stroke(strokeMode);
  resizeElements();
}

function draw() {
  background(bgMode);
  stroke(strokeMode);
  for(var x = grid_size; x < windowWidth; x+=grid_size) {
    if( responsiveMode == 1 ) {
      // if (x >= grid_size && x <= grid_size * 3) {
      //   var numHorizontalLines = Math.floor(h / grid_size);
      //   var blockTop = (numHorizontalLines - 1) * grid_size;
      //   line(x, 0, x, blockTop);
      //   line(x, blockTop + grid_size, x, h);
      // } else
      if (x > grid_size * 9 && x < grid_size * 14) {
        var blockTop = grid_size;
        line(x, 0, x, blockTop);
        line(x, blockTop + 5 * grid_size, x, h);
      } else {
        line(x, 0, x, h);
      }
    }
    else if (responsiveMode == 0) {
      if (x >= grid_size && x <= grid_size * 2) {
        var numHorizontalLines = Math.floor(h / grid_size);
        var blockTop = (numHorizontalLines - 1) * grid_size;
        line(x, 0, x, blockTop);
        line(x, blockTop + 2 * grid_size, x, h);
      } else {
        line(x, 0, x, h);
      }
    }
  }
  for(var y = grid_size; y < h; y+=grid_size) {
    if(responsiveMode == 1) {
      if( y > grid_size && y <= grid_size * 5) {
        line(0, y, grid_size * 9, y);
        line(grid_size * 14, y, windowWidth, y);
      } else {
        line(0, y, windowWidth, y);
      }
    } else if (responsiveMode == 0) {
      if( y >= h - grid_size ) {
        line(grid_size * 3 , y, windowWidth, y);
      } else {
        line(0, y, windowWidth, y);
      }
    }
  }
}

function onHoverFluid() {
  bgMode = 255;
  strokeMode = 0;
  $('.title-fluid').css( {
                            'color': '#FFF',
                            '-webkit-text-stroke': ' #000 0.5px'
                          } );
  $('.text').css('color', "#000");
  $('#logo').attr('src', '../../assets/img/large-dark-logo.png');
  $('.white-space').css('background-color', '#FFF');
}

function onLeaveFluid() {
  bgMode = 0;
  strokeMode = 255;
  $('.title-fluid').css('-webkit-text-stroke', '0px');
  $('.text').css('color', "#FFF");
  $('#logo').attr('src', '../../assets/img/large-light-logo.png');
  $('.white-space').css('background-color', '#000');
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
  h = grid_size * 36;
  resizeCanvas(windowWidth, h);
  // resizeElements();
}

function resizeElements() {
  // $('.title').css({
  //                   'font-size': (windowWidth / 1440) + 'rem',
  //                   'letter-spacing': '-1.62px'
  //                 });
  // $('#description').css({
  //                    'width': grid_size * 5 + 'px',
  //                    'height': grid_size * 5 + 'px'
  //                 });
  // $('.top-2').css('top', (grid_size + Math.abs(grid_size - windowWidth / 1440 * 115 + 5)) + 'px');
  // $('.paragraph').css('font-size', (windowWidth / 1440 * 20) + 'px');
  // $('.bottom1').css('bottom', h + 'px');
  // $('#copyrights').css({
  //                    'width': grid_size * 4 + 'px',
  //                    'height': grid_size * 0.98 + 'px'
  //                 });
}
