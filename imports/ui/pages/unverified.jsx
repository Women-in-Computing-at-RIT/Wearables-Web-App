import React from 'react';

import {Bert} from 'meteor/themeteorchef:bert';

import {Jumbotron} from 'react-bootstrap';

import {App} from '../../modules/constants';
import {UserAccess} from '../../modules/utility/user-utils';
import {EmailType} from '../../modules/enums';

import {createUserDataContainer} from '../containers/simple';

export class UnverifiedPageInterface extends React.Component {
  render() {
    if(_.isNil(this.props.hasUser))
      return <div></div>;

    const user = new UserAccess(this.props.hasUser);

    const resendVerification = () => {
      user.sendEmail(EmailType.VERIFY, _.noop);
      // Accounts.sendVerificationEmail(Meteor.userId());
      Bert.alert(`Verification email resent to ${user.primaryEmail}!`, 'success');
    };

    return (
      <div>
        <Jumbotron className="text-center"><h2>Thank you, <strong>{user.nameAsTitle}</strong> for signing up!</h2></Jumbotron>
        <section>
          <p>
            An email has been sent to <strong>{user.primaryEmail}</strong> to verify your email address.
            Please click on the link provided in the email to verify your account.
            Once you are verified you will be able to access your account information and statistics.
          </p>
          <p>
            If you are verified and still can't access the site then please send an email
            to <strong>{App.email.support}</strong> and we will resolve the problem!
          </p>
          <p>
            If you have not received a verification email, <a onClick={resendVerification}>click here to resend the verification email</a>.
          </p>
        </section>
        {/*<PageHeader>Uh oh, {user.name}!<small> It appears your account is unverified.</small></PageHeader>
        <section>
          <p>
            In order to access the site properly you must verify your email is correct by going to {user.primaryEmail} and
            use the provided link to verify yourself. Once you are verified you can freely access the site and manage your statistics!
          </p>
          <p>
            If you are verified and still can't access the site then please send an email to {App.email.support} and we will resolve
            the problem!
          </p>
          <p>
            If you have not received a verification email, <a onClick={resendVerification}>click here to resend the verification email</a>.
          </p>
        </section>*/}
      </div>
    );
  }
}

export const UnverifiedPage = createUserDataContainer(UnverifiedPageInterface);

