// Loading modules
const gulp            = require('gulp'),
      webpack         = require('webpack'),
      webpack_stream = require('webpack-stream'),
      webpack_config = require('./webpack.config.babel.js'),
      autoprefixer    = require('gulp-autoprefixer'),
      browserSync     = require('browser-sync').create(),
      csslint         = require('gulp-csslint'),
      header          = require('gulp-header'),
      jshint          = require('gulp-jshint'),
      pkg             = require('./package.json'),
      sass            = require('gulp-sass'),
      sourcemaps      = require('gulp-sourcemaps'),
      uglify          = require('gulp-uglify');

// App config
var themeDir = 'themes/intercity/',
    
    app = {

        path: {
            theme       : themeDir,
            srcDir      : themeDir + 'src',
            cssDir      : themeDir + 'css',
            jsDir       : themeDir + 'js',
            jsSrcDir    : themeDir + 'src/js',
            jsApp       : themeDir + 'src/js/app.js',
            
            sassFiles   : [
                themeDir + 'src/sass/**/*.scss'
            ],
            
            jsSrcFiles  : [
                themeDir + 'src/js/**/*.js'
            ],
            
            htmlFiles   : [
                themeDir + '_static/**/*.html'
            ]
        },
        
        banner: ['/**',
            ' * <%= pkg.title %> v<%= pkg.version %>',
            ' * <%= pkg.homepage %>',
            ' * Copyright (c) <%= pkg.year %> - <%= pkg.author %>',
            ' * <%= pkg.license %> License',
            ' */',
        ''].join('\n')
    },

    csslintOptions = {
        'adjoining-classes'             : false,
        'box-model'                     : false,
        'box-sizing'                    : false,
        'compatible-vendor-prefixes'    : false,
        'empty-rules'                   : true,
        'errors'                        : true,
        'display-property-grouping'     : true,
        'duplicate-background-images'   : true,
        'duplicate-properties'          : true,
        'fallback-colors'               : false,
        'floats'                        : true,
        'font-faces'                    : true,
        'font-sizes'                    : false,
        'gradients'                     : false,
        'ids'                           : true,
        'import'                        : true,
        'important'                     : true,
        'known-properties'              : true,
        'order-alphabetical'            : false, // Deactivated due to error with vendor prefixes
        'outline-none'                  : false,
        'overqualified-elements'        : true,
        'qualified-headings'            : false,
        'regex-selectors'               : false,
        'shorthand'                     : true,
        'star-property-hack'            : false,
        'text-indent'                   : true,
        'underscore-property-hack'      : true,
        'unique-headings'               : false,
        'universal-selector'            : false,
        'unqualified-attributes'        : false,
        'vendor-prefix'                 : false,
        'zero-units'                    : true
    },

    jshintOptions = {
        'curly'     : true,
        'eqeqeq'    : true,
        'noempty'   : true,
        'newcap'    : true,
        'nonew'     : true,
        'strict'    : true,
        'camelcase' : true,
        'quotmark'  : 'single',
        'unused'    : false,        // Set this to 'true' when developing
        'jquery'    : true
    };

// Compile sass into CSS, add vendor prefixes, lint it & auto-inject into browsers
gulp.task('sass', () => {
    return gulp.src(app.path.sassFiles)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(csslint(csslintOptions))
        .pipe(csslint.formatter())
        .pipe(header(app.banner, {pkg: pkg}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(app.path.cssDir))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

// Lint JavaScript files, minify it & reload browsers
gulp.task('js', () => {

    return gulp.src(app.path.jsApp)
        .pipe(jshint(jshintOptions))
        .pipe(jshint.reporter('jshint-stylish', {beep: true}))
        .pipe(uglify())
        .pipe(header(app.banner, {pkg: pkg}))
        .pipe(gulp.dest(app.path.jsDir))
        .pipe(browserSync.stream());
});

// Static Server + watching files
gulp.task('serve', ['sass', 'js'], () => {

    browserSync.init({
        server: {
            baseDir: app.path.theme,
            index: '_static/index.html'
        }
        //notify: false
    });

    gulp.watch(app.path.sassFiles, ['sass']);
    gulp.watch(app.path.jsSrcFiles, ['js']);
    gulp.watch(app.path.htmlFiles).on('change', browserSync.reload);
});

// Main tasks
gulp.task('default', ['dev']);
gulp.task('dev', ['serve']);