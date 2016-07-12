import {Meteor} from 'meteor/meteor';

import './accounts/email-templates';
import './api';
import './fixtures';
import './serialization';

// Initialize the Admin Site config, this is a globally available value (hence no let/const/var)
AdminConfig = {
  adminEmails: ['admin@admin.com'],
  collections: {}
};

Meteor.startup(() => {
  Migrations.migrateTo('latest');
});
