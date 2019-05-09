// Background variables
var canvas;
var grid_size;
var maxVerticalLines;
var numHorizontalLines;
var bgMode;
var strokeMode;
var responsiveMode; // 0: small, 1: large
var mobileWidth = 600; // mobile size
var h = 1024;
var mouseMoveTimeout;

$(window).load(function() {
  $('#hide-all').css('display', 'block');
});

function setup()
{
  resize();
  canvas = createCanvas(windowWidth+2, h+20);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  $(function() {
    var $body = $(document);
    $body.bind('scroll', function() {
      var dividerTop = $('#divider').offset().top;
      if($(document).scrollTop() > dividerTop + grid_size) {
        $('.home-btn').css('position', 'fixed');
      } else {
        $('.home-btn').css('position', 'relative');
      }

      if ($body.scrollLeft() !== 0) {
        $body.scrollLeft(0);
      }
    });
    if(isMobile()) {
      if(responsiveMode == 0) {
        $('#down-arrow').css('display', 'block');
      }
      $('.title-fluid').bind('click', function(e) {
        e.preventDefault();
        setTimeout(function(){
          window.location = './pages/fluid/index.html';
          onLeaveFluid();
          $body.scrollTop(0);
        }, 50);
        onHoverFluid();
      });
      $('.title-motion').bind('click', function(e) {
        e.preventDefault();
        setTimeout(function(){
          window.location = './pages/motion/index.html';
          onLeaveMotion();
          $body.scrollTop(0);
        }, 50);
        onHoverMotion();
      });
    } else {
      $('.title-motion').bind('mouseover', onHoverMotion).bind('mouseout', onLeaveMotion);
      $('.title-fluid').bind('mouseover', onHoverFluid).bind('mouseout', onLeaveFluid);
    }
  });

  $('div.home').bind('click', scrollToAbout);
  $('.home-btn').bind('click', scrollToHome);
  bgMode = 255;
  strokeMode = 0;
  strokeWeight(0.5);
  background(bgMode);
  stroke(strokeMode);
}

function draw()
{
  background(bgMode);
  stroke(strokeMode);
  var dividerTop = $('#divider').offset().top;

  // draw vertical lines
  for(var x = grid_size; x < windowWidth-1; x+=grid_size) {
    if( responsiveMode == 1 ) {
      if (x >= grid_size && x < grid_size * 3) {
        line(x, 0, x, (Math.floor(windowHeight / grid_size) - 1) * grid_size);
        line(x, Math.floor(windowHeight / grid_size) * grid_size, x, (numHorizontalLines-1)* grid_size);
        line(x, numHorizontalLines * grid_size, x, h);
      } else if (x == grid_size * 3){
        line(x, 0, x, (Math.floor(windowHeight / grid_size) - 1) * grid_size);
        line(x, Math.floor(windowHeight / grid_size) * grid_size, x, dividerTop + grid_size * 8);
        line(x, dividerTop + grid_size * 13, x, (numHorizontalLines-1)*grid_size);
        line(x, numHorizontalLines * grid_size, x, h);
      } else if(x >= grid_size * 4 && x <= grid_size * 7 - 1) {
        line(x, 0, x, dividerTop + grid_size * 8);
        line(x, dividerTop + grid_size * 13, x, h+20);
      } else if( x > grid_size * 9 + 1 && x <= grid_size * 13 + 1 ){
        line(x, 0, x, dividerTop + grid_size * 2);
        line(x, dividerTop + grid_size * 7, x, dividerTop + grid_size * 8);
        if(x > grid_size * 13 - 1) line(x, dividerTop + grid_size * 19, x, h+20);
        else line(x, dividerTop + grid_size * 19.5, x, h+20);
      } else {
        line(x, 0, x, h+20);
      }
    } else if ( responsiveMode == 0 ) {
      if( x == grid_size * 1) {
        line(x, 0, x, (Math.floor(windowHeight / grid_size) - 1) * grid_size);
        line(x, (Math.floor(windowHeight / grid_size) + 1) * grid_size, x, (numHorizontalLines - 2) * grid_size);
      } else if ( x == grid_size * 2 ) {
        line(x, 0, x, (Math.floor(windowHeight / grid_size) - 1) * grid_size);
        line(x, (Math.floor(windowHeight / grid_size) + 1) * grid_size, x, dividerTop + grid_size * 3);
        line(x, dividerTop + grid_size * 8, x, dividerTop + grid_size * 9);
        line(x, dividerTop + grid_size * 14, x, dividerTop + grid_size * 15);
        line(x, dividerTop + grid_size * 23, x, (numHorizontalLines - 2) * grid_size);
      } else if ( x >= grid_size * 3 && x < windowWidth ) {
        line(x, 0, x, dividerTop + grid_size * 3);
        line(x, dividerTop + grid_size * 8, x, dividerTop + grid_size * 9);
        line(x, dividerTop + grid_size * 14, x, dividerTop + grid_size * 15);
        line(x, dividerTop + grid_size * 23, x, h);
      } else {
        line(x, 0, x, h);
      }
    }
  }

  // draw horizontal lines
  for(var y = grid_size; y < h-1; y+=grid_size) {
    if(responsiveMode == 1) {
      if(y > dividerTop + grid_size * 2 + 1 && y < dividerTop + grid_size * 7 - 1) {
        line(0, y, grid_size * 9, y);
        line(grid_size * 14, y, grid_size * 15, y);
      } else if (y > dividerTop + grid_size * 8 + 1 && y < dividerTop + grid_size * 13) {
        line(0, y, grid_size * 2, y);
        line(grid_size * 7, y, grid_size * 9, y);
        line(grid_size * 14, y, grid_size * 15, y);
      } else {
        line(0, y, windowWidth, y);
      }
    } else if (responsiveMode == 0 ) {
      if( (y > Math.floor(windowHeight / grid_size) * grid_size - 1 && y < (Math.floor(windowHeight / grid_size) + 1) * grid_size - 1) ||
          (y > (numHorizontalLines - 2) * grid_size + 1))
      {
        line(grid_size * 3, y, windowWidth, y);
      } else if ( (y >= dividerTop + grid_size * 4 && y < dividerTop + grid_size * 8 ) ||
                  (y >= dividerTop + grid_size * 10 && y < dividerTop + grid_size * 14) ||
                  (y >= dividerTop + grid_size * 16 && y < dividerTop + grid_size * 20)
                )
      {
        line(0, y, grid_size, y);
      } else {
        line(0, y, windowWidth, y);
      }
    }
  }

}

function onHoverFluid() {
  bgMode = 255;
  strokeMode = 0;
  $('#img-fluid').removeClass('hide').addClass('show').css('opacity', '1');
  loop();
}

function onLeaveFluid() {
  bgMode = 255;
  strokeMode = 0;
  $('#img-fluid').removeClass('show').addClass('hide').css('opacity', '0');
  noLoop();
}

function onHoverMotion() {
  bgMode = 49;
  strokeMode = 255;
  $('body').removeClass('lightmode').addClass('darkmode');
  $('#img-motion').removeClass('hide').addClass('show').css('opacity', '1');
  loop();
}

function onLeaveMotion() {
  bgMode = 255;
  strokeMode = 0;
  $('body').removeClass('darkmode').addClass('lightmode');
  $('#img-motion').removeClass('show').addClass('hide').css('opacity', '0');
  noLoop();
}

function scrollToHome () {
  $('html, body').animate( {scrollTop: 0}, 1800, 'easeInOutCubic', null);
}

function scrollToAbout () {
  $('html, body').animate({scrollTop: $('#divider').offset().top + grid_size + 5 }, 1800, 'easeInOutCubic', null);
}

function mouseMoved() {
  loop();
  clearTimeout(mouseMoveTimeout);
  mouseMoveTimeout = setTimeout( () => {noLoop();}, 500);
}

function resize() {

  if( windowWidth <= mobileWidth ) {
    responsiveMode = 0;
    maxVerticalLines = 5;
  } else {
    responsiveMode = 1;
    maxVerticalLines = 15;
  }

  grid_size = windowWidth / maxVerticalLines;

  if(responsiveMode == 1 ) {
    numHorizontalLines = 24 + Math.floor(windowHeight / grid_size);
  } else if (responsiveMode == 0) {
    numHorizontalLines = 32 + Math.floor(windowHeight / grid_size);
  }

  h = grid_size * numHorizontalLines;

  if(responsiveMode == 0) {
    $('#img-fluid').css('top', '100vw');
    $('#space-between-title-and-copyright').removeClass( function (index, className) {
      return (className.match (/(^|\s)space-sm-\S+/g) || []).join(' ');
    }).addClass('space-sm-' + (Math.floor(windowHeight / grid_size) - 5));
  } else {
    $('#img-fluid').css('top', -(windowHeight - Math.floor(windowHeight / grid_size) * grid_size) +'px');
    $('#space-between-title-and-copyright').removeClass( function (index, className) {
      return (className.match (/(^|\s)space-\S+/g) || []).join(' ');
    }).addClass('space-' + (Math.floor(windowHeight / grid_size) - 5));
  }
}

function windowResized() {
  resize();
  resizeCanvas(windowWidth+2, h+20);

  if(isMobile()) {
    if(responsiveMode == 0) $('#down-arrow').css('top', ( $('#space-between-title-and-copyright').offset().top + grid_size * (Math.floor(windowHeight / grid_size) - 5) + 20 ) + 'px');
  }
}

function isMobile() {
    var md = new MobileDetect(window.navigator.userAgent);
    if(md.mobile()){
        return true;
    }else{
        return false;
    }
}
