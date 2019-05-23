const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      less = require('gulp-less'),
      prefixer = require('gulp-autoprefixer'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat')


gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: './',
    },
    notify: false
  })
})

gulp.task('less', () => {
  gulp.src('./less/style.less')
    .pipe(less())
    .pipe(gulp.dest('./css'));
});

gulp.task('prefixer', () =>
  gulp.src('css/style.css')
    .pipe(prefixer({
      browsers: ['last 5 versions'],
      cascade: true,
      grid: true,
      remove: false
    }))
    .pipe(gulp.dest('./css'))
);

gulp.task('concat', () => {
  gulp.src('js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./js'))
});

gulp.task('babel', () => {
  gulp.src('js/main.js')
    .pipe(babel())
    .pipe(gulp.dest('./js'))
});



gulp.task('watch', ['server', 'less', 'prefixer'], () => {
  gulp.watch('./less/**/*.less', ['less']);
  gulp.watch('./css/style.css', ['prefixer']);
  gulp.watch('./css/style.css', browserSync.reload);
  gulp.watch('./js/*.js', browserSync.reload);
  gulp.watch('./*.html', browserSync.reload);
})