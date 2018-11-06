var logo = $( '#logo' );
var title = $( '.title' );
var block = $( '.block' );
var paragraph = $( '.paragraph' );
var top3 = $( '.top-3' );
var top4 = $( '.top-4' );
var bottom1 = $( '.bottom-1' );
var titleMotion = $('#title-motion');
var titleFluid = $('#title-fluid');
var arrow = $('#arrow');

// init();
window.addEventListener( 'load', onResize);
window.addEventListener( 'resize' , onResize);

function init() {
  windowWidth = $(' window ').width();
  if( windowWidth <= minWidth ) {
    var grid_size = windowWidth / maxVerticalLines;
    titleMotion.removeClass(' left-2 ').addClass(' left-1 ');
    arrow.removeClass(' hide ').addClass(' show ').css();
  }
}

function onResize () {
  // small size
  if( windowWidth <= minWidth ) {
    var grid_size = windowWidth / maxVerticalLines;
    titleMotion.removeClass(' left-2 ').addClass(' left-1 ');
    logo.css('height', grid_size + 'px');
    title.css('font-size', (windowWidth / 375 * 90 / 115) + 'rem');
    block.css('width', (grid_size * 3) + 'px');
    block.css('height', (grid_size * 0.98) + 'px');
    // paragraph.css('font-size', (windowWidth / 1440 * 14) + 'px');
    top3.css('top', (grid_size * 2 + Math.abs(grid_size - windowWidth / 375 * 90 + 5)) + 'px');
    top4.css('top', (grid_size * 3 + Math.abs(grid_size - windowWidth / 375 * 90 + 5)) + 'px');
    bottom1.css('bottom', (windowHeight % grid_size) + 'px');
    arrow.removeClass(' hide ').addClass(' show ').css({  'top': grid_size * (Math.floor(windowHeight / grid_size) - 0.5) - 20 + 'px',
                                                          'left': 3.5 * grid_size - 15 + 'px'
                                                      });
  } else {
  // large size
    var grid_size = windowWidth / maxVerticalLines;
    titleMotion.removeClass(' left-1 ').addClass(' left-2 ');
    logo.css('height', grid_size + 'px');
    title.css('font-size', (windowWidth / 1440) + 'rem');
    block.css('width', (grid_size * 4) + 'px');
    block.css('height', (grid_size * 0.98) + 'px');
    // resizing copyrights font size dynamically
    paragraph.css('font-size', (windowWidth / 1440 * 14) + 'px');
    top3.css('top', (grid_size * 2 + Math.abs(grid_size - windowWidth / 1440 * 115 + 5)) + 'px');
    top4.css('top', (grid_size * 3 + Math.abs(grid_size - windowWidth / 1440 * 115 + 5)) + 'px');
    bottom1.css('bottom', windowHeight % grid_size + 'px');
    arrow.removeClass(' show ').addClass(' hide ');
  }
}
