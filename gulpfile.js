const gulp = require('gulp');
const webpack = require('webpack');

const WebpackDevServer = require('webpack-dev-server');

const ip = require('ip');
const portfinder = require('portfinder');
const gutil = require('gulp-util');
const del = require('del');

function runServerOnPort(config, port) {
    const localServer = `http://${ip.address()}:${port}`;

    config.entry.unshift(
        `webpack-dev-server/client?${localServer}`,
        'webpack/hot/dev-server'
    );
    config.output.publicPath = localServer + '/';

    const server = new WebpackDevServer(webpack(config), {
        hot: true,
        contentBase: 'src',
        stats: {
            colors: true,
            chunkModules: false,
            chunks: false,
            hash: false,
            version: false
        }
    });

    server.listen(port, (err) => {
        if (err) { throw new gutil.PluginError('webpack', err); }

        gutil.log('Listening', gutil.colors.magenta(localServer));
    });
}

function runServer(config) {
    portfinder.basePort = 9000;
    portfinder.getPort((err, port) => {
        if (err) { throw new gutil.PluginError('webpack', err); }

        runServerOnPort(config, port);
    });
}

function webpackTask(cb, opts) {
    const config = require('./webpack.config.js')(opts);

    if (opts.watch) {
        return runServer(config);
    }

    webpack(config, (err) => {
        if (err) { throw new gutil.PluginError('webpack', err); }
        cb();
    });
}

gulp.task('clean', cb => del.sync(['dist'], cb()));

gulp.task('static', (cb) => {
    return gulp.src([
        'src/*/*.css',
        'src/*.html',
        'src/CNAME'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
    cb(); // 'cb' callback in all functions to signal flush async call ('hack')
});

gulp.task('assets', (cb) => {
    return gulp.src([
        'src/assets/**/*'
    ], {
        dot: true
    }).pipe(gulp.dest('dist/assets'));
    cb();
});

gulp.task('libs', (cb) => {
    gulp.src('src/libs/*')
        .pipe(gulp.dest('dist/libs'));
        cb();
});

gulp.task('webpack:prod', cb => webpackTask(cb, {prod: true}));

gulp.task('build', gulp.series('clean', 'libs', 'static', 'assets', 'webpack:prod'));

gulp.task('watch', cb => webpackTask(cb, {watch: true}));

gulp.task('default', gulp.series('build', 'watch'));
