const rollup = require('rollup');
const scss = require('node-sass');
const extend = require('extend');
const minify = require('rollup-plugin-babel-minify');
const rollupBaseConfigs = require('./rollup.config.js');

const print = text => {
    console.log('\x1b[32m', text);
    console.log('\x1b[0m');
}

module.exports = function (grunt) {
    const processEnv = (taskName, env, callback) => {
        const configs = grunt.config(taskName);
        const keys = env ? [env] : Object.keys(configs);

        keys.forEach(k => callback(configs[k]));
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        scss: {
            example: {
                file: 'example/example.scss',
                outFile: 'dist/example/example.css'
            },
            dev: {
                file: 'src/scss/styles.scss',
                outFile: 'dist/<%= pkg.name %>.dev.css'
            },
            pro: {
                outputStyle: 'compressed',
                file: 'src/scss/styles.scss',
                outFile: 'dist/<%= pkg.name %>.pro.css'
            }
        },
        rollup: {
            example: extend(true, {}, rollupBaseConfigs, {
                input: 'example/index.js',
                output: {
                    file: 'dist/example/example.js',
                    format: 'iife',
                    name: 'example'
                }
            }),
            dev: extend(true, {}, rollupBaseConfigs, {
                input: 'src/index.js',
                output: {
                    file: 'dist/<%= pkg.name %>.dev.js',
                    format: 'cjs',
                    name: 'ReactCollapsiblePanel',
                }
            }),
            pro: extend(true, {}, rollupBaseConfigs, {
                input: 'src/index.js',
                output: {
                    file: 'dist/<%= pkg.name %>.pro.js',
                    format: 'cjs',
                    name: 'ReactCollapsiblePanel',
                },
                plugins: rollupBaseConfigs.plugins.concat([minify()])
            })
        }
    });

    grunt.task.registerTask('scss', 'scss tasks', function (env) {
        processEnv('scss', env, cfg => {
            const result = scss.renderSync(cfg);

            grunt.file.write(cfg.outFile, result.css);
            print(cfg.outFile);
        });
    });

    grunt.task.registerTask('rollup', 'rollup tasks', function (env) {
        const done = this.async();
        const tasks = [];

        processEnv('rollup', env, cfg => {
            tasks.push(rollup.rollup(cfg).then(bundle => {
                tasks.push(bundle.generate(cfg.output).then(result => {
                    grunt.file.write(cfg.output.file, result.code);
                    print(cfg.output.file);
                }));
            }));
            Promise.all(tasks).then(() => done());
        });
    });

    // Default task(s).
    grunt.registerTask('default', ['scss', 'rollup']);
};