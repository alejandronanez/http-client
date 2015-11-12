var series     = require('stream-series'),
    gulp       = require('gulp'),
    templates  = require('gulp-angular-templatecache'),
    async      = require('async'),
    concat     = require('gulp-concat'),
    gettext    = require('gulp-angular-gettext'),
    jeditor    = require('gulp-json-editor'),
    inject     = require('gulp-inject'),
    less       = require('gulp-less'),
    minifyCSS  = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    rename     = require('gulp-rename'),
    rev        = require('gulp-rev'),
    watch      = require('gulp-watch'),
    uglify     = require('gulp-uglify'),
    util       = require('gulp-util');

var isProd = !!util.env.prod;

var cssFiles = [
    './src/asset/less/guardian.less'
];

var jsFiles = {
    site: [
        'i18n/*.js',
        'app/app.js',
        'app/templates.js',
        'app/routes.js',
        'app/shared/**/*.js',
        'app/component/**/*.js'
    ],
    vendor: [
        'underscore/underscore.js',
        'jquery/dist/jquery.js',
        'bootstrap/dist/js/bootstrap.min.js',
        'angular/angular.js',
        'angular-animate/angular-animate.js',
        'angular-filter/dist/angular-filter.js',
        'angular-loading-bar/src/loading-bar.js',
        'angular-gettext/dist/angular-gettext.js',
        'angular-smooth-scroll/angular-smooth-scroll.js',
        'angular-toastr/dist/angular-toastr.js',
        'angular-toastr/dist/angular-toastr.tpls.js',
        'angular-sanitize/angular-sanitize.js',
        'angular-ui-router/release/angular-ui-router.js',
        'angular-ui-select/dist/select.js',
        'angularjs-datepicker/src/js/angular-datepicker.js',
        'angular-tooltips/dist/angular-tooltips.min.js',
        'angulartics/dist/angulartics.min.js',
        'angulartics-google-analytics/dist/angulartics-google-analytics.min.js',

        'ngstorage/ngStorage.js',

        'highcharts-release/highcharts.src.js',
        'highcharts-release/themes/grid-light.js',
        'highcharts-ng/dist/highcharts-ng.js',

        'moment/moment.js',
        'moment/locale/fr.js',
        'moment/locale/es.js',
        'moment/locale/de.js',
        'moment/locale/it.js',
        'moment/locale/ja.js',
        'moment/locale/pt-br.js'
    ]
};

var templateFiles = ['./src/view/**/*.html'];

var cssCallback = function() {
    var stream = gulp
        .src(cssFiles)
        .pipe(less());

    if (isProd) {
        stream = stream
            .pipe(rev())
            .pipe(minifyCSS());
    }

    return stream.pipe(gulp.dest('./build/asset/css'));
};

var jsCallback = function() {
    var stream = gulp.src(jsFiles.site, { cwd: './src/' });

    if (isProd) {
        stream = stream
            .pipe(concat('app.js'))
            .pipe(rev())
            .pipe(uglify());
    }

    return stream.pipe(gulp.dest('./build/app'));
};

var jsVendorCallback = function() {
    var stream = gulp
        .src(jsFiles.vendor, { cwd: './bower_components' });

    if (isProd) {
        stream = stream
            .pipe(concat('vendor.js'))
            .pipe(rev())
            .pipe(uglify());
    }

    return stream.pipe(gulp.dest('./build/asset/js'));
};

gulp.task('build', ['config', 'robots', 'image', 'font', 'index']);

gulp.task('watch', function() {
    gulp.watch(['./src/index.html'], ['index']);
    gulp.watch(['./src/asset/less/**/*.less'], ['css']);
    gulp.watch(['./src/app/**/*.js'], ['js']);
    gulp.watch(['./src/po/*.po'], ['translate']);
    gulp.watch(templateFiles, ['templates']);
});

gulp.task('templates', function() {
    return gulp
        .src(templateFiles)
        .pipe(templates({
            module: 'app',
            standalone: false
        }))
        .pipe(gulp.dest('./src/app'))
});

gulp.task('config', function() {
    var stream = gulp.src('./src/app/config.json.dist');

    stream = stream
       .pipe(jeditor(function(json) {
           json.deployTime = +new Date();

           return json;
       }));

    if (isProd) {
        stream = stream
            .pipe(jeditor(function(json) {
                json.api = '//api.guardian.gg';
                json.deployTime = +new Date();

                return json;
            }));
    }

    return stream
        .pipe(rename('config.json'))
        .pipe(gulp.dest('./build/app'));
});

gulp.task('index', ['js', 'jsVendor', 'css', 'translate'], function() {
    var stream = gulp
        .src('./src/index.html')
        .pipe(inject(cssCallback(), {ignorePath: '/build', removeTags: true, name: 'app'}))
        .pipe(inject(jsVendorCallback(), {ignorePath: '/build', removeTags: true, name: 'vendor'}))
        .pipe(inject(jsCallback(), {ignorePath: '/build', removeTags: true, name:'app'}));

    if (isProd) {
        stream = stream.pipe(minifyHTML());
    }

    return stream.pipe(gulp.dest('./build'))
});

gulp.task('jsVendor', jsVendorCallback);

gulp.task('js', ['templates'], jsCallback);

gulp.task('css', cssCallback);

gulp.task('image', function() {
    return gulp.src('./src/asset/image/**/*').pipe(gulp.dest('./build/asset/image'));
});

gulp.task('font', function() {
    return gulp.src('./src/asset/font/**/*').pipe(gulp.dest('./build/asset/font'));
});

gulp.task('robots', function() {
    return gulp.src('./robots.txt').pipe(gulp.dest('./build'));
});

gulp.task('pot', function () {
    return gulp.src(['src/index.html', 'src/view/**/*.html', 'src/app/**/*.js'])
        .pipe(gettext.extract('template.pot', {
            // options to pass to angular-gettext-tools...
        }))
        .pipe(gulp.dest('src/po'));
});

gulp.task('translate', function () {
    return gulp
        .src('src/po/**/*.po')
        .pipe(gettext.compile())
        .pipe(gulp.dest('src/i18n/'));
});
