var gulp = require("gulp");
var browserSync = require("browser-sync").create();


var postcss      = require('gulp-postcss');
var minifycss    = require('gulp-minify-css');
var autoprefixer = require('autoprefixer');
var uglify = require('gulp-uglify');
var pump = require('pump');


var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
 





/****************************************************************************************************
*                       Lints
****************************************************************************************************/ 


gulp.task('lint:js', function() {
  return gulp.src('src/public/javascript/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});



gulp.task('lint:css', function() {
  gulp.src('src/public/css/*.css')
  .pipe(csslint())
  .pipe(csslint.formatter());
});



gulp.task('lint', ['lint:css','lint:js'],() => {
  return "Lint css y js.. :)";
});



/****************************************************************************************************
*                       Minis 
****************************************************************************************************/ 


gulp.task('mini:css', function() {
  return gulp.src('src/public/css/*.css')
  .pipe(postcss([ autoprefixer() ]))
  .pipe(minifycss())
  .pipe(gulp.dest('src/minified/css/'));
});



gulp.task('mini:js', function (cb) {
  pump([
        gulp.src('src/public/javascript/*.js'),
        uglify(),
        gulp.dest('src/minified/javascript/')
    ],
    cb
  );
});


gulp.task('mini', ['mini:css','mini:js'],() => {
  return "Mini css y js.. :)";
});



/****************************************************************************************************
*                       Browserify para que recargue automático
****************************************************************************************************/ 

gulp.task('default',   () => {
 browserSync.init(null, {
    server: {
      baseDir: "./src/"
    },

   files: [
   'src/public/css/*.css',
   'src/public/javascript/*.js',
   'src/*.html',
   'src/public/scss/*.scss',
   'src/public/scss/partials/*scss'
   // './src/public/images/*.*',
   // 'views/*.pug',
   ],
   port: 8080,

   ui: {
     port: 8081
   },

   reloadDelay: 200
 });
});



/****************************************************************************************************
*                       Minis and Linters
****************************************************************************************************/ 


gulp.task('all', ['lint:css','lint:js','mini:css','mini:js'],() => {
  return "ALl in One";
});
