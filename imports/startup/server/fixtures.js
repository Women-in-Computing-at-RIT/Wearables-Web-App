import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {Accounts} from 'meteor/accounts-base';

import {Gender, Ethnicity} from '../../modules/enums';

const users = [
  {
    email: 'admin@admin.com',
    password: 'qwerty123',
    customProps: {
      gender: Gender.MALE.shorthand,
      ethnicity: Ethnicity.CAUCASIAN.name,
      dateOfBirth: moment().toDate(),
      phoneNumber: '518-555-0184',
      deviceId: null,
      familyIds: [],
      apiAuthKey: null,
      apiAuthType: null
    },
    profile: {
      name: {
        first: 'Ad', mi: null, last: 'Min'
      }
    },
    roles: ['admin']
  }
];

users.forEach(({email, pwd, customProps, prof, roles}) => {
  const userExists = Meteor.users.findOne({'emails.address': email});

  if(!userExists) {
    const userId = Accounts.createUser({email, pwd, prof});

    Meteor.users.update(userId, {
      $set: customProps
    });

    Roles.addUsersToRoles(userId, roles);
  }
});
