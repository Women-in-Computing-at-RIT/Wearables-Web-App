export const Topics = {
  auth: {
    modal: 'auth.modal',
    passwordVerify: 'auth.password.verification'
  }
};

export const EmailErrors = {
  required: 'An email address is required',
  invalid: 'Email address is invalid'
};

export const PasswordErrors = {
  required: 'A password is required',
  mismatch: 'Password confirmation is incorrect',
  tooWeak: 'Password is too weak'
};

export const ProfileErrors = {
  firstName: {
    required: 'First Name is required',
    rangelength: 'First Name must be between 1 and 40 characters'
  },
  lastName: {
    required: 'Last Name is required',
    rangelength: 'Last Name must be between 3 and 40 characters'
  }
};

ProfileErrors.firstName = _.assignIn(ProfileErrors.firstName, {
  minlength: ProfileErrors.firstName.rangelength,
  maxlength: ProfileErrors.firstName.rangelength
});

ProfileErrors.lastName = _.assignIn(ProfileErrors.lastName, {
  minlength: ProfileErrors.lastName.rangelength,
  maxlength: ProfileErrors.lastName.rangelength
});

export const ValidationErrors = {
  email: EmailErrors,
  password: PasswordErrors,
  profile: ProfileErrors
};

export const ExceptionTypes = {
  invalidEmailType: 'Email Type Invalid',
  missingSetting: 'Missing Setting',
  missingEnvironment: 'Missing Env Variable',
  missingEnvironmentSetting: 'Missing Setting and Env Variable'
};

export const ExceptionReasons = {
  invalidEmailType: 'The given email type is invalid!',
  invalidEmailTypeTemplate: (emailType) => `The given email, ${String(emailType)}, is not a valid email type!`,
  missingSetting: 'Missing a setting in settings.json!',
  missingSettingTemplate: (settingName) => `${settingName} not declared in settings.json!`,
  missingEnvironment: 'Missing environment variable!',
  missingEnvironmentTemplate: (envName) => `${envName} not set!`,
  missingEnvironmentSetting: 'Missing environment variable with no alternative supplied in settings!',
  missingEnvironmentSettingTemplate: (name) => `${name} not set in environment variables and no alternative exists in settings.json`
};

export const Exceptions = {
  types: ExceptionTypes,
  reasons: ExceptionReasons
};

export const Errors = {
  exceptions: Exceptions,
  validation: ValidationErrors
};

export const App = {
  name: 'StressMonitor',
  version: '1.0.0',
  domain: 'monitor.com',
  siteDictionary: ['stress', 'monitor'],
  auth: {
    minPwdStrength: 2
  }
};

export const EmailInfo = {
  email: `stress@${App.domain}`,
  support: `support@${App.domain}`,
  noreply: `do-not-reply@${App.domain}`
};

EmailInfo.fromEmail = `${App.name} <${EmailInfo.email}>`;
EmailInfo.fromSupport = `${App.name} Support <${EmailInfo.support}>`;
EmailInfo.noreply = `${App.name} Do Not Reply <${EmailInfo.noreply}>`;

App.email = EmailInfo;

export default {
  app: App,
  topics: Topics,
  errors: Errors
};
