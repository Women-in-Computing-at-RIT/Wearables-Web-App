import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {Meteor} from 'meteor/meteor';

import {App} from '../../ui/layouts/app';

const requireAuth = (next, repl) => {
  if (!Meteor.loggingIn() && !Meteor.userId())
    repl({
      pathname: '/login',
      state: {nextPathname: next.location.pathname}
    });
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        
      </Route>
    </Router>
  );
});
