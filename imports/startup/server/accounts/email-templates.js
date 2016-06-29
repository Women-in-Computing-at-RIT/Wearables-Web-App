import {Accounts} from 'meteor/accounts-base';
import {SSR} from 'meteor/meteorhacks:ssr';

import {App} from '../../../modules/constants';
import {UserAccess} from '../../../modules/user-utils';

SSR.compileTemplate("verifyEmail", Assets.getText('email-templates/verification.html'));
const emailTemplates = Accounts.emailTemplates;

emailTemplates.siteName = App.domain;
emailTemplates.from = App.email.fromEmail;

emailTemplates.verifyEmail = {
  subject() {
    return `[${App.name}] Email Registration Confirmation`;
  },

  text(user, url) {
    const userAccess = new UserAccess(user);
    const urlWithoutHash = url.replace('#/', '');
    return SSR.render('verifyEmail', {name: userAccess.name, email: userAccess.primaryEmail, link: urlWithoutHash, supportEmail: App.email.support});
  }
};

emailTemplates.resetPassword = {
  subject() {
    return `[${App.name}] Reset Your Password`;
  },
  text(user, url) {
    const userEmail = user.emails[0].address;
    url = url.replace('/#', '');

    return "A password reset has been requested for the account related to this email address ("
      +  userEmail + "). To reset the password, visit the following link:\n\n"
      + url + "\n\n If you did not request this reset, please ignore this email." +
      " If you feel something is wrong, please contact our support team: <" + email + ">"
  }
};

Accounts.config({
  sendVerificationEmail: true
});
