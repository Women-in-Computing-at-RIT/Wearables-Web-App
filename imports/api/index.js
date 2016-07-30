import './families/methods';
import './notifications/methods';
import './relationships/methods';
import './system/methods';
import './users/methods';

import './families/publications';
import './notifications/publications';
import './relationships/publications';

import {Meteor} from 'meteor/meteor';

import {Api} from '/imports/modules/constants';
import {UserAccess} from '/imports/modules/utility/user-utils';

import {Families} from './families/families';
import {Relationships} from './relationships/relationships';
import {Notifications} from './notifications/notifications';

export {Families, Relationships, Notifications};

if(Meteor.isServer) {
  /* eslint-disable camelcase */
  const StressApi_v0 = new Restivus({
    apiPath: Api.v0.base,
    version: Api.v0.version,
    auth: {
      token: Api.all.apiUserTokenPath,
      user: () => {
        return {
          userId: this.request.headers[Api.all.idHeader],
          token: this.request.headers[Api.all.tokenHeader]
        };
      }
    },
    onLoggedIn() {
      const user = new UserAccess(this.user);
      console.log(`User '${user.nameAsTitle}' accessed ${Api.displayName} ${this.version}.`);
    },
    onLoggedOut() {
      const user = new UserAccess(this.user);
      console.log(`User '${user.nameAsTitle}' logged out of ${Api.displayName} ${this.version}.`);
    },
    prettyJson: true
  });

  StressApi_v0.addCollection(Meteor.users, {
    excludedEndpoints: ['getAll', 'put'],
    routeOptions: {
      authRequired: true
    },
    endpoints: {
      post: {
        authRequired: true
      },
      delete: {
        roleRequired: 'admin'
      }
    }
  });

  /* eslint-enable */
}
