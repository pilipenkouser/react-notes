'use strict';
 
const gulp         = require('gulp'),
	  buffer       = require('vinyl-buffer');
const sass         = require('gulp-sass');
const debug        = require('gulp-debug');
const del          = require('del');
const sourcemaps   = require('gulp-sourcemaps');
const cssnano      = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const newer        = require('gulp-newer');
const browserSync  = require('browser-sync').create();
const plumber      = require('gulp-plumber');
const notify       = require('gulp-notify');
const imagemin     = require('gulp-imagemin');
const uglify       = require('gulp-uglify');
const concat       = require('gulp-concat');
const pngquant     = require('imagemin-pngquant'),
	  svgSprite    = require('gulp-svg-sprite'),
	  gulpIf       = require('gulp-if'),
	  spritesmith  = require('gulp.spritesmith'),
	  uglifyjs     = require('gulp-uglifyjs'),  
  	  rigger       = require('gulp-rigger'),
	  // cleanCSS  = require('gulp-clean-css'),
	  // cache     = require('gulp-cache'),
	  webpackStream= require('webpack-stream'),
	  webpack      = webpackStream.webpack,
	  named        = require('vinyl-named');


// ****************************************
// ****************************************
//                WEBPACK
// *****************************************
gulp.task('webpack', function(){

	let options = {
		// entry: 'src/js/components/Main.js',
		output: {
			filename: 'bundle.js'
		},
		module: {
			loaders: [
				{
					test: /\.js[x]*$/,
					exclude: /node_modules/,
					loader: 'babel',
					query: {
						presets: ['es2015', 'react']
					}
				},
				{
					test: /\.css$/, loader: "style-loader!css-loader"
				}
			]
		}
	};

	return gulp.src('src/js/components/Main.js')  //'src/js/**/*.{js,jsx}'
	// return gulp/*.src(  )*/  //'src/js/**/*.{js,jsx}'
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'webpack',
					message: err.message
				};
			})
		}))
		// .pipe(named())
		.pipe(webpackStream(options))
		.pipe(uglifyjs())
		.pipe(gulp.dest('public/js'));

});


// ****************************************
// ****************************************
//                 CSS
// *****************************************
gulp.task('scss',  function () { // ['png:sprite', 'svg:sprite'],
	return gulp.src( 'src/style/main.scss' )//'tmp/style/**/*.scss',
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'style',
					message: err.message
				};
			})
		}))
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.scss'))
	    .pipe(sass({
	    	includePaths: require('node-reset-scss').includePath, // paste '@import "_reset.scss";' 
	    }))
	    .pipe(autoprefixer({
            browsers: ['last 15 versions', '> 1%', 'ie 9'],
            cascade: true
        }))
	    .pipe(cssnano())
	    .pipe(concat('main.min.css'))
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest('public/style'));
});

// ****************************************
// ****************************************
//              JS
// *****************************************
// gulp.task('js', function(){
// 	return gulp.src('src/js/**/*.js', {base: 'src'})
// 		.pipe(plumber({
// 			errorHandler: notify.onError(function(err){
// 				return {
// 					title: 'js',
// 					message: err.message
// 				};
// 			})
// 		}))
// 		.pipe(uglifyjs())
// 		.pipe(concat('main.min.js'))
// 		.pipe(gulp.dest('public/js'))
// });

// ****************************************
// *****************************************
//              HTML
// *****************************************
gulp.task('html', function () {
  gulp.src('src/html/*.html') 
  .pipe(rigger()) 
  .pipe(gulp.dest('public'))
});

// ****************************************
// ****************************************
//              JS LIBS
// *****************************************
gulp.task('libs:js', function(){
	return gulp.src([
			// 'src/libs/jquery-2.2.0.min/*.js', 
			// 'src/libs/jquery-ui-slider/jquery-ui.min.js',
		])
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest('public/js'));
});

