import createSided from '../../modules/sided-function';
import {Supplier} from '../../modules/fp';

import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

export const isUserRegistered = createSided(new Supplier(() => isUserRegisteredMethod), ({userId}) => {
  let user = Meteor.users.findOne(userId);
  return !_.isNil(user) && _.find(user.emails, ({verified: verified}) => verified) >= 0;
});

export const isEmailAvailable = createSided(new Supplier(() => isEmailAvailableMethod), ({email}) => {
  return _.isNil(Meteor.users.findOne({'email.$.address': email}));
});

export const isUserRegisteredMethod = new ValidatedMethod({
  name: 'user.auth.check',
  validate: new SimpleSchema({
    userId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    }
  }).validator(),
  run: isUserRegistered
});

export const isEmailAvailableMethod = new ValidatedMethod({
  name: 'user.auth.email.check',
  validate: new SimpleSchema({
    email: {
      type: String,
      max: 254,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validator(),
  run: isEmailAvailable
});

// Meteor.methods({
//   updateProfile(profile) {
//     profile = users.find(_id).profile;
//     profile = _.extend(profile, updateProfile);
//     Meteor.users.update(_id, {$set: {'profile': profile}});
//   }
// });
