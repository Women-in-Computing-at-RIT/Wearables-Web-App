import {Meteor} from 'meteor/meteor';
import {Notifications} from './notifications';

export const NotifPublications = {
  user: {
    all: 'notifications.all'
  }
};

if(Meteor.isServer) {
  Meteor.publish(NotifPublications.user.all, function() {
    if(!this.userId)
      return this.ready();
      // Return Notifications for this user from newest to oldest.
    return Notifications.find( //eslint-disable-line lodash/prefer-lodash-method
      {
        targetId: this.userId,
        timestamp: {$lte: moment().toISOString()}
      },
      {
        sort: {timestamp: -1}
      }
    );
    }
  );
}
