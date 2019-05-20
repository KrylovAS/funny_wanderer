'use strict'
const gulp     = require('gulp'),
sass           = require('gulp-sass'),
browserSync    = require('browser-sync'),
imagemin       = require('gulp-imagemin'),
pngquant       = require('imagemin-pngquant'),
mozjpeg        = require('imagemin-mozjpeg'),
cache          = require('gulp-cache'),
notify         = require('gulp-notify'),
autoprefixer   = require('gulp-autoprefixer'),
svgstore       = require('gulp-svgstore'),
rename         = require('gulp-rename'),
include        = require('posthtml-include'),
svgmin         = require('gulp-svgmin'),
cheerio        = require('gulp-cheerio'),
replace        = require('gulp-replace'),
posthtml       = require('gulp-posthtml');


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,		
	});
});


gulp.task('sass', function(){ // Создаем таск Sass
  return gulp.src(['app/scss/**/*.sass', 'app/scss/**/*.scss'])
	    .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
      .pipe(autoprefixer(['last 3 versions'], { cascade: true })) // Создаем префиксы
      .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
      .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});
//минификация изображений
gulp.task('imagemin', function() {
  return gulp.src('app/img/*')
  .pipe(cache(imagemin([
      pngquant(
          {quality: '65-70', speed: 5}
      ),
      mozjpeg({
          interlaced: true,
          progressive: true
      })
  ],{
      verbose: true
  })))
  .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['sass', 'browser-sync', 'imagemin'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
//	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/img/*', ['imagemin']);
});

//собираем svg sprite
gulp.task('sprite', function() {
  return gulp.src('app/img/svg/*.svg')  
  .pipe(svgmin({
    js2svg: {
      pretty: true
    }
  }))  
  .pipe(cheerio({
    run: function ($) {      
      $('[fill]').removeAttr('fill');      
      $('[stroke]').removeAttr('stroke');      
      $('[style]').removeAttr('style');
    },
    parserOptions: {xmlMode: true}
  }))  
  .pipe(replace('&gt;', '>'))
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('app/img/svg'))
});

//вставляем инлайном svg sprite
//<div style="display:none">
//  <include src="app/img/svg/sprite.svg"></include>
//</div> 
//<svg class="banner__icon">
//  <use href="#icon-vk"></use>
//</svg>
gulp.task("html", () => {
  return gulp.src("app/*.html")
    .pipe(posthtml([
      include()
    ]))
    
    .pipe(gulp.dest("app"))
    
});

