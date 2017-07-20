'use strict';

module.exports = function(grunt) {
    return {
        build: {
            files: [
                {
                    expand: true,
                    cwd: './views',
                    src: '**/*.dust',
                    dest: 'public/templates',
                    ext: '.js'
                }
            ],
            options: {
                fullname: function (filepath) {
                    var path = require('path'),
                        name = path.basename(filepath, '.dust'),
                        parts = filepath.split(path.sep),
                        fullname = parts.slice(3, -1).concat(name);

                    return fullname.join(path.sep);
                }
            }
        }
    };
};