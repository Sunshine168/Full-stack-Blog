"use strict";
const debug = require('debug')('koa2-session-store');
const uid = require('uid2');

module.exports = function(opts) {
  opts = opts || {};

  // key
  opts.name = opts.name || 'koa:sess';

  // cookie
  opts.cookie = opts.cookie || {};
  if (!opts.cookie.hasOwnProperty('httpOnly')) opts.cookie.httpOnly = true;
  if (!opts.cookie.hasOwnProperty('signed')) opts.cookie.signed = true;
  if (!opts.cookie.hasOwnProperty('overwrite')) opts.cookie.overwrite = true;

  debug('session options %j', opts);

  return async function(ctx, next) {
    var session = new Session(ctx, opts);
    ctx.session = await session.load();
    try {
      await next();
    } catch (e) {
      console.log(e);
    }
    if (!ctx.session) {
      return await session.remove();
    }
    await session.save(ctx.session);
  }
};


class Session {
  constructor(ctx, opts) {
    this._ctx = ctx;
    opts = opts || {};
    this._name = opts.name;
    this._cookieOpts = opts.cookie;
    // load session cookie data
    let jsonString = this._ctx.cookies.get(this._name, this._cookieOpts);
    debug('load cookie %j', jsonString);
    this._json = JSON.parse(jsonString || '{}');
    // new session?
    if (!this._json._sid) {
      this._isNew = true;
      this._sid = uid(15);
    } else {
      this._sid = this._json._sid;
      delete this._json._sid; // so that clients can't manipulate it
    }

    this._store = opts.store || 'cookie';
  }
  async load() {
    if ('cookie' === this._store) {
      // use the cookie itself as the store
      debug('use cookie as store');
      this._useCookieStore = true;
      this._prevSessionDataJSON = JSON.stringify(this._json);
      return this._json;
    } else {
      debug('load store for %d', this._sid);
      this._prevSessionDataJSON = (await this._store.load(this._sid)) || '{}';
      if (typeof this._prevSessionDataJSON === 'object') {
        throw new Error('did not support Generator please use async/awiat , if you using koa-session-mongo, please update to koa2-session-mongo')
      }
      return JSON.parse(this._prevSessionDataJSON);
    }
  }
  async save(newData) {
    // check session data is an object
    if ('object' !== typeof newData) {
      throw new Error('Session data must be a plain Object');
    }

    // if both previous and current session data are empty then do nothing
    var newJSON = JSON.stringify(newData),
      setCookieData = {};

    if (this._prevSessionDataJSON !== newJSON) {
      // if not cookie store then save the data
      if (!this._useCookieStore) {
        debug('save data to store for %d: %j', this._sid, newJSON);
        await this._store.save(this._sid, newJSON);
      }
      // if cookie store then cookie data = session data
      else {
        setCookieData = newData;
      }

      // add session id into cookie data
      setCookieData._sid = this._sid;

      // if (using cookie store) or (if this is a new session and is not empty)
      if (this._useCookieStore || this._isNew) {
        var cookieDataJSON = JSON.stringify(setCookieData);
        debug('save cookie %s', cookieDataJSON);
        this._ctx.cookies.set(this._name, cookieDataJSON, this._cookieOpts);
      }
    }
  }
  async remove() {
    debug('remove');
    if (!this._useCookieStore) {
      await this._store.remove(this._sid);
    }
    this._ctx.cookies.set(this._name, '', this._cookieOpts);
  }
}