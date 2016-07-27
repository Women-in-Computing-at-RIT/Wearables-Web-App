// File describing all migrations and their upward/downward changes
// for API Usage Information see https://github.com/percolatestudio/meteor-migrations

import {Meteor} from 'meteor/meteor';
import {ImageResources} from '../imports/modules/constants';

/* eslint-disable lodash/prefer-lodash-method */
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

  Migrations.add({
    version: 2,
    name: 'Move api details from root user object to a stressApi sub-document',
    up: () => {
      const users = Meteor.users.find().fetch();

      _(users)
        .thru((user) => {
          user.stressApi = {
            apiKey: user.apiAuthKey,
            apiAuthType: user.apiAuthType
          };

          delete user.apiAuthKey;
          delete user.apiAuthType;

          return user;
      }).forEach((user) => Meteor.users.update({_id: user._id}, {
        $unset: {
          apiAuthKey: "",
          apiAuthType: ""
        },
        $set: {
          stressApi: user.stressApi
        }
      }, {multi: true}));
    },
    down() {
      const users = Meteor.users.find().fetch();

      _(users)
        .thru((user) => {
          user.apiAuthKey = user.stressApi.apiKey;
          user.apiAuthType = user.stressApi.apiAuthType;

          delete user.stressApi;
          return user;
        }).forEach((user) => Meteor.users.update({_id: user._id}, {
        $unset: {
          stressApi: ""
        },
        $set: {
          apiAuthKey: user.apiAuthKey,
          apiAuthType: user.apiAuthType
        }
      }, {validate: false, multi: true}));
    }
  });
}
/* eslint-enable */
