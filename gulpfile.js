// VARIABLES
var gulp = require('gulp');
var gutil = require('gulp-util');
var merge = require('merge-stream');

var bower = require('gulp-bower');
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var del = require('del');

var fs = require('fs');

var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');
var npmCleanCSS = require('clean-css');
var postcss = require('gulp-postcss');
var pxtorem = require('postcss-pxtorem');

var wait = require('gulp-wait');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');

var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var prod = !!(argv.prod);

// ASSET FOLDER PATHS
var paths = {
  styles: {
    src: 'assets/src/scss/',
    dest: 'assets/dist/css/'
  },
  scripts: {
    src: 'assets/src/js/',
    dest: 'assets/dist/js/'
  },
  images: {
    src: 'assets/src/images/',
    dest: 'assets/dist/images/',
  },
  fonts: {
    src: 'assets/src/webfonts/',
    dest: 'assets/dist/webfonts/'
  }
};

// ASSET FILES
var files = {
  // STYLES
  main: paths.styles.src + '/',
  // SCRIPTS
  scriptsMain: [
    // paths.scripts.src + 'vendor/jquery.js',
    // paths.scripts.src + 'vendor/accessibility.js',
    // paths.scripts.src + 'vendor/mobile-detect.js',
    // paths.scripts.src + 'vendor/accessible-nav.js',
    // paths.scripts.src + 'vendor/accordions.js',
    // paths.scripts.src + 'vendor/file-input.js',
    // paths.scripts.src + 'vendor/enquire.js',
    // paths.scripts.src + 'vendor/jquery.cycle2.js',
    // paths.scripts.src + 'vendor/jquery.cycle2.swipe.js',
    // paths.scripts.src + 'vendor/jquery.cycle2.center.js',
    // paths.scripts.src + 'vendor/jquery.cycle2.carousel.js',
    // paths.scripts.src + 'vendor/jquery.magnific-popup.js',
    // paths.scripts.src + 'vendor/modal.js',
    // paths.scripts.src + 'vendor/responsive-videos.js',
    // paths.scripts.src + 'vendor/tabs.js',
    // paths.scripts.src + 'vendor/tables.js',
    paths.scripts.src + 'vendor/modal.js',
    paths.scripts.src + 'main.js'
  ],
  scriptsHomepage: [
    paths.scripts.src + 'homepage.js'
  ],
  scriptsSubpage: [
    // paths.scripts.src + 'vendor/jquery.inputmask.bundle.js',
    paths.scripts.src + 'subpage.js'
  ],
  // IMAGES
  images: paths.images.src + '/'
};

// VIEWS FILES
var views = {
  src: '../../views/**/',
  dest: '../../views/'
};

// BOWER COMPONENTS
var framework = {
  bourbon: {
    src: 'bower_components/bourbon/app/assets/stylesheets/**/*',
    dest: paths.styles.src + 'vendor/bourbon/',
  }
};

var siteURL = 'http://wsstarter.local';

// BROWSERSYNC
gulp.task('browser-sync', function () {
  var browserSyncFiles = ['*.{html,shtml,php,aspx,ascx,asp,inc}', '!assets/dist/css/critical/*.css', 'assets/dist/css/**/*.css', 'assets/dist/js/**/*.js', 'assets/dist/images/**/*.{png,gif,jpg,svg}'];
  browserSync.init(browserSyncFiles, {
    proxy: siteURL
  });
});

var processors = [
  autoprefixer({
    browsers: ['last 3 versions', 'IOS 8'],
    remove: false
  }),
  pxtorem({
    rootValue: 16,
    unitPrecision: 5,
    propList: ['*'],
    replace: false
  })
];

// VIEW STYLES
gulp.task('viewstyles', function () {
  return gulp.src(views.src + '*.css')
    .pipe(concat('views.css'))
    .pipe(wait(500))
    .pipe(sass().on('error', sass.logError))
    .on('error', notify.onError({
      message: 'Styles compiling failed'
    }))
    .pipe(postcss(processors))
    .pipe(cleanCSS())
    .pipe(rename({ extname: '.scss' }))
    .pipe(gulp.dest(views.dest))
    .pipe(notify({
      message: 'views css compiled',
      onLast: true
    }));
});

// STYLES
gulp.task('styles', function () {
  return gulp.src(files.main + '*.scss')
    .pipe(wait(500))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .on('error', notify.onError({
      message: 'styles failed'
    }))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
});

// CLEAN CSS
gulp.task('clean-css', ['styles'], function () {
  return gulp.src(paths.styles.dest + '*.min.css', { read: false })
    .pipe(clean());
});

