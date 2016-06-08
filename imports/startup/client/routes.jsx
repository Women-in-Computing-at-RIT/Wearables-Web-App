import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {Meteor} from 'meteor/meteor';

import {App} from '../../ui/layouts/app';
import {Index} from '../../ui/pages/index';
import {Info} from '../../ui/pages/information';
import {NotFound} from '../../ui/pages/not-found';

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
      <Route path="/" component={ App } onEnter={ redirectAuth('/home') }>
        <IndexRoute name="index" component={Index}/>
        <Route name="info" path="/info" component={Info}/>
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
