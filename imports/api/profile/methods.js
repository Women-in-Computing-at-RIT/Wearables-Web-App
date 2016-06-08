/**
 * Created by Cara on 6/8/2016.
 */

import {Profiles} from './profiles';
import Schemas from '../../modules/schemas';

import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

const insertProfile = new ValidatedMethod({
  name: 'profiles.insert',
  validate: Schemas.UserProfile.validator(),
  run(profile) {
    Profiles.insert(profile);
  }
});

const updateProfile = new ValidatedMethod({
  name: 'profiles.update',
  validate: new SimpleSchema({
    _id: {type: String},
    'update.firstName': {
      type: String,
      optional: true
    },
    'update.lastName': {
      type: String,
      optional: true
    },
    'update.dateOfBirth': {
      type: Date,
      optional: true
    },
    'update.gender': {
      type: String,
      optional: true
    },
    'update.ethnicity': {
      type: String,
      optional: true
    },
    'update.phoneNumber': {
      type: Number,
      optional: true
    }
  }).validator(),
  run({_id, }) {
    Profiles.update(_id, );
  }
});

const deleteProfile = new ValidatedMethod({
  name: 'profiles.delete',
  validate: new SimpleSchema({
    _id: {type: String}
  }).validator(),
  run({_id}) {
    Profiles.delete(_id);
  }
});

export {insertProfile, updateProfile, deleteProfile};
