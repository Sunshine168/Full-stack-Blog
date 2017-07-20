'use strict';

exports.__esModule = true;

var _constants = require('./constants');

exports['default'] = function (props) {
  return props && props[_constants.AWAIT_INFO_CONTAINER] || { statuses: {}, errors: {} };
};

module.exports = exports['default'];