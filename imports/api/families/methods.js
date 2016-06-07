import {Families} from './families';
import Schemas from '../../modules/schemas';

import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidateMethod} from 'meteor/mdg:validated-method';

const insertFamily = new ValidatedMethod({
  name: 'families.insert',
  validate: Schemas.Family.validator(),
  run(family){
    Families.insert(family);
  }
});

const updateFamily = new ValidatedMethod({
  name: 'families.update',
  validate: new SimpleSchema({
    _id: {
      type: String
    },
    'update.ids': {
      type: Array,
      optional: true,
      defaultValue: []
    },
    'update.familyName': {
      type: String,
      optional: true,
      defaultValue: null
    }
  }).validator(),
  run({_id, newIds, familyName}) {
    Families.update(_id, {
      $addToSet: {
        userIds: {
          $each: newIds
        }
      }
    });

    if(familyName !== null)
      Families.update(_id, {$set: {familyName: familyName}});
  }
});

const deleteFamily = new ValidatedMethod({
  name: 'families.remove.user',
  rvalidate: new SimpleSchema({
    _id: {type: String}
  }).validator(),
  run({_id}) {
    Meteor.users.update({familyIds: _id}, {$pull: {familyIds: _id}}, {multi: true});
  }
});

const removeUserFromFamily = new ValidatedMethod({
  name: 'families.remove.user',
  validate: new SimpleSchema({
    _id: {type: String},
    'update.userId': {type: String}
  }).validator(),
  run({_id, userId}){
    Meteor.users.update(userId, {$pull: {familyIds: _id}});
  }
});

export {removeUserFromFamily, deleteFamily, updateFamily, insertFamily};
