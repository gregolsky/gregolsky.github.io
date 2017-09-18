import gulp from 'gulp';
import sass from 'gulp-sass';
import data from 'gulp-data';
import pug from 'gulp-pug';
import imagemin from 'gulp-imagemin';
import markdown from 'gulp-markdown';
import rev from 'gulp-rev';
import { log } from 'gulp-util';
import revReplace from 'gulp-rev-replace';
import del from 'del'
import path from 'path';
import yargs from 'yargs';
import fs from 'fs';
import inCaseOf from 'gulp-if';
import revdel from 'rev-del';
import revCollect from 'gulp-rev-collector';
import runSequence from 'run-sequence';
import rename from 'gulp-rename';

const CALLED_TASK = require('yargs').argv._[0];
const IS_RELEASE = CALLED_TASK === 'release';

log(`MINIFY & REV: ${ IS_RELEASE }`);

const PATHS = {
    DIST: 'dist',
    SRC: 'src',
    DATA: 'src/_data.json'
};

function dist(name) {
    return path.join(PATHS.DIST, name);
}

function src(name){
    return path.join(PATHS.SRC, name);
}

gulp.task('clean', function () {
    return del('dist/*');
});

gulp.task('styles', () => {
    return gulp.src('src/**/*.scss', {
            base: PATHS.SRC,
        })
        .pipe(sass({
            outputStyle: 'compressed',
            errLogToConsole: true
        }))
        .pipe(gulp.dest(PATHS.DIST));
});

gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}', {
            base: PATHS.SRC
        })
        .pipe(gulp.dest(PATHS.DIST));
});

gulp.task('images', () => {
    return gulp.src('src/images/**/*.{jpg,png}', {
        base: PATHS.SRC
    })
    .pipe(imagemin())
    .pipe(gulp.dest(PATHS.DIST));
});

gulp.task('pages:pug', [ 'assets' ], () => {
    const VIEW_DATA = JSON.parse(fs.readFileSync(PATHS.DATA, 'utf-8'));

    return gulp.src([
        "src/**/*.pug",
        "!src/_partials/**/*.pug",
        "!src/apps/**/*.pug",
        "!src/**/_*.pug"
    ], {
        base: PATHS.SRC,
        ignore: 'apps'
    })
    .pipe(data(getData))
    .pipe(pug())
    .pipe(gulp.dest(PATHS.DIST));

    function getData(file) {
        let { dir, root , base, name } = path.parse(file.history[0]);
        dir = path.relative(path.join(__dirname, file.base), dir);
        let articleData = {};
        if (dir.indexOf('articles') === 0) {
            articleData = Object.assign(articleData, VIEW_DATA.articles[name])
        }
        const templateData = Object.assign(VIEW_DATA, articleData, {
            dir,
            name
        });

        return templateData;
    }
});

gulp.task('watch', [ 'build' ], () => {
    gulp.watch(src('**/*.scss'), ['styles']);
    gulp.watch(src('**/*.pug'), ['pages']);
});

gulp.task('assets', [ 'styles', 'fonts', 'images' ]);

gulp.task('revision:rename', [ 'pages', 'assets' ], () => {
    return gulp.src(
        path.join(PATHS.DIST, "**/*.{js,css,jpg,png,jpeg,gif}"))
    .pipe(rev())
    .pipe(gulp.dest(PATHS.DIST))
    .pipe(rev.manifest({ path: "manifest.json" }))
    .pipe(revdel())
    .pipe(gulp.dest(PATHS.DIST))
});

gulp.task("revision:updateReferences", [ "pages", "assets", "revision:rename" ], () => {
    return gulp.src([
        path.join(PATHS.DIST, "manifest.json"), 
        path.join(PATHS.DIST, "**/*.{html,css}")
    ])
    .pipe(revCollect())
    .pipe(gulp.dest(PATHS.DIST));
});

gulp.task('pages:rename-feed', ['pages:pug'], () => {
    return gulp.src(dist('feed.xml.html'))
        .pipe(rename('feed.xml'))
        .pipe(gulp.dest(PATHS.DIST));
})

gulp.task('pages', ['pages:pug', 'pages:rename-feed']);

gulp.task('build', ['clean'], (cb) => {
    runSequence(['pages', 'assets'], cb);
});

gulp.task('release', [ 'revision:rename', 'revision:updateReferences' ]);
