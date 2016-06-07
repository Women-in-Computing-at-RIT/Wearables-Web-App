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
    label: "Family Ids"
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

Schemas.Family = new SimpleSchema({
  familyName: {
    type: "String",
    label: "Family Name"
  },
  familyId: {
    type: Object,
    label: "Family Id"
  },
  userIds: {
    type: [Object],
    label: "User Ids"
  }
});

Schemas.Relationship = new SimpleSchema({
  relationshipType: {
    type: String,
    label: "Relationship Type"
  },
  userId: {
    type: Object,
    label: "User Id"
  }
});

Schemas.Task = new SimpleSchema({
  taskLabel: {
    type: String,
    label: "Task"
  },
  startTime: {
    type: Date,
    label: "Start Time"
  },
  endTime: {
    type: Date,
    label: "End Time"
  },
  duration: {
    type: Date,
    label: "Duration"
  }
});

Schemas.Device = new SimpleSchema({
  deviceId: {
    type: Object,
    label: "Device Id"
  },
  logId: {
    type: String,
    label: "Log Id"
  },
  status: {
    type: Object,
    label: "Status"
  },
  version: {
    type: String,
    label: "Version"
  }
});

Schemas.HealthData = new SimpleSchema({
  userId: {
    type: Object,
    label: "User Id"
  },
  timestamp: {
    type: Date,
    label: "Timestamp"
  },
  BPM: {
    type: Number,
    label: "BPM"
  },
  IBI: {
    type: Number,
    label: "IBI"
  },
  conductance: {
    type: Number,
    label: "Skin Conductance"
  },
  statisticalData: {
    type: Number,
    label: "Statistics"
  }
});
