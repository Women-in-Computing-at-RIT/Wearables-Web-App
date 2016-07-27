import { Mongo } from 'meteor/mongo';
import Schemas from '../../modules/schemas';

export const Relationships = new Mongo.Collection('relationships');

Relationships.attachSchema(Schemas.Relationship);

Relationships.helpers({
  setType(type) {
    this.relationshipType = type;
    Relationships.update({_id: this._id}, {$set: {relationshipType: type}});
    return this;
  }
});
