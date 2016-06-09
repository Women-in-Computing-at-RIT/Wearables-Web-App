/**
 * Created by Matthew on 6/9/2016.
 */
import { Mongo } from 'meteor/mongo';
import Schemas from '../../modules/schemas';

export const Notifications = new Mongo.Collection('notifications');

Notifications.attachSchema(Schemas.Notification);
