import {SimpleSchema} from 'meteor/aldeed:simple-schema';

var Schemas = {};

Schemas.User = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  email: {
    type: String,
    label: "Email"
  },
  password: {
    type: String,
    label: "Password",
    min: 6
  },
  gender: {
    type: String,
    label: "Gender"
  },
  ethnicity: {
    type: String,
    label: "Ethnicity"
  },
  dateOfBirth: {
    type: Date,
    label: "Date of Birth"
  },
  phoneNumber: {
    type: Number,
    label: "Phone Number",
    min: 10,
    max: 10
  },
  deviceId: {
    type: Object,
    label: "Device Id"
  },
  familyIds: {
    type: [Object],
    label: "Family Id"
  },
  apiAuthKey: {
    type: String,
    label: "API Auth Key"
  },
  apiAuthType: {
    type: Object,
    label: "API Auth Type"
  }
});
