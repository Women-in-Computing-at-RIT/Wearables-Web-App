import {composeWithTracker} from 'react-komposer';
import {Meteor} from 'meteor/meteor';

const userDataComposer = (props, onData) => onData(null, {hasUser: Meteor.user()});

/**
 * A simple helper function that creates a react-komposer composition which waits for
 * Meteor.user() to become available, stored in the hasUser property.
 *
 * Since it is fairly common to wait for User Data to become available, this function was created
 * with the idea of just plugging in a component and getting back the composition.
 *
 * @param component Component needing to wait for user data
 * @returns Result of composeWithTracker with the userDataComposer and the provided component
 */
const createUserDataContainer = (component) => composeWithTracker(userDataComposer, {}, {}, {pure: false})(component);

export {createUserDataContainer};
