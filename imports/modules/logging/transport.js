import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import {LogLevel, Logger} from './logger';
import {Exceptions} from '../constants';

class Transport {
  constructor(initFn, logFn, typeName, options) {
    this._init = initFn;
    this._log = logFn;
    this._type = typeName;
    this._options = _.defaults(options, {level: LogLevel.INFO});
    this._validator = new SimpleSchema(schema).validator();
  }

  _setup() {
    if(_.isFunction(this._init))
      this._init(this._options);
  }

  log(timestamp, level, message, meta) {
    if(LogLevel.isLowerOrEqual(level, this._options.level))
      this._log.call(this._options, timestamp, level, message, meta);
  }

  get type() {
    return this._type;
  }
}

class TransportManager {
  constructor() {
    this._transportTypes = new Map();
    this._transportDesc = new Map();
    this._loggers = [];
  }

  registerLogger(logger) {
    if(logger instanceof Logger)
      this._loggers.push(logger);
    else
      throw new Meteor.Error(Exceptions.types.typeMismatch, Exceptions.reasons.typeMismatchTemplate('logger', Logger));
  }

  createTransport(name, options) {
    if(this.isTransportAvailable(name)) {
      const type = this._transportTypes[name];
      const schema = new SimpleSchema(type.schema);
      schema.validate(options);

      return new Transport(type.initFn, type.logFn, name, options);
    } else
      return null;
  }

  addTransportType(name, initFn, logFn, schema = {}) {
    this._transportTypes[name] = {
      initFn,
      logFn,
      schema
    };

    this._emitNewTransportType(name);
  }

  isTransportAvailable(name) {
    return !_.isNil(this._transportTypes[name]);
  }

  _emitNewTransportType(transportTypeName) {
    _.forEach(this._loggers, (logger) => logger.newTransportType(transportTypeName));
  }
}
