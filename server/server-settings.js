import {Meteor} from 'meteor/meteor';
import {Exceptions, App} from '../imports/modules/constants';

// Environment Variable Checks

if(_.isNil(process.env.MAIL_URL) && Meteor.settings.MAILGUN_DOMAIN !== '')
  process.env.MAIL_URL = `smtp://postmaster%40${Meteor.settings.MAILGUN_DOMAIN}:${Meteor.settings.MAILGUN_PASS}@smtp.mailgun.org:587`;

const CloudinaryKeys = App.settings.cloudinary;

if(_.isNil(process.env[CloudinaryKeys.url])) {
  const cloudinaryChecks = CloudinaryKeys.urlComponents;

  _.forEach(cloudinaryChecks, (key) => {
    if (_.isNil(process.env[key]))
      if (_.isNil(Meteor.settings[key]))
        throw new Meteor.Error(Exceptions.types.missingEnvironmentSetting, Exceptions.reasons.missingEnvironmentSettingTemplate(key));
      else
        process.env[key] = Meteor.settings[key];
  });

  process.env[CloudinaryKeys.url] =
    CloudinaryKeys.protocol +
    process.env[CloudinaryKeys.apiKey] + CloudinaryKeys.credentialSeparator + process.env[CloudinaryKeys.apiSecret] +
    CloudinaryKeys.domainSeparator + process.env[CloudinaryKeys.cloudName];
} else {
  const noProtocolUrl = process.env[CloudinaryKeys.url].substring(CloudinaryKeys.protocol.length);

  const keySecretSeparator = noProtocolUrl.lastIndexOf(CloudinaryKeys.credentialSeparator);
  const domainSeparator = noProtocolUrl.lastIndexOf(CloudinaryKeys.domainSeparator);

  if(keySecretSeparator <= 0 || domainSeparator <= 0 || domainSeparator <= keySecretSeparator)
    throw new Meteor.Error(Exceptions.types.invalidSetting, Exceptions.reasons.invalidCloudinaryUrl);

  const components = {};

  components[CloudinaryKeys.apiKey] = noProtocolUrl.substring(0, keySecretSeparator);
  components[CloudinaryKeys.apiSecret] = noProtocolUrl.substring(keySecretSeparator + 1, domainSeparator);
  components[CloudinaryKeys.cloudName] = noProtocolUrl.substring(domainSeparator + 1);

  _.assignIn(process.env, components);
}

if(_.isNil(process.env[CloudinaryKeys.version])) {
  if(_.isNil(Meteor.settings[CloudinaryKeys.version]))
    throw new Meteor.Error(Exceptions.types.missingEnvironmentSetting, Exceptions.reasons.missingEnvironmentSettingTemplate(CloudinaryKeys.version));

  process.env[CloudinaryKeys.version] = Meteor.settings[CloudinaryKeys.version];
}
