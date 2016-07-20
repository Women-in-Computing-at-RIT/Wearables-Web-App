import {Families} from './families';
import Schemas from '../../modules/schemas';

import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

const insertFamily = new ValidatedMethod({
  name: 'families.insert',
  validate: Schemas.Family.validator(),
  run(family){
    Families.insert(family);
  }
});

/**
 * Structure:
 * <pre><code>
 *     _id: ID of Family to Modify
 *     update: {
 *        relationships: [...Relationship Objects...],
 *        familyName: New Name of Family
 *     }
 * </code></pre>
 * Relationships and FamilyName are both optional
 */
const updateFamily = new ValidatedMethod({
  name: 'families.update',
  validate: new SimpleSchema({
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    'update.relationships': {
      type: Array,
      optional: true,
      defaultValue: []
    },
    'update.relationships.$': {
      type: Schemas.Relationship
    },
    'update.familyName': {
      type: String,
      optional: true,
      defaultValue: null
    }
  }).validator(),
  run({_id, update: {relationships, familyName}}) {

    // Isolate User IDs from relationships
    // Map the relationship to a pair [toId, fromId] and then take the union of all of those (which is a flatten+unique)
    let userIds = _.chain(relationships).map((r) => [r.toId, r.fromId]).union().value(); //eslint-disable-line lodash/chain-style

    // Update Family with new ids (if not already in list)
    if(userIds.size > 0)
      Families.update(_id, {
        $addToSet: {
          userIds: {
            $each: [...userIds]
          }
        }
      });

    // TODO Restrict to parents only
    // If familyName is provided, update the name
    if(familyName !== null)
      Families.update(_id, {$set: {familyName: familyName}});
  }
});

const deleteFamily = new ValidatedMethod({
  name: 'families.remove.all',
  validate: new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id}
  }).validator(),
  run({_id}) {
    Meteor.users.update({familyIds: _id}, {$pull: {familyIds: _id}}, {multi: true});
    Families.remove(_id);
  }
});

const removeUserFromFamily = new ValidatedMethod({
  name: 'families.remove.user',
  validate: new SimpleSchema({
    _id: {type: String},
    userId: {type: String}
  }).validator(),
  run({_id, userId}){
    // Remove family reference from user and then User reference from family
    Meteor.users.update(userId, {$pull: {familyIds: _id}});
    Families.update(_id, {$pull: {userIds: userId}});
  }
});

export {removeUserFromFamily, deleteFamily, updateFamily, insertFamily};
