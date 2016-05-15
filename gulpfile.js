const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const Builder = require('systemjs-builder');
var Server = require('karma').Server;
const change = require("gulp-change");
var surge = require('gulp-surge')
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var argv = require('yargs').argv;
const autoprefixer = require('gulp-autoprefixer');

/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del(["build"], cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */

//hack, but works
function enableProductionMode(content, done)
{    
    //65 bytes is size of enviroment.ts
    if(content.length == 65)
    {
        content = content.replace(/export const Production = false;/, "export const Production = true;");
    }
    done(null, content);
}

gulp.task("compile", ["tslint"], () => {
    var glob = gulp.src("src/**/*.ts")
    
    if(argv.production)
    {
        console.log("Production mode is enabled");
        
        glob.pipe(change(enableProductionMode));
    }
    
    tsResult = glob
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/**
 * Copy all icons to root directory.
 */
gulp.task("copyicons", () => {
    return gulp.src(["src/icons/**.*"])
        .pipe(gulp.dest("build"));
});

/**
 * Copy comppnents html
 */
gulp.task("copyhtml", () => {
    return gulp.src(["src/app/**.html"])
        .pipe(gulp.dest("build/app"));
});

/**
 * css
 */
gulp.task('css', () =>
    gulp.src('src/styles.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build'))
);

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ['copyicons', 'copyhtml', 'css'], () => {
    return gulp.src(["src/**/*", "!**/*.ts", "!src/{icons,icons/**}", "!**/*.css",])
        .pipe(gulp.dest("build"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
            'es6-shim/es6-shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});

/**
 * Build the project.
 */
gulp.task("build", ['compile', 'resources', 'libs', 'modules'], () => {
    console.log("Building the project ...")
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', () => {
    gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["src/**/*.html", "src/**/*.css"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

gulp.task('modules', ['compile', 'libs'], (cb) => {
        const builder = new Builder('build/', 'src/systemjs.config.js');
        Promise.all([
            builder.bundle('app/**/*.js - [app/**/*.js]', 'build/lib/dependencies.js', { minify: true, sourceMaps: true }),
           // builder.bundle('[app/**/*.js] - *.spec.js', 'build/app/app.js', { minify: true, sourceMaps: true })
        ]).then(function(){
            console.log('Build of modules complete');
            cb();
        })
        .catch(function(err){
            console.error(err);
        });
});

/**
 * Upload to surge
 */

gulp.task('deploy', () => {
    
    /*if(!argv.production)
    {
        console.warn("*********> You are deploying non-production version! <*********");
    }*/
    
    argv.production = true;
    
    gulp.src(['.surgeignore', 'CNAME'])
        .pipe(gulp.dest('build'));
    return surge({
            project: './build',
            domain: 'whataday.2016.angularattack.io'
        });
});

/**
 * Launch server
 */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
        baseDir: 'build',
    },
    port: 8000
  })
})

/**
 * Default command
 */
gulp.task('default', function (callback) {
  runSequence('build', ['browserSync', 'watch'],
    callback
  )
})

/**
 * Fast
 */
gulp.task('fast', function (callback) {
  runSequence('compile', ['browserSync', 'watch'],
    callback
  )
})