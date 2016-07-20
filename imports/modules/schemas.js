/**
 * file: schemas.js
 * authors: Matthew Crocco, Cara Steinberg
 */

import {Random} from 'meteor/random';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import {ImageResources} from './constants';
import {Gender, Ethnicity, FamilyRelationship, NotificationType} from './enums';

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

Schemas.UserProfile = new SimpleSchema({
  firstName: {
    type: String,
    optional: false,
    min: 1,
    max: 40
  },
  lastName: {
    type: String,
    optional: false,
    min: 3,
    max: 40
  },
  dateOfBirth: {
    type: Date,
    label: "Date of Birth",
    min: moment('01-01-1990', 'MM-DD-YYYY').toDate(),
    max: () => moment().toDate(),
    optional: true
  },
  gender: {
    type: Gender,
    label: "Gender",
    blackbox: true,
    optional: true,
    defaultValue: Gender.MALE
  },
  ethnicity: {
    type: Ethnicity,
    label: "Ethnicity",
    blackbox: true,
    optional: true,
    defaultValue: Ethnicity.CAUCASIAN
  },
  phoneNumber: {
    type: String,
    label: "Phone Number",
    optional: true,
    regEx: /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g
  },
  profileImage: {
    type: String,
    autoValue: (isSet, unset, value, operator, field) => {
      if(isSet)
        return;

      const {value: genderValue} = field('gender');
      return ImageResources.profile.defaultProfileImageUrl(genderValue);
    }
  }
});

Schemas.User = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: Array
  },
  'emails.$': {
    type: Object,
    optional: true
  },
  'emails.$.address': {
    type: String,
    max: 254,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: Schemas.UserProfile,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true
  },
  heartbeat: {
    type: Date,
    optional: true
  },
  deviceId: {
    type: String,
    label: "Device Id",
    optional: true,
    defaultValue: null
  },
  familyIds: {
    type: [String],
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
    type: [String],
    label: "User Ids",
    optional: true,
    defaultValue: []
  }
});

Schemas.Relationship = new SimpleSchema({
  relationshipType: {
    type: FamilyRelationship,
    label: "Relationship Type",
    optional: false
  },
  fromId: {
    type: String,
    label: "User Id",
    optional: false
  },
  toId: {
    type: String,
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
    type: String,
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

Schemas.Notification = new SimpleSchema({
  timestamp: {
    type: Date,
    optional: false,
    autoValue: () => moment().toDate()
  },
  targetId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: false
  },
  type: {
    type: NotificationType,
    optional: false
  },
  data: {
    type: Object,
    optional: true,
    blackbox: true,
    defaultValue: {}
  }
});

Schemas.GlobalNotification = Schemas.Notification.pick('timestamp', 'type', 'data');

export default Schemas;
export {Schemas};
