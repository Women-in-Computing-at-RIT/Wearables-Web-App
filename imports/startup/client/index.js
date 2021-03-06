import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './subscriptions';
import './routes';

import {Bert} from 'meteor/themeteorchef:bert';
import {Selectors, App} from '/imports/modules/constants';
import {fetchClientCloudinaryDetails} from '/imports/api/system/methods';

Bert.defaults.style = 'growl-bottom-right';

Meteor.startup(() => {
  fetchClientCloudinaryDetails.call({}, (err, result) => {
    if(_.isNil(err))
      $.cloudinary.config(result);
    else
      console.error(err);
  });

  AdminConfig = {
    name: App.name,
    adminEmails: App.adminEmails,
    collections: {}
  };
});

// TODO Fix IronRouter error display or write own admin panel. The current admin panel depends on IR but we use RR
/*
 Wait on a 20 ms interval for the iron router error to appear, once it appears it is removed
 and the interval is cleared, ending the check.
 */
const intervalId = setInterval(() => {
  const nexts = $(Selectors.reactMountPoint).next(Selectors.bug.ironRouter);

  if(nexts.length === 0)
    return;

  // We also happen to have a style element in the head created by something with bootstrap.
  // It essentially does the same as our css file import but causes loading issues, so it is removed as well.
  //
  // It is stored in the last style tag in the head, if this statement is removed.
  $(Selectors.rogueBootstrapStyle).remove();
  nexts.remove();
  clearInterval(intervalId);
}, 10);
