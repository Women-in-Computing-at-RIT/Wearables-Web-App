/**
 * Created by Matthew on 6/9/2016.
 */
import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Schemas from '../../modules/schemas';

export const Notifications = new Mongo.Collection('notifications');

Notifications.attachSchema(Schemas.Notification);

if(Meteor.isClient) {
  Notifications.helpers({
    notify({remove = true}) {
      // TODO Post Notification

      Notifications.remove({_id: this._id});
    }
  });
}
