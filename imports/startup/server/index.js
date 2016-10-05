import {Meteor} from 'meteor/meteor';

import './accounts/email-templates';
import './fixtures';
import '../../api/index';
import './api';
import './serialization';

import {Settings} from '../../modules/constants';

// Initialize the Admin Site config, this is a globally available value (hence no let/const/var)
AdminConfig = {
  adminEmails: ['admin@admin.com'],
  collections: {}
};

Meteor.startup(() => {
  Cloudinary.config({
    cloud_name: process.env[Settings.cloudinary.cloudName],
    api_key: process.env[Settings.cloudinary.apiKey],
    api_secret: process.env[Settings.cloudinary.apiSecret]
  });

  Migrations.migrateTo('latest');
});
