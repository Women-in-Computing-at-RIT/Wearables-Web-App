// File describing all migrations and their upward/downward changes
// for API Usage Information see https://github.com/percolatestudio/meteor-migrations

import {Meteor} from 'meteor/meteor';
import {ImageResources} from '../imports/modules/constants';

if(Meteor.isServer) {
  Migrations.config({
    log: true,
    logIfLatest: false
  });

  Migrations.add({
    version: 1,
    name: 'Adds profileImage field to every user if not already there. Uses the id `Default/default_<gender-name>`.',
    up: () => {
      const users = Meteor.users.find().fetch(); //eslint-disable-line

      _(users)
        .filter((u) => _.isNil(u.profile.profileImage))
        .forEach((user) => {
        const gender = user.profile.gender;

        Meteor.users.update({_id: user._id}, {
          $set: {
            'profile.profileImage': ImageResources.profile.defaultProfileImageUrl(gender)
          }
        });
      });
    },
    down: () => Meteor.users.update({}, {$unset: {'profile.profileImage': ""}}, {validate: false, multi: true})
  });
}
