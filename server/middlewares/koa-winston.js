'use strict';
// const chalk = require('chalk');
const STATUS_COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'green'
};

/**
 * Logger
 *
 * @param {object} winstonInstance
 */
function logger(winstonInstance) {
  return async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;

    let logLevel;
    if (ctx.status >= 500) {
      logLevel = 'error';
    }
    if (ctx.status >= 400) {
      logLevel = 'warn';
    }
    if (ctx.status >= 100) {
      logLevel = 'info';
    }

    let msg = (`${ctx.method} ${ctx.originalUrl}`) +(` ${ctx.status} `) +(`${ms}ms`);

    winstonInstance.log(logLevel, msg);
  };
}

module.exports = logger;
