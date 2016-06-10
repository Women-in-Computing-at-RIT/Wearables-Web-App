import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

import {Supplier} from './fp';

/**
 * A function that takes arguments as an object a callback function, a {@link ValidatedMethod}, or
 * a {@link Supplier} supplying either of those two types.
 *
 * @typedef {function(Object, Function)|Supplier|ValidatedMethod} SidedCallee
 */

/**
 * Creates a function that executes one of two functions depending on what side we are on currently,
 * client or server.
 *
 * @param {SidedCallee} client
 * @param {SidedCallee} server
 * @return {function(Object, function|null)} A function that determines side, takes arguments and callback and calls
 * the appropriate side function.
 */
function createSided(client, server) {
  return (args, cb = null) => {
    if(Meteor.isClient) {
      const clientFn = client instanceof Supplier ? client.get.value : client;
      if(clientFn instanceof ValidatedMethod)
        clientFn.call(args, cb);
      else
        clientFn(args, cb);
    } else {
      const serverFn = server instanceof Supplier ? server.get.value : server;
      if(serverFn instanceof ValidatedMethod) {
        // Methods should not be called server side! that was the point of this class!
        console.error(new TypeError("Should not call Method on Server!"));
        serverFn.call(args, cb);
      } else
        serverFn(args, cb);
    }
  };
}

export default createSided;
