/**
 * Created by Cara on 6/8/2016.
 */
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

import Schemas from '../../modules/schemas';

export const updateUserProfile = new ValidatedMethod({
  name: 'user.profile.update',
  validate: Schemas.UserProfile.validator(),
  run(profUpdates) {
    let userProfile = Meteor.user().profile;
    _.extend(userProfile, profUpdates);
    Meteor.users.update(Meteor.userId(), {$set: {'profile': userProfile}});
  }
});

// Meteor.methods({
//   updateProfile(profile) {
//     profile = users.find(_id).profile;
//     profile = _.extend(profile, updateProfile);
//     Meteor.users.update(_id, {$set: {'profile': profile}});
//   }
// });
