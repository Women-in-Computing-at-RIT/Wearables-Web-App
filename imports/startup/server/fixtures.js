import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {Accounts} from 'meteor/accounts-base';

import Schemas from '../../modules/schemas';
import {Gender, Ethnicity} from '../../modules/enums';

// Setup user validation using custom schema
Accounts.validateNewUser((user) => Schemas.User.validate(user));

/**
 * A list of fixtures to add to the database on loading. An email, password, profile and roles must be specified.
 * customProps must also be specified and specifically attaches new properties and values to the User object, these
 * should be a part of Schema and should be valid according to the Schema. The roles should be valid according to the
 * roles package!
 *
 * The User object is simply extended with these properties in the database.
 *
 * @type {{}[]}
 */
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

// Add each fixture to the database if that fixture does not aleady exist in the database
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
