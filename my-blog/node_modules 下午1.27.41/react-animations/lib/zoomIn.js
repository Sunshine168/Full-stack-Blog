'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var zoomIn = {
  from: {
    opacity: 0,
    transform: (0, _utils.scale3d)(0.3, 0.3, 0.3)
  },
  '50%': {
    opacity: 1
  }
};
exports.default = zoomIn;