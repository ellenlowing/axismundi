var canvas;
var grid_size;
var maxVerticalLines;
var numHorizontalLines;
var bgMode;
var strokeMode;
var vidPlaying = false;
var mouseMoveTimeout;

// 0: small, 1: large
var responsiveMode;
var minWidth = 600;
var h = 1024;

// background gradient variables
var color, colorIndex;
var colorLimY;
var secondaryColors;

$(window).load(function() {
  $('#hide-all').css('display', 'block');
});

function setup() {

  resize();
  canvas = createCanvas(windowWidth+2, h+20);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');

  // var gifs = $('.gif');
  // gifs.each(function(index) {
  //   $(this).attr('src', $(this).attr('data-src'));
  // });

  $(function() {
    var $body = $(document);
    $body.bind('scroll', function() {
      var gifs = document.getElementsByClassName('gif');
      for(var i = 0; i < gifs.length; i++) {
        var gif = gifs[i];
        var bb = gif.getBoundingClientRect();
        if(bb.top+bb.height >= 0 && bb.bottom-bb.height <= (window.innerHeight || document.documentElement.clientHeight))
        {
          if(gif.paused) {
            if(gif.readyState != 4) gif.load();
            gif.play();
          }
        } else {
          if(!gif.paused) {
            gif.pause();
          }
        }
      }
      if ($body.scrollLeft() !== 0) {
        $body.scrollLeft(0);
      }
      // if(isMobile()) {
      //   loop();
      //   clearTimeout(mouseMoveTimeout);
      //   mouseMoveTimeout = setTimeout( () => {noLoop();}, 1000);
      // }
    });
  });

  $('.title-motion').bind('mouseover', onHoverMotion).bind('mouseout', onLeaveMotion);

  // handles start and end of video
  var vid = document.getElementById('vid');
  vid.addEventListener('playing', function() {
    $('#play-btn').css('visibility', 'hidden');
    vidPlaying = true;
  });
  vid.addEventListener('ended', function() {
    $('#vid-placeholder').css('z-index', '2');
    $('#play-btn').css('visibility', 'visible');
  });
  if(isMobile()) {
    vid.addEventListener('pause', function() {
      $('#pause-btn').css('visibility', 'hidden');
      $('#play-btn').css('visibility', 'visible');
      vidPlaying = false;
    });
    $('#vid-wrapper').click(function() {
      if(vidPlaying) {
        vid.pause();
      } else {
        if(vid.readyState != 4) vid.load();
        vid.play();
        $('#vid-placeholder').css('z-index', '-1');
      }
    });
  } else {
    vid.addEventListener('pause', function() {
      $('#pause-btn').css('visibility', 'hidden');
      vidPlaying = false;
    });
    $('#play-btn').click(function() {
      if(vid.readyState != 4) vid.load();
      vid.play();
      $('#vid-placeholder').css('z-index', '-1');
    });
    $('#pause-btn').click(function() {
      vid.pause();
    });
    $('#vid-wrapper').bind('mouseover', () => {
      if(vidPlaying) {
        $('#pause-btn').css('visibility', 'visible');
      } else {
        $('#play-btn').css('visibility', 'visible');
      }
    });
    $('#vid-wrapper').bind('mouseout', () => {
      $('#pause-btn').css('visibility', 'hidden');
      $('#play-btn').css('visibility', 'hidden');
    });
  }

  bgMode = 255;
  strokeMode = 0;
  secondaryColors = [color(119, 210, 175),
                      color(104, 140, 90),
                      color(167, 195, 140),
                      color(246, 231, 204),
                      color(220, 151, 137)];
  colorIndex = random(5);
  color = secondaryColors[int(colorIndex)];
  strokeWeight(0.8);
  background(bgMode);
  stroke(strokeMode);
  noLoop();
}

function draw() {
  background(bgMode);

  // draw vertical lines
  for(var x = grid_size; x < windowWidth; x+=grid_size) {
    var dist = abs(x - mouseX) / grid_size;
    var alpha = dist / colorLimY * (-255) + 255;
    if(dist < colorLimY - 1) stroke(red(color), green(color), blue(color), alpha);
    else stroke(200);
    if( responsiveMode == 1 ) {
      if (x > grid_size * 9 + 1 && x < grid_size * 14 - 1) {
        line(x, 0, x, grid_size);
        line( x, 14 * grid_size, x, 15* grid_size);
        line(x, grid_size * 33, x, h+20);
      } else if (x >= grid_size && x <= grid_size * 3) {
        line(x, 0, x, h - grid_size);
      } else {
        line(x, 0, x, h+20);
      }
    }
    else if (responsiveMode == 0) {
      if(x == grid_size * 2) {
        line(x, 0, x, grid_size * 2);
        line(x, grid_size * 10, x, grid_size * 11);
        line(x, grid_size * 20, x, h - grid_size * 2);
      } else if (x == grid_size) {
        line(x, 0, x, h - grid_size * 2);
      } else if (x >= grid_size * 3 && x < windowWidth+20) {
        line(x, 0, x, grid_size * 2);
        line(x, grid_size * 10, x, grid_size * 11);
        line(x, grid_size * 20, x, h+20);
      } else {
        line(x, 0, x, h+20);
      }
    }
  }

  // draw horiziontal lines
  for(var y = grid_size; y < h-1; y+=grid_size) {
    if(responsiveMode == 1) {
      var dist = abs(y - mouseY) / grid_size;
      var alpha = dist / colorLimY * (-255) + 255;
      if(dist < colorLimY - 1) stroke(red(color), green(color), blue(color), alpha);
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
  bgMode = 49;
  strokeMode = 255;
  $('body').removeClass('lightmode').addClass('darkmode');
  loop();
}

function onLeaveMotion() {
  bgMode = 255;
  strokeMode = 0;
  $('body').removeClass('darkmode').addClass('lightmode');
  noLoop();
}

function mouseMoved() {
  loop();
  clearTimeout(mouseMoveTimeout);
  mouseMoveTimeout = setTimeout( () => {noLoop();}, 1000);
}

function resize () {
  if( windowWidth <= minWidth ) {
    responsiveMode = 0;
    maxVerticalLines = 5;
    numHorizontalLines = 27;
    colorLimY = windowHeight / grid_size;
  } else {
    responsiveMode = 1;
    maxVerticalLines = 15;
    numHorizontalLines = 36;
    colorLimY = windowHeight / grid_size / 2;
  }
  grid_size = windowWidth / maxVerticalLines;
  h = grid_size * numHorizontalLines;
  colorLimY = windowHeight / grid_size / 2;
}

function windowResized() {
  resize();
  resizeCanvas(windowWidth+2, h+20);
}

function isMobile() {
    var md = new MobileDetect(window.navigator.userAgent);
    if(md.mobile()){
        return true;
    }else{
        return false;
    }
}
