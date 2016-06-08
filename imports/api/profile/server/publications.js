/**
 * Created by Cara on 6/8/2016.
 */
import {Meteor} from 'meteor/meteor';
import {Profiles} from '../profiles';

Meteor.publish('profiles', () => Profiles.find());
