var gulp        	= require('gulp'),
    babelify        = require('babelify'),
    browserify  	= require('browserify'),
    sass        	= require('gulp-sass'),
    autoprefixer 	= require('gulp-autoprefixer'),
    minifyCSS		= require('gulp-minify-css'),
    uglify          = require('gulp-uglify'),
    reactify        = require('reactify'),
    source          = require('vinyl-source-stream'),
    streamify       = require('gulp-streamify'),
    fs              = require('fs');

var pages = [
    {
        "location": "./src/mocks_create.js",
        "filename": "mocks_create.js"
    },
    {
        "location": "./src/mocks_edit.js",
        "filename": "mocks_edit.js"
    },
    {
        "location": "./src/mocks.js",
        "filename": "mocks.js"
    }
];

var config = {
    vendor_location: './src/vendor.js',
    vendor_dest: './public/js',
    sass_location: './src/scss/**/*.scss',
    sass_dest: './public/css',
    bundle_location: './src/bundle.js',
    jsx_location: './src/jsx/**/*.jsx',
    js_dest: './public/js'
};

gulp.task('vendor', function() {
    var bundler = browserify({
        entries: [config.vendor_location],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    var bundle = bundler.bundle();
    bundle.pipe(source('vendor.js'))
    //.pipe(streamify(uglify()))
    .pipe(gulp.dest(config.vendor_dest));
});

gulp.task('react', function() {
    var i;
    for (i = 0; i < pages.length; i++) {
        var bundler = browserify({
            entries: pages[i].location,
            transform: [reactify, 'browserify-shim'],
            debug: true,
            cache: {},
            packageCache: {},
            fullPaths: true
        });

        var bundle = bundler.bundle();
        bundle.pipe(source(pages[i].filename))
        //.pipe(streamify(uglify()))
        .pipe(gulp.dest(config.js_dest));
    }
});

//Preprocess .scss SASS files
gulp.task('sass', function() {
    gulp.src(config.sass_location)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(config.sass_dest));
});

gulp.task('watch', ['react', 'sass'], function() {
    console.log('Now watching for react changes');
    gulp.watch(config.jsx_location, ['react']);
    gulp.watch(config.js_location, ['react']);
    console.log('Now watching for scss changes');
    gulp.watch(config.sass_location, ['sass']);
});
