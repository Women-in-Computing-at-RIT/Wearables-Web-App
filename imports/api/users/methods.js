import {EmailType} from '../../modules/enums';
import {Exceptions} from '../../modules/constants';

import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

const sendEmail = (userId, emailType, email) => {
  if(!Meteor.isServer)
    throw new Meteor.Error(Exceptions.types.wrongSide, Exceptions.reasons.wrongSide);

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
};

export const isUserRegisteredMethod = new ValidatedMethod({
  name: 'user.auth.check',
  validate: new SimpleSchema({
    userId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    }
  }).validator(),
  run: ({userId}) => {
    let user = Meteor.users.findOne(userId);
    return !_.isNil(user) && _.find(user.emails, ({verified: verified}) => verified) >= 0;
  }
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
  run: ({email}) => _.isNil(Meteor.users.findOne({'email.$.address': email}))
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
  run: ({userId, emailType, email}) => {
    email = _.isNil(email) ? null : email;
    sendEmail(userId, emailType, email);
  }
});

export const sendEmailToUserByEmailMethod = new ValidatedMethod({
  name: 'user.auth.password.forgot',
  validate: new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    },
    emailType: {
      type: Object,
      blackbox: true,
      custom: () => this.value instanceof EmailType
    }
  }).validator(),
  applyOptions: {
    throwStubExceptions: false
  },
  run: ({email, emailType}) => {
    const user = Accounts.findUserByEmail(email);

    if(_.isNil(user))
      throw new Meteor.Error(Exceptions.types.doesNotExist, Exceptions.reasons.doesNotExistTemplate(`User for ${email}`));

    sendEmail(user._id, emailType, email);
  }
});

export const getUserByEmailMethod = new ValidatedMethod({
    name: 'user.auth.find.email',
    validate: new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validator(),
    run: ({email}) => Accounts.findUserByEmail(email)
  }
);
