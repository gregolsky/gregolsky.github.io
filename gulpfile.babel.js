import gulp from 'gulp';
import sass from 'gulp-sass';
import pug from 'gulp-pug';
import imagemin from 'gulp-imagemin';
import markdown from 'gulp-markdown';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import del from 'del'

const PATHS = {
    DIST: 'dist',
    SRC: 'src'
};

gulp.task('clean', function () {
    return del('dist/*');
});

gulp.task('styles', ['clean'], () => {
    return gulp.src('src/**/*.scss', {
            base: PATHS.SRC,
        })
        .pipe(sass({
            outputStyle: 'compressed',
            errLogToConsole: true
        }))
        .pipe(rev())
        .pipe(gulp.dest(PATHS.DIST));
});

gulp.task('fonts', ['clean'], () => {
    return gulp.src('src/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}', {
            base: PATHS.SRC
        })
        .pipe(rev())
        .pipe(gulp.dest(PATHS.DIST));
});

gulp.task('images', ['clean'], () => {
    return gulp.src('src/images/**/*.{jpg,png}', {
        base: PATHS.SRC
    })
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest(PATHS.DIST)); 
});

gulp.task('page:main', [ 'styles', 'fonts', 'images' ], () => {
    return gulp.src("src/*.pug", {
        base: PATHS.SRC
    })
    .pipe(pug()) //TODO
});

gulp.task('page:articles:markdown', () => {

})

gulp.task('page:articles', [], () => {

});

gulp.task('page:rss', () => {

});

gulp.task('build', [
    'page:main',
    'page:articles'
]);