import {Families} from './families';
import Schemas from '../../modules/schemas';

import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidateMethod} from 'meteor/mdg:validated-method';

const insertFamily = new ValidatedMethod({
  name: 'families.insert',
  validate: Schemas.Family.validator(),
  run: (family) => Families.insert(family)
});

const updateFamily = new ValidatedMethod({
  name: 'families.update',
  validate: new SimpleSchema({
    _id: {
      type: String
    },
    'update.ids': {
      type: Array
    }
  }).validator(),
  run({_id, newIds}) {
    Families.update(_id, {$addToSet: {userIds: {$each: newIds}}})
  }
});

