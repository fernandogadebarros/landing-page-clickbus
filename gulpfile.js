const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const spritesvg = require('gulp-svg-sprite');

function sSass() {  
  return gulp.src([
    'src/css/scss/**/*.scss',
    'node_modules/bootstrap/scss/*.scss'
  ])
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoprefixer({cascade: false}))
  .pipe(gulp.dest('src/css/'))
  .pipe(browserSync.stream());
}

function minifyJS() {
  return gulp.src('src/js/*.js')
  .pipe(concat('script.min.js'))
  .pipe(babel({presets: ['@babel/env']}))
  .pipe(uglify())
  .pipe(gulp.dest('src/js/min/'))
  .pipe(browserSync.stream());
}

function pluginsJS() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'src/js/plugins/ext/*.js'
  ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('src/js/plugins/int'))
    .pipe(browserSync.stream());
}

function Sync() {
  browserSync.init({
    server: { baseDir: './' }
  });
}

function watch() {
  gulp.watch('src/css/scss/**/*.scss', sSass);
  gulp.watch('src/js/*.js', minifyJS);
  gulp.watch('src/js/plugins/*.js', pluginsJS);
  gulp.watch(['*.html']).on('change', browserSync.reload);
}

gulp.task('sprite', function(){
  return gulp.src('src/icon/**/*.svg')
  .pipe(spritesvg({
    mode: {
      symbol: {
        dest: 'sprite',
        sprite: 'sprite.svg',
        example: true
      }
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false
    }
  }))
  .pipe(gulp.dest('.'))
});

exports.sass = sSass;
exports.minJS = minifyJS;
exports.pluginsJS = pluginsJS;
exports.browsersync = Sync;
exports.watch = watch;
exports.default = gulp.parallel(watch, Sync, pluginsJS, minifyJS, sSass);
