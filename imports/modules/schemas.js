import {Random} from 'meteor/random';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import {Gender, Ethnicity} from './enums';

/**
 * A centralized store for all Collection-related schemas created from the simple-schema package. The
 * Schemas are stored with the collection as the key to a schema value. e.g. a collection-schema pair for a
 * Books collection.
 * <pre><code>
 * {
 *    ...,
 *    "Books": {
 *        "title": {
 *            "type": String,
 *            ...
 *        },
 *        ...
 *    ],
 *    ...
 * }
 * </code></pre>
 * @type {{}}
 */
const Schemas = {};

Schemas.User = new SimpleSchema({
  emails: {
    type: Array
  },
  'emails.$': {
    type: Object
  },
  'emails.$.address': {
    type: String,
    max: 254,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  gender: {
    type: String,
    label: "Gender",
    max: 20,
    optional: false,
    custom: () => Gender.fromString(this.value) === null ? "Invalid gender value!" : true
  },
  ethnicity: {
    type: String,
    label: "Ethnicity",
    max: 40,
    optional: false,
    custom: () => Ethnicity.fromString(this.value) === null ? "Invalid ethnicity value!" : true
  },
  dateOfBirth: {
    type: Date,
    label: "Date of Birth",
    min: moment('1900-1-1').toDate(),
    max: () => moment().toDate(),
    optional: false
  },
  phoneNumber: {
    type: Number,
    label: "Phone Number",
    min: 13,
    max: 15,
    optional: false,
    regEx: /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g
  },
  deviceId: {
    type: Object,
    label: "Device Id",
    optional: true,
    defaultValue: null
  },
  familyIds: {
    type: [Object],
    label: "Family Ids",
    optional: true,
    defaultValue: []
  },
  apiAuthKey: {
    type: String,
    label: "API Auth Key",
    optional: true,
    defaultValue: null
  },
  apiAuthType: {
    type: Object,
    label: "API Auth Type",
    optional: true,
    defaultValue: null
  }
});

Schemas.Family = new SimpleSchema({
  familyName: {
    type: String,
    label: "Family Name",
    min: 6,
    max: 40,
    optional: false
  },
  userIds: {
    type: [Object],
    label: "User Ids",
    optional: true,
    defaultValue: []
  }
});

Schemas.Relationship = new SimpleSchema({
  relationshipType: {
    type: Object,
    label: "Relationship Type",
    optional: false
  },
  userId: {
    type: Object,
    label: "User Id",
    optional: false
  }
});

Schemas.Task = new SimpleSchema({
  taskLabel: {
    type: String,
    label: "Task",
    min: 6,
    max: 40,
    optional: false
  },
  startTime: {
    type: Date,
    label: "Start Time",
    min: () => moment().toDate(),
    max: () => moment().add(1, 'year').toDate(),
    optional: false,
    autoValue: () => this.field('min').value
  },
  endTime: {
    type: Date,
    label: "End Time",
    min: () => moment().toDate(),
    exclusiveMin: true,
    custom: () => {
      let start = moment(this.field('startTime').value);
      let end = moment(this.value);

      if(start.isSameOrAfter(end))
        return "Invalid times. Start time must be before end time!";

      return true;
    }
  },
  duration: {
    type: Number,
    decimal: false,
    label: "Duration",
    optional: true,
    autoValue: () => {
      let start = moment(this.field('startTime').value);
      let end = moment(this.field('endTime').value);

      return end.diff(start, 'seconds');
    }
  }
});

Schemas.Device = new SimpleSchema({
  logId: {
    type: String,
    label: "Log Id",
    autoValue: () => Random.id()
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
    label: "User Id",
    optional: false
  },
  timestamp: {
    type: Date,
    label: "Timestamp",
    optional: false
  },
  BPM: {
    type: Number,
    label: "BPM",
    decimal: false,
    optional: true,
    defaultValue: 0
  },
  IBI: {
    type: Number,
    decimal: false,
    label: "IBI",
    optional: true,
    defaultValue: 0
  },
  conductance: {
    type: Number,
    decimal: true,
    label: "Skin Conductance",
    optional: true,
    defaultValue: 0.0
  },
  statisticalData: {
    type: [Number],
    label: "Statistics",
    optional: true,
    defaultValue: []
  }
});

export default Schemas;
