import '/imports/startup/server';
import './security';
import {Meteor} from 'meteor/meteor';

/**
 * Temporary fix to remove users
 */
// if(Meteor.isServer) {
//   Meteor.methods({
//     clearUsers: function () {
//       Meteor.users.remove({});
//     }
//   });
// }
