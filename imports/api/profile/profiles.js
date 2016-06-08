/**
 * Created by Cara on 6/8/2016.
 */

import { Mongo } from 'meteor/mongo';
import Schemas from '../../modules/schemas';

export const Profiles = new Mongo.Collection('profiles');

Profiles.attachSchema(Schemas.UserProfile);
