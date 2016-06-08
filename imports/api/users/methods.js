/**
 * Created by Cara on 6/8/2016.
 */

Meteor.methods({
  updateProfile(profile) {
    profile = users.find(_id).profile;
    profile = _.extend(profile, updateProfile);
    Meteor.users.update(_id, {$set: {'profile': profile}});
  }
});
