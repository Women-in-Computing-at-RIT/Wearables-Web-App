import {Meteor} from 'meteor/meteor';
import {Notifications} from '../notifications';

if(Meteor.isServer) {
  Meteor.publish('notifications', () =>
    // Return Notifications for this user from newest to oldest.
    Notifications.find(
      {
        targetId: Meteor.userId(),
        timestamp: {$lte: moment().toISOString()}
      },
      {
        sort: {timestamp: -1}
      }
    )
  );
}
