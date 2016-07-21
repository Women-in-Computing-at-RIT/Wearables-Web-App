import {Meteor} from 'meteor/meteor';
import {EJSON} from 'meteor/ejson';
import {check} from 'meteor/check';
import {Random} from 'meteor/random';

import {Enum2} from '../enums';
import {App} from '../constants';

class LogLevel extends Enum2 {

  static fromJSONValue(json) {
    return LogLevel.enumValues[parseInt(json.substr(json.lastIndexOf('_') + 1), 10)];
  }

  static get typeName() { //eslint-disable-line lodash/prefer-constant
    return 'WiC_LOG_LEVEL_TYPE';
  }

  toJSONValue() {
    return `WiC_LOG_LEVEL_VALUE_${this.ordinal}`;
  }

  static compare(level, other) {
    check(level, LogLevel);
    check(other, LogLevel);

    return other.ordinal - level.ordinal;
  }

  static isLower(level, other) {
    return LogLevel.compare(level, other) < 0;
  }

  static isLowerOrEqual(level, other) {
    return LogLevel.compare(level, other) <= 0;
  }

  static isEqual(level, other) {
    return LogLevel.compare(level, other) === 0;
  }

  static isGreaterOrEqual(level, other) {
    return LogLevel.compare(level, other) >= 0;
  }

  static isGreater(level, other) {
    return LogLevel.compare(level, other) > 0;
  }
}

if(Meteor.isServer)
  EJSON.addType(LogLevel.typeName, LogLevel.fromJSONValue);

LogLevel.initEnum([
  'FATAL',
  'ERROR',
  'WARN',
  'INFO',
  'DEBUG'
]);

class Logger {

  constructor(transportManager) {
    this._transportManager = transportManager;
    this._transportManager.registerLogger(this);
    this._transportDefinitions = {};
    this._transports = [];
  }

  static setDefaultMeta(meta) {
    meta = _.isPlainObject(meta) ? meta : {};
    meta._origin = meta._origin || Logger.Origin.type;
    meta._originId = meta._origin_id || Logger.Origin.id;

    return meta;
  }

  static restoreConsoleFunctions() {
    console.info = Logger.Origin._originalConsole.info;
    console.warn = Logger.Origin._originalConsole.warn;
    console.error = Logger.Origin._originalConsole.error;
  }

  overrideConsoleFunctions() {
    const consoleObj = Logger.Origin._originalConsole;

    const handleArgs = (msg) => {
      if(_.isPlainObject(msg))
        msg = JSON.stringify(msg);

      return msg;
    };

    console.log = (msg) => {
      msg = handleArgs(msg);

      if(Meteor.isClient)
        consoleObj.log(msg);

      this.info(msg);
    };

    console.warn = (msg) => {
      msg = handleArgs(msg);

      if(Meteor.isClient)
        consoleObj.warn(msg);

      this.warn(msg);
    };

    console.error = (msg) => {
      msg = handleArgs(msg);

      if(Meteor.isClient)
        consoleObj.error(msg);

      if(_.isError(msg))
        msg = msg.toString();

      this.error(msg);
    };
  }

  addTransport(name, options) {
    let definitions = this._transportDefinitions[name];

    if (_.isNil(definitions))
      definitions = this._transportDefinitions[name] = [];

    definitions.push(options);
    this._initTransports(name);
  }

  newTransportType(name) {
    this._initTransports(name);
  }

  logMessage(level, message, meta) {
    meta = Logger.setDefaultMeta(meta);
    _.forEach(this._transports, (t) => t.log(moment(), level, message, meta));
  }

  _initTransports(name) {
    const definitions = this._transportDefinitions[name];

    // Partial function, name is already filled in. Only needs transport options.
    const createTransport = _.partial(this._transportManager.createTransport, name);

    if (!_.isNil(definitions)) {
      _(definitions)  //eslint-disable-line lodash/prefer-map
        .map(createTransport)
        .tap(this._transports.push)
        .drop(definitions.length).value(); // Clear array
    }
  }
}

Logger.prototype.fatal = Logger.prototype.f = _.partial(Logger.prototype.logMessage, LogLevel.FATAL);
Logger.prototype.error = Logger.prototype.e = _.partial(Logger.prototype.logMessage, LogLevel.ERROR);
Logger.prototype.warn = Logger.prototype.w = _.partial(Logger.prototype.logMessage, LogLevel.WARN);
Logger.prototype.info = Logger.prototype.i = _.partial(Logger.prototype.logMessage, LogLevel.INFO);
Logger.prototype.debug = Logger.prototype.d = _.partial(Logger.prototype.logMessage, LogLevel.DEBUG);


Logger.Origin = {
  type: Meteor.isClient ? App.logging.originClient : App.logging.originServer,
  id: Random.id(64),
  _originalConsole: {
    log: console.log,
    warn: console.warn,
    error: console.error
  }
};

export {LogLevel, Logger};
