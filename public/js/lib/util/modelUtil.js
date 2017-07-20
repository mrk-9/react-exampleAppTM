'use strict';

/**
 * Simple module for setting/getting nested model data
 * @module lib/util/modelUtil
 * @namespace lib/util/modelUtil
 */


var modelUtil = {
    /**
     * gets nested model data if needed,
     * parses string to build the path
     * @method getModelData
     * @memberof lib/util/modelUtil
     */
    getModelData: function (path, model) {

        var pathParts = path.split('.'),
            result,
            i,
            l = pathParts.length;

        if (l > 0) {

            if (l === 1) {

                return model.get(pathParts[0]);

            } else {

                result = model.get(pathParts[0]);

                for (i = 1, l = pathParts.length; i < l; i++) {

                    if (pathParts[i] in result) {
                        result = result[pathParts[i]];
                    } else {
                        return;
                    }

                }

                return result;

            }

        } else {

            return model;

        }

    },

    /**
     * sets nested model data if needed,
     * parses string to build the path
     * @method setModelData
     * @memberof lib/util/modelUtil
     */
    setModelData: function (path, data, model) {

        var pathParts = path.split('.'),
            result,
            i,
            l = pathParts.length;

        if (l > 0) {

            if (l === 1) {

                model.set(pathParts[0], data);

            } else {

                result = model.get(pathParts[0]);

                var obj = result;

                for (i = 1, l = pathParts.length; i < l -1; i++) {

                    if (!obj[pathParts[i]]) {
                        obj[pathParts[i]] = {};
                    }
                    obj = obj[pathParts[i]];

                }

                obj[pathParts[l - 1]] = data;

                model.set(pathParts[0], result);

            }

        } else {
            return;
        }

    }
};

module.exports = modelUtil;