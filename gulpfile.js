const gulp = require('gulp');
// const sass = require('gulp-sass');
// sass.compiler = require('node-sass');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const merge = require('merge-stream');

// gulp.task('sass', function() {
//   return gulp.src('assets/scss/styles.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('assets/css'))
// });

gulp.task('minify', function() {
  const motion = gulp.src('pages/motion/motion.js')
    .pipe(uglify())
    .pipe(rename( (path) => {
        path.basename += '.min';
    }))
    .pipe(gulp.dest('pages/motion'));

  const fluid = gulp.src('pages/fluid/fluid.js')
    .pipe(uglify())
    .pipe(rename( (path) => {
        path.basename += '.min';
    }))
    .pipe(gulp.dest('pages/fluid'));

  const home = gulp.src('./home.js')
    .pipe(uglify())
    .pipe(rename( (path) => {
        path.basename += '.min';
    }))
    .pipe(gulp.dest('./'));

  const css = gulp.src('assets/css/style.css')
    .pipe(cssnano())
    .pipe(rename( (path) => {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('assets/css'));

  let streams = merge(motion, fluid);
  streams.add(home);
  streams.add(css);
  return streams;
});

// gulp.task('default', gulp.series('sass', 'minify'));
