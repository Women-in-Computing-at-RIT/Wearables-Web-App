import {Accounts} from 'meteor/accounts-base';
import {check} from 'meteor/check';

/**
 * Returns an action if and only if the user with the given email is verified and an actual account. If the
 * user is not verified or does not exist then a constant function is returned that returns the notVerifiedValue
 * which defaults to the empty object.
 *
 * @param {Function} action The action to return if and only if the user exists and is verified
 * @param {String} email The email of the user to check (and the email to check verification for)
 * @param {*} [notVerifiedValue={}] Return value of the constant function returned if and only if the user doesn't exist or that email is not verified.
 * @returns {Function} Either the action or a constant function returning "not verified value"
 * @author Matthew Crocco
 */
function onlyIfUserVerified(action, email, notVerifiedValue = {}) {
  check(action, Function);
  check(email, String);

  const user = Accounts.findUserByEmail(email);

  if(!_.isNil(user)) {
    const emailObject = _.find(user.emails, ({address}) => address === email);
    if (!_.isNil(emailObject) && emailObject.verified)
      return action;
  }

  return () => notVerifiedValue;
}

/**
 * Does the same as {@link onlyIfUserVerified} only with the user being check being the currently logged in user. The
 * email that is check is the first email in the user's emails array.
 *
 * It is worth noting, this function does NOT call {@link onlyIfUserVerified} and instead direclty accesses the currently
 * authenticated user.
 *
 * @param {Function} action The action to return if and only if the current user's first email is verified
 * @param {*} [notVerifiedValue = {}] The value the constant function returns if the current user is not verified
 * @returns {Function} Either the action or a constant function returning "not verified value"
 * @author Matthew Crocco
 */
function onlyIfVerified(action, notVerifiedValue = {}) {
  check(action, Function);

  const user = Meteor.users.findOne({_id: Meteor.userId()});

  if(!_.isNil(user) && user.emails.length > 0 && user.emails[0].verified)
    return action;

  return () => notVerifiedValue;
}

export {onlyIfUserVerified, onlyIfVerified};
export default onlyIfVerified;
