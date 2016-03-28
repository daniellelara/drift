var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var sass        = require('gulp-sass');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var replace     = require('gulp-replace');
var livereload  = require('gulp-livereload');

// Run jshint on js files to see if there are any errors
gulp.task('jshint', function(){
  return gulp.src('./src/js/**/*.js')
    .pipe(jshint());
});

// Convert scss files to expanded css files
gulp.task('sass:expanded', function(){
  return gulp.src('./src/scss/app.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('css'));
});

// Compress scss files to css files
gulp.task('sass:compressed', function(){
  return gulp.src('./src/scss/app.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('css'));
});

// Live reload task
gulp.task('default', function(){
  livereload.listen();
    gulp.watch(['./src/**/*', 'index.html'], ['jshint', 'sass:expanded', 'concat', 'uglify', 'replace:development', function(){
      livereload.reload('index.html')
    }]);
});

// Concatenate js files into one js file
gulp.task('concat', function(){
  return gulp.src(['./src/js/app.js', './src/js/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('js'));
});

// Minify js files that we've concatenated
gulp.task('uglify', function(){
  return gulp.src('./js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});

// Replace the links and script tags in index.html depending on whether you want minified files or not -
// in this case we're in dev so we don't want minified files
gulp.task('replace:development', function(){
  return gulp.src('./index.html')
    .pipe(replace(/app\.min\.js/, 'app.js'))
    .pipe(replace(/app\.min\.css/, 'app.css'))
    .pipe(gulp.dest('./'))
});

gulp.task('replace:production', function(){
  return gulp.src('./index.html')
    .pipe(replace(/app\.js/, 'app.min.js'))
    .pipe(replace(/app\.css/, 'app.min.css'))
    .pipe(gulp.dest('./'))
});

gulp.task('build', ['sass:compressed', 'concat', 'uglify', 'replace:development']);
