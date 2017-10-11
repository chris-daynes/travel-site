var gulp = require('gulp'),
watch = require('gulp-watch'),
browerSync = require('browser-sync').create();

gulp.task('watch', () => {
  
    //browserSync spins up a server and loads the 'app' html file localhost3000;
    browerSync.init({
      notify: false,
      server: {
        baseDir: 'app'
      }
    });
  
    //these watch files wait for new saved changes and then runs the named task
    watch('./app/index.html', () => {
      browerSync.reload()
      })
    
    watch('./app/assets/styles/**/*.css', () => {  
      gulp.start('cssInject')
    })
  });

  //this gulp task directly injects css into the webpage. It must complete the styles task prior though
// as evident by the second argument to the task function.
gulp.task('cssInject', ['styles'],() => {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browerSync.stream());
});