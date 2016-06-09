import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

import {Relationships} from './relationships';
import {FamilyRelationship} from '../../modules/enums';

const relationshipArgsSchema = new SimpleSchema({
  to: {
    type: String,
    RegEx: SimpleSchema.RegEx.Id,
    optional: false,
    custom: () => this.value === this.fields['from'].value ? 'Cannot have a relationship with self' : true
  },
  from: {
    type: String,
    RegEx: SimpleSchema.RegEx.id,
    optional: false,
    custom: () => this.value === this.fields['to'].value ? 'Cannot have a relationship with self' : true
  },
  type: {
    type: FamilyRelationship,
    optional: false
  }
});

const createRelationship = new ValidatedMethod({
  name: 'relationship.create',
  validate: relationshipArgsSchema.validator(),
  run({to, from, type}) {
    Relationships.insert({
      fromId: from,
      toId: to,
      relationshipType: type
    });
  }
});

const changeRelationship = new ValidatedMethod({
  name: 'relationship.update',
  validate: relationshipArgsSchema.validator(),
  run({to, from, type}) {
    Relationships.update({toId: to, fromId: from}, {$set: {relationshipType: type}});
  }
});

const deleteRelationship = new ValidatedMethod({
  name: 'relationship.delete',
  validate: new SimpleSchema({
    to: relationshipArgsSchema.to,
    from: relationshipArgsSchema.from
  }).validator(),
  run({to, from}) {
    Relationships.remove({toId: to, fromId: from});
  }
});


export {createRelationship, changeRelationship, deleteRelationship};
