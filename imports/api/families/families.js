import { Mongo } from 'meteor/mongo';
import Schemas from '../../modules/schemas';

export const Families = new Mongo.Collection('families');

Families.attachSchema(Schemas.Family);
