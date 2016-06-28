import createSided from '../../modules/sided-function';
import {Supplier} from '../../modules/fp';
import {EmailType} from '../../modules/enums';
import {Exceptions} from '../../modules/constants';

import {Accounts} from 'meteor/accounts-base';
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

export const sendEmailToUser = createSided(new Supplier(() => sendEmailToUserMethod), ({userId, emailType, email}) => {
  email = _.isNil(email) ? null : email;
  switch(emailType) {
    case EmailType.VERIFY:
          Accounts.sendVerificationEmail(userId, email);
          break;
    case EmailType.FORGOT_PASSWORD:
          Accounts.sendResetPasswordEmail(userId, email);
          break;
    default:
          throw new Meteor.Error(Exceptions.types.invalidEmailType, Exceptions.reasons.invalidEmailTypeTemplate(emailType));
  }
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

export const sendEmailToUserMethod = new ValidatedMethod({
  name: 'user.auth.email.verify',
  validate: new SimpleSchema({
    userId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    emailType: {
      type: EmailType
    },
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      optional: true
    }
  }).validator(),
  run: sendEmailToUser
});
