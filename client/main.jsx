_ = lodash;

import './main.html';
import '/imports/startup/client';

import {Session} from 'meteor/session';
import {Bert} from 'meteor/themeteorchef:bert';

AdminConfig = {
  name: 'Stress Monitor',
  adminEmails: ['admin@admin.com'],
  collections: {}
};

// TODO Fix IronRouter error display or write own admin panel. The current admin panel depends on IR but we use RR
/*
 Wait on a 20 ms interval for the iron router error to appear, once it appears it is removed
 and the interval is cleared, ending the check.
 */
let intervalId = setInterval(() => {
  let nexts = $('#react-root-container').next('div');

  if(nexts.length === 0)
    return;

  nexts.remove();
  clearInterval(intervalId);
}, 10);

Session.setDefault('needsVerification', false);

if(Session.get('needsVerification')) {
  Bert.alert('Cannot login, account unverified!', 'danger', 'fixed-top', 'fa-frown-o');
  Session.set('needsVerification', false);
}
