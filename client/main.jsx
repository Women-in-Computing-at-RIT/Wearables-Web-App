_ = lodash;

import './main.html';
import '/imports/startup/client';

import {Bert} from 'meteor/themeteorchef:bert';
import {Selectors} from '/imports/modules/constants';
import {fetchClientCloudinaryDetails} from '/imports/api/system/methods';

Meteor.startup(() => {
  $.cloudinary.config(fetchClientCloudinaryDetails.call({}));

  AdminConfig = {
    name: 'Stress Monitor',
    adminEmails: ['admin@admin.com'],
    collections: {}
  };
});
console.log(Selectors.reactMountPointNoHash);
// TODO Fix IronRouter error display or write own admin panel. The current admin panel depends on IR but we use RR
/*
 Wait on a 20 ms interval for the iron router error to appear, once it appears it is removed
 and the interval is cleared, ending the check.
 */
let intervalId = setInterval(() => {
  let nexts = $(Selectors.reactMountPoint).next(Selectors.bug.ironRouter);

  if(nexts.length === 0)
    return;

  nexts.remove();
  clearInterval(intervalId);
}, 10);
