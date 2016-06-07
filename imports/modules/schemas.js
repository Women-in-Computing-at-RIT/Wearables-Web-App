import {Random} from 'meteor/random';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

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
export const Schemas = {};

Schemas.User = new SimpleSchema({
  gender: {
    type: String,
    label: "Gender",
    max: 20,
    optional: false
  },
  ethnicity: {
    type: String,
    label: "Ethnicity",
    max: 40,
    optional: false
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
