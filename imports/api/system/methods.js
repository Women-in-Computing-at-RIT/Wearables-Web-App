import {Settings} from '../../modules/constants';

import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

export const fetchClientCloudinaryDetails = new ValidatedMethod({
  name: 'cloudinary.client.details',
  validate: new SimpleSchema({}).validator(),
  run: ({}) => {
    return {cloud_name: process.env[Settings.cloudinary.cloudName]};
  }
});
