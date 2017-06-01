var gulp = require("gulp");
var pug = require("gulp-pug");
var pugLinter = require('gulp-pug-linter')
var browserSync = require("browser-sync").create();
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minifycss    = require('gulp-minify-css');
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var babel = require('gulp-babel');
 



/****************************************************************************************************
*                                 Render Pug template
****************************************************************************************************/ 


gulp.task('pug', () => {
 return gulp.src('views/*.pug')
 .pipe(pug())
 .pipe(gulp.dest('./render/html/'));
});




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
  return "Linteando css y js.. :)";
});



/****************************************************************************************************
*                       Minis + BABEL :)
****************************************************************************************************/ 

gulp.task('babel', () => {
    return gulp.src('public/javascript/babel/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('public/javascript/'));
});




gulp.task('mini:css', function() {
  return gulp.src('src/public/css/*.css')
  .pipe(postcss([ autoprefixer() ]))
  .pipe(minifycss())
  .pipe(gulp.dest('./minified/css/'));
});



gulp.task('mini:js', function (cb) {
  pump([
        gulp.src('src/public/javascript/*.js'),
        uglify(),
        gulp.dest('src/minified/javascript')
    ],
    cb
  );
});


gulp.task('mini', ['mini:css','mini:js'],() => {
  return "Minificando css y js.. :)";
});


/****************************************************************************************************
*                       Not used but utils :)
****************************************************************************************************/ 

gulp.task('lint:pug', function () {
  return gulp
  .src('src/*.pug')
  .pipe(pugLinter())
  .pipe(pugLinter.reporter())
})



gulp.task('minify-css', function() {
  return gulp.src('src/public/styles/*.css')
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('dist'));
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
   'src/*.html'
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
