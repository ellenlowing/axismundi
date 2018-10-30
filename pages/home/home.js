var logo = $( '#logo' );
var title = $( '.title' );
var block = $( '.block' );
var paragraph = $( '.paragraph' );
var top3 = $( '.top-3' );
var top4 = $( '.top-4' );
var bottom1 = $( '.bottom-1' );
// var top8 = $( '.top-8' );

window.addEventListener( 'load', onResize);
window.addEventListener( 'resize' , onResize);
// $('#fluid').bind('mouseover', onHoverFluid);
// $('#motion').bind('mouseover', onHoverMotion);
// $('#fluid').bind('mouseout', onLeaveFluid);
// $('#motion').bind('mouseout', onLeaveMotion);

function onResize () {
  var grid_size = windowWidth / 15;
  logo.css('height', grid_size + 'px');
  title.css('font-size', (windowWidth / 1440) + 'rem');
  block.css('width', (grid_size * 4) + 'px');
  block.css('height', (grid_size * 0.98) + 'px');
  // resizing copyrights font size dynamically
  paragraph.css('font-size', (windowWidth / 1440 * 14) + 'px');
  top3.css('top', (grid_size * 2 + Math.abs(grid_size - windowWidth / 1440 * 115 + 5)) + 'px');
  top4.css('top', (grid_size * 3 + Math.abs(grid_size - windowWidth / 1440 * 115 + 5)) + 'px');
  bottom1.css('bottom', (windowHeight % grid_size) + 'px');
}

// function onHoverFluid() {
//
// }
//
// function onHoverMotion() {
//   logo.attr('src', '../../assets/img/small-light-logo.png');
// }
//
// function onLeaveFluid() {
//
// }
//
// function onLeaveMotion() {
//   logo.attr('src', '../../assets/img/small-dark-logo.png');
// }