// COMPRESS STYLES
gulp.task('compress-css', ['clean-css'], function () {
  return gulp.src(paths.styles.dest + '*.css')
    .pipe(sass().on('error', sass.logError))
    .on('error', notify.onError({
      message: 'css compression failed'
    }))
    .pipe(cleanCSS({
      level: {
        2: {
          specialComments: 0,
          mergeSemantically: true,
          removeUnusedAtRules: false,
          restructureRules: true
        }
      },
      compatibility: '*',
      advanced: true,
      ieBangHack: true,
      ieFilters: true,
      iePrefixHack: true,
      ieSuffixHack: true,
      sourceMap: true
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(notify({
      message: 'css compressed',
      onLast: true
    }));
});

// VIEW JS
gulp.task('viewscripts', function () {
  return gulp.src(views.src + '*.js')
    .pipe(concat('views.js'))
    .pipe(uglify().on('error', notify.onError({
      message: 'views js failed'
    })))
    .pipe(gulp.dest(views.dest))
    .pipe(notify({
      message: 'views js compiled',
      onLast: true
    }));
});

// JS LINT
gulp.task('jslint', function () {
  var main = gulp.src(paths.scripts.src + 'main.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .on('error', notify.onError({
      message: 'main.js linting failed'
    }));
  var homepage = gulp.src(paths.scripts.src + 'homepage.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .on('error', notify.onError({
      message: 'homepage.js linting failed'
    }));
  var subpage = gulp.src(paths.scripts.src + 'subpage.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .on('error', notify.onError({
      message: 'subpage.js linting failed'
    }));
  return merge(main, homepage, subpage);
});

// SCRIPTS
gulp.task('scripts', ['jslint'], function () {
  var main = gulp.src(files.scriptsMain)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
  var homepage = gulp.src(files.scriptsHomepage)
    .pipe(sourcemaps.init())
    .pipe(concat('homepage.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
  var subpage = gulp.src(files.scriptsSubpage)
    .pipe(sourcemaps.init())
    .pipe(concat('subpage.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));

  return merge(main, homepage, subpage);
});

// CLEAN JS
gulp.task('clean-js', ['scripts'], function () {
  return gulp.src(paths.scripts.dest + '*.min.js', { read: false })
    .pipe(clean());
});

// COMPRESS SCRIPTS
gulp.task('compress-scripts', ['clean-js'], function () {
  return gulp.src(paths.scripts.dest + '*.js')
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(notify({
      message: 'js compressed',
      onLast: true
    }));
});

// IMAGES
gulp.task('images', function () {
  return gulp.src(paths.images.src + '**/*')
    .pipe(wait(1500))
    .pipe(newer(paths.images.dest))
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      })
    ]))
    .pipe(gulp.dest(paths.images.dest))
    .on('error', gutil.log)
    .pipe(notify({
      message: 'images optimized',
      onLast: true
    }));
});

// DEFAULT TASK
gulp.task('default', ['compress-css', 'compress-scripts', 'images'], function () {
  gulp.watch(views.src + '**/*.css', { interval: 750 }, ['viewstyles']);
  gulp.watch(paths.styles.src + '**/*.scss', { interval: 750 }, ['compress-css']);
  gulp.watch([views.src + '**/*.js', '!../../views/views.js'], { interval: 750 }, ['viewscripts']);
  gulp.watch(paths.scripts.src + '**/*.js', { interval: 750 }, ['compress-scripts']);
  gulp.watch(paths.images.src + '**/*', { interval: 750 }, ['images']);
});

// BROWSER SYNC TASK
gulp.task('sync', ['compress-css', 'compress-scripts', 'images', 'browser-sync'], function () {
  gulp.watch(views.src + '**/*.css', { interval: 750 }, ['viewstyles']);
  gulp.watch(paths.styles.src + '**/*.scss', { interval: 750 }, ['compress-css']);
  gulp.watch([views.src + '**/*.js', '!../../views/views.js'], { interval: 750 }, ['viewscripts']);
  gulp.watch(paths.scripts.src + '**/*.js', { interval: 750 }, ['compress-scripts']);
  gulp.watch(paths.images.src + '**/*', { interval: 750 }, ['images']);
});

// INSTALL BOWER DEPENDENCIES
gulp.task('bower-install', function () {
  return bower();
});

// MOVE BOWER MAIN FILES
var filterByExtension = function (extension) {
  return filter(function (file) {
    return file.path.match(new RegExp('.' + extension + '$'));
  }, {
    restore: true
  });
};
gulp.task('bower-single-files', ['bower-install'], function () {
  var mainFiles = mainBowerFiles();
  if (!mainFiles.length) {
    return;
  }
  var jsFilter = filterByExtension('js');
  return gulp.src(mainFiles)
    .pipe(jsFilter)
    .pipe(gulp.dest(paths.scripts.src + 'vendor/'))
    .pipe(jsFilter.restore)
    .pipe(filterByExtension('css'))
    .pipe(gulp.dest(paths.styles.src + 'vendor/'))
    .pipe(jsFilter.restore)
    .pipe(filterByExtension('css'))
    .pipe(gulp.dest(paths.styles.src + 'vendor/'));
});

// REMOVE BOWER COMPONENTS FOLDER
gulp.task('clean-bower', ['bower-single-files'], function () {
  del('bower_components/');
});

gulp.task('bower', ['clean-bower']);