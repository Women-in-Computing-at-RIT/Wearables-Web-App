import {EJSON} from 'meteor/ejson';
import {Gender, Ethnicity, FamilyRelationship, NotificationType} from '../../modules/enums';

/*
  Registering custom type serialization with Meteor using EJSON. The requirements for registering is that the
  given type have a typeName function, a toJSONValue function (returning a valid JSON value, e.g. a String value)
  and that a factory be defined taking that JSON Value and converting it back to the appropriate instance.

  Registering a type with EJSON means that type can be sent to and retrieved from the database with no additional
  work.
 */

// For the most part it seems typeName can be a static function quite easily.
EJSON.addType(FamilyRelationship.typeName(), (jsonValue) => FamilyRelationship.fromString(jsonValue));
EJSON.addType(Ethnicity.typeName(), (jsonValue) => Ethnicity.fromString(jsonValue));
EJSON.addType(Gender.typeName(), (jsonValue) => Gender.fromString(jsonValue));
EJSON.addType(NotificationType.typeName(), NotificationType.fromJSONValue);
