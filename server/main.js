import './migrations';

import {Meteor} from 'meteor/meteor';
import {Exceptions} from '../imports/modules/constants';

// Environment Variable Checks

if(_.isNil(process.env.MAIL_URL) && Meteor.settings.MAILGUN_DOMAIN !== '')
  process.env.MAIL_URL = `smtp://postmaster%40${Meteor.settings.MAILGUN_DOMAIN}:${Meteor.settings.MAILGUN_PASS}@smtp.mailgun.org:587`;

const cloudinaryChecks = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

_.forEach(cloudinaryChecks, (key) => {
  if(_.isNil(process.env[key]))
    if(_.isNil(Meteor.settings[key]))
      throw new Meteor.Error(Exceptions.types.missingEnvironmentSetting, Exceptions.reasons.missingEnvironmentSettingTemplate(key));
    else
      process.env[key] = Meteor.settings[key];
});

process.env.CLOUDINARY_URL = process.env.CLOUDINARY_URL || `cloudinary://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@${process.env.CLOUDINARY_CLOUD_NAME}`;

import '/imports/startup/server';
import './security';
