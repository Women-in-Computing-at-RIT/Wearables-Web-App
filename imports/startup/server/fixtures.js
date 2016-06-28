import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {Accounts} from 'meteor/accounts-base';

import Schemas from '../../modules/schemas';
import {Gender, Ethnicity} from '../../modules/enums';

// Setup user validation using custom schema
Meteor.users.attachSchema(Schemas.User);

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
      deviceId: null,
      familyIds: [],
      apiAuthKey: null,
      apiAuthType: null
    },
    profile: {
      firstName: "Ad",
      lastName: "Min",
      gender: Gender.MALE,
      ethnicity: Ethnicity.CAUCASIAN,
      dateOfBirth: moment().toDate(),
      phoneNumber: '518-555-0184'
    },
    roles: ['admin']
  },
  {
    email: 'unverified@unverified.com',
    password: 'qwerty123',
    customProps: {
      deviceId: null,
      familyIds: [],
      apiAuthKey: null,
      apiAuthType: null
    },
    profile: {
      firstName: 'Alana',
      lastName: 'Turing',
      gender: Gender.FEMALE,
      ethnicity: Ethnicity.ASIAN,
      dateOfBirth: moment().toDate(),
      phoneNumber: '508-222-3123'
    },
    roles: []
  }
];

// Add each fixture to the database if that fixture does not aleady exist in the database
_.forEach(users, (fixture) => {

  let {email, password, customProps, profile, roles} = fixture;

  const userExists = Meteor.users.findOne({'emails.address': email});

  if (!userExists) {
    console.log("FIXTURE ADDED:");
    console.log(fixture);
    const userId = Accounts.createUser({email: email, password: password, profile: profile});

    Meteor.users.update(userId, {
      $set: customProps
    });

    Roles.addUsersToRoles(userId, roles, Roles.GLOBAL_GROUP);
  }
});
