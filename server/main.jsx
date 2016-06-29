import {Meteor} from 'meteor/meteor';
import {Exceptions} from '../imports/modules/constants';

// Environment Variable Checks

if(_.isNil(process.env.MAIL_URL) && Meteor.settings.MAILGUN_DOMAIN !== '')
  process.env.MAIL_URL = `smtp://postmaster%40${Meteor.settings.MAILGUN_DOMAIN}:${Meteor.settings.MAILGUN_PASS}@smtp.mailgun.org:587`;

if(_.isNil(process.env.CLOUDINARY_URL))
  if(_.isNil(Meteor.settings.CLOUDINARY_URL))
    throw new Meteor.Error(Exceptions.types.missingEnvironmentSetting, Exceptions.reasons.missingEnvironmentSettingTemplate('CLOUDINARY_URL'));
  else
    process.env.CLOUDINARY_URL = Meteor.settings.CLOUDINARY_URL;

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

import '/imports/startup/server';
import './security';
