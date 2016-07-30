import React from 'react';

import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import {Enum2} from '../enums';

const ANONYMOUS = '<<anonymous>>';

function createTypeChecker(validate) {
  function check(isRequired, props, propName, componentName, location, propFullName) {
    componentName = componentName || ANONYMOUS;
    propFullName = propFullName || propName;
    if(_.isNil(props[propName])) {
      const locationName = React.PropTypeLocationNames[location];
      if (isRequired)
        return new Error(`Required ${locationName} '${propFullName}' was not specified in '${componentName}'.`);
      return null;
    } else
      return validate(props, propName, componentName, location, propFullName);
  }

  const chainedCheck = check.bind(null, false);
  chainedCheck.isRequired = check.bind(null, true);

  return chainedCheck;
}

function createSchemaChecker(schema) {
  if(schema instanceof SimpleSchema) {
    const schemaCheck = (props, propName) => {
      const propValue = props[propName];
      let error = null;

      try {
        new SimpleSchema({propValue: schema}).validate({propValue});
      } catch(e) {
        error = e;
      }

      return error;
    };

    return createTypeChecker(schemaCheck);
  } else
    throw new Error('Parameter is not an instance of SimpleSchema');
}

function idCheck(props, propName) {
  const propValue = props[propName];
  let error = null;

  try {
    new SimpleSchema({propValue: {type: String, regEx: SimpleSchema.RegEx.Id}}).validate({propValue});
  } catch(e) {
    error = e;
  }

  return error;
}

function enumCheck(props, propName, componentName) {
  const enumValue = props[propName];
  let error = null;

  if (!_.isFunction(enumValue) || !(enumValue.prototype instanceof Enum2))
    error = new Error(`Type provided to '${componentName}' is not of type '${Enum2.constructor.name}'`);

  return error;
}

function createEnumValueChecker(enumType) {
  if(!_.isFunction(enumType) || !(enumType.prototype instanceof Enum2))
    throw new Error(`Type provided is not of type ${Enum2.constructor.name}`);

  function enumTypeCheck(props, propName, componentName) {
    const enumValue = props[propName];
    let error = null;

    if(!(enumValue instanceof enumType))
      error = new Error(`Value provided to '${componentName}' is not of type '${enumType.constructor.name}'`);

    return error;
  }

  return createTypeChecker(enumTypeCheck);
}

export const Custom = {
  PropTypes: {
    custom: createTypeChecker,
    meteorId: createTypeChecker(idCheck),
    schema: createSchemaChecker,
    enumType: createTypeChecker(enumCheck),
    enumValue: createEnumValueChecker
  }
};

export default Custom;