// ****************************************
// ****************************************
//              CSS LIBS
// *****************************************
gulp.task('libs:css', function(){
	return gulp.src([
			'src/libs/jquery-ui-slider/jquery-ui.min.css',
		])
		.pipe(cssnano())
		.pipe(concat('vendor.min.css'))
		.pipe(gulp.dest('public/style'));
});

// ****************************************
// ****************************************
//              SPRITE SVG
// *****************************************
gulp.task('svg:sprite', function(){
	return gulp.src('src/assets/sprite/*.svg')
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'svg:sprite',
					message: err.message
				};
			})
		}))
		.pipe(svgSprite({
			mode: {
				css: {
					dest: '.',
					bust: false,
					sprite: 'sprite.svg',
					layout: 'vertical',
					// prefix: '%',
					dimensions: true,
					render: {
						scss: {
							dest: '_sprite.scss'
						}
					}
				}
			}
		}))
		.pipe(gulpIf('*.scss', gulp.dest('src/style'), gulp.dest('public/style')))
});
// *****************************************
//               SPRITE PNG
// *****************************************
gulp.task('png:sprite', function () {
    
    var spriteData = gulp.src('src/assets/sprite/*.png')
    	.pipe(plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'png2:sprite',
					message: err.message
				};
			})
		}))
        .pipe(spritesmith({
            imgName: 'png-sprite.png',
            cssName: '_png-sprite.scss',
            cssFormat: 'scss',
            padding: 2,
            cssVarMap: function (sprite) {
                sprite.name = 'png_icon-' + sprite.name;
            },
            imgPath: 'png-sprite.png',
        }));
    spriteData.img
    	.pipe(plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'png2:sprite',
					message: err.message
				};
			})
		}))
		.pipe(buffer())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public/style'));

    spriteData.css
        .pipe(gulp.dest('src/style'));

    return spriteData;
});

// ****************************************
// ****************************************
//              ASSETS
// *****************************************
gulp.task('assets', function(){
	return gulp.src('src/assets/img/*.{png,jpg}')
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'assets',
					message: err.message
				};
			})
		}))
		.pipe(newer('public/img'))
		.pipe(imagemin({
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [pngquant()]
            }
		))
		.pipe(gulp.dest('public/img'));
});

// ****************************************
// ****************************************
//              CLEAN
// *****************************************
gulp.task('clean', function(){
	return del(['public', 'tmp']);
});

// ****************************************
// ****************************************
//              FONTS
// *****************************************
gulp.task('fonts', function(){
	gulp.src('src/fonts/**/*') 
    .pipe(gulp.dest('public/style/fonts'));
});

// ****************************************
// ****************************************
//              BUILD
// *****************************************
gulp.task('build', ['svg:sprite', 'png:sprite', 'assets', 'html', 'fonts', /*'js',*/ 'webpack', 'libs:js', 'libs:css', 'scss']);


// ****************************************
// ****************************************
//              WATCH
// *****************************************
gulp.task('watch', function(){
	gulp.watch(['src/style/**/*.*', 'tmp/style/**/*.scss'], ['scss'] );
	gulp.watch('src/html/**/*.html', ['html'] );
	gulp.watch('src/assets/img/*.{png,jpg}', ['assets'] );
	gulp.watch('src/assets/sprite/*.svg', ['svg:sprite', 'scss'] );
	gulp.watch('src/assets/sprite/*.png', ['png:sprite', 'scss'] );
	gulp.watch('src/fonts/**', ['fonts'] );
	// gulp.watch('src/js/**', ['js'] );
	gulp.watch('src/js/**', ['webpack'] );
	gulp.watch('src/libs/**', ['libs:js', 'libs:css'] );
});

// ****************************************
// ****************************************
//              SERVER
// *****************************************
gulp.task('server', function(){
	browserSync.init({
		server: 'public'
	});

	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});


// ****************************************
// ****************************************
//              DEV
// *****************************************
gulp.task('dev', ['watch', 'server']);