import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {Meteor} from 'meteor/meteor';

import {App} from '../../ui/layouts/app';
import {Index} from '../../ui/pages/index';
import {CreateProfile} from '../../ui/pages/information';
import {NotFound} from '../../ui/pages/not-found';
import {ContactPage} from '../../ui/pages/contact';
import {ForgotPassword} from '../../ui/pages/forgot-password';
import {ResetPassword} from '../../ui/pages/reset-password';
import {HomePage} from '../../ui/pages/home';
import {ProfilePage} from '../../ui/pages/profile';
import {Schedule} from '../../ui/pages/schedule';

/**
 * An onEnter action that requires the user accessing that route to be authenticated. If the user is not authenticated
 * they are redirected to a login page.
 *
 * @param {Object} next An object defining the next state, provided by Meteor.
 * @param {Function} repl A function specifying a redirection/change, provided by Meteor.
 */
const requireAuth = (next, repl) => {
  if (!Meteor.loggingIn() && !Meteor.userId())
    repl({
      pathname: '/login',
      state: {nextPathname: next.location.pathname}
    });
};

/**
 * An onEnter action that specifies that a user should be redirected if they are authenticated.
 *
 * @param {String} to The path to redirect to if user is authenticated
 * @return {Function} The redirecting function that handles redirection to the given path.
 */
const redirectAuth = (to) => (next, repl) => {
  if (Meteor.userId() !== null)
    repl({
      pathname: to,
      state: {nextPathname: next.location.pathname}
    });
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <Route name="homePage" path="/home" component={HomePage}/>
        <IndexRoute name="index" component={Index} onEnter={ redirectAuth('/home')}/>
        <Route name="index" path="/" component={Index} onEnter={ redirectAuth('/home')}/>
        <Route name="info" path="/info" component={CreateProfile}/>
        <Route name="contact" path="/contact" component={ContactPage}/>
        <Route name="forgotPassword" path="/forgotPassword" component={ForgotPassword}/>
        <Route name="resetPassword" path="/resetPassword" component={ResetPassword}/>
        <Route name="profilePage" path="/profile" component={ProfilePage}/>
        <Route name="schedule" path="/schedule" component={Schedule}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
    , document.getElementById('react-root-container'));

  // TODO Fix IronRouter error display or write own admin panel. The current admin panel depends on IR but we use RR
  /*
    Wait on a 20 ms interval for the iron router error to appear, once it appears it is removed
    and the interval is cleared, ending the check.
   */
  let intervalId = setInterval(() => {
    let nexts = $('#react-root-container').next('div');

    if(nexts.length === 0)
      return;

    nexts.remove();
    clearInterval(intervalId);
  }, 20);
});
