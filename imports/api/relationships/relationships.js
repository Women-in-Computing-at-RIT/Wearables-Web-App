import { Mongo } from 'meteor/mongo';
import Schemas from '../../modules/schemas';

export const Relationships = new Mongo.Collection('relationships');

Relationships.attachSchema(Schemas.Relationship);
