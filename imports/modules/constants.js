import {Meteor} from 'meteor/meteor'

/**
 * Usable with PubSub/EventBus as the "message" parameter, these are publications topics that can be subscribed
 * and published to.
 *
 * @type {{auth: {modal: string, passwordVerify: string}}}
 */
export const Topics = {
  auth: {
    modal: 'auth.modal',
    passwordVerify: 'auth.password.verification'
  }
};

/**
 * Error messages specific to Email Validation.
 *
 * @type {{required: string, invalid: string}}
 */
export const EmailErrors = {
  required: 'An email address is required',
  invalid: 'Email address is invalid'
};

/**
 * Error messages specific to Password Validation.
 *
 * @type {{required: string, mismatch: string, tooWeak: string}}
 */
export const PasswordErrors = {
  required: 'A password is required',
  mismatch: 'Password confirmation is incorrect',
  tooWeak: 'Password is too weak'
};

/**
 * Error messages specific to user.profile fields. Primarily for validation.
 *
 * @type {{firstName: {required: string, rangelength: string, minlength: string, maxlength: string}, lastName: {required: string, rangelength: string, minlength: string, maxlength: string}}}
 */
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

// since minlength and maxlength will have the same error messages,
// extends each field to have a minlength, maxlength message that is the same as rangelength
ProfileErrors.firstName = _.assignIn(ProfileErrors.firstName, {
  minlength: ProfileErrors.firstName.rangelength,
  maxlength: ProfileErrors.firstName.rangelength
});

ProfileErrors.lastName = _.assignIn(ProfileErrors.lastName, {
  minlength: ProfileErrors.lastName.rangelength,
  maxlength: ProfileErrors.lastName.rangelength
});

/**
 * Error messages specific to validation errors
 * @type {{email: {required: string, invalid: string}, password: {required: string, mismatch: string, tooWeak: string}, profile: {firstName: {required: string, rangelength: string, minlength: string, maxlength: string}, lastName: {required: string, rangelength: string, minlength: string, maxlength: string}}}}
 */
export const ValidationErrors = {
  email: EmailErrors,
  password: PasswordErrors,
  profile: ProfileErrors
};

/**
 * Types of errors for Meteor.Error error types
 * @type {{invalidEmailType: string, missingSetting: string, missingEnvironment: string, missingEnvironmentSetting: string}}
 */
export const ExceptionTypes = {
  invalidEmailType: 'Email Type Invalid',
  missingSetting: 'Missing Setting',
  missingEnvironment: 'Missing Env Variable',
  missingEnvironmentSetting: 'Missing Setting and Env Variable',
  wrongSide: 'Wrong Side',
  doesNotExist: 'Does Not Exist'
};

/**
 * Error messages for Meteor.Error reasons. Generally these are reasons and have "template" strings that are functions taking
 * other strings to fill in missing information.
 * @type {{invalidEmailType: string, invalidEmailTypeTemplate: (function(): string), missingSetting: string, missingSettingTemplate: (function(): string), missingEnvironment: string, missingEnvironmentTemplate: (function(): string), missingEnvironmentSetting: string, missingEnvironmentSettingTemplate: (function(): string)}}
 */
export const ExceptionReasons = {
  invalidEmailType: 'The given email type is invalid!',
  invalidEmailTypeTemplate: (emailType = "\<NOT PROVIDED\>") => `The given email, ${String(emailType)}, is not a valid email type!`,
  missingSetting: 'Missing a setting in settings.json!',
  missingSettingTemplate: (settingName = "\<NOT PROVIDED\>") => `${settingName} not declared in settings.json!`,
  missingEnvironment: 'Missing environment variable!',
  missingEnvironmentTemplate: (envName = "\<NOT PROVIDED\>") => `${envName} not set!`,
  missingEnvironmentSetting: 'Missing environment variable with no alternative supplied in settings!',
  missingEnvironmentSettingTemplate: (name = "\<NOT PROVIDED\>") => `${name} not set in environment variables and no alternative exists in settings.json`,
  get wrongSide(){
    return `Code executed on ${Meteor.isServer ? 'server' : 'client'} but is ${Meteor.isServer ? 'client' : 'server'}-only`;
  },
  doesNotExist: 'The desired resource does not exist!',
  doesNotExistTemplate: (what) => `${what} does not exist!`
};

/**
 * Exception types and reasons for Meteor.Errors (or normal errors).
 * @type {{types: {invalidEmailType: string, missingSetting: string, missingEnvironment: string, missingEnvironmentSetting: string}, reasons: {invalidEmailType: string, invalidEmailTypeTemplate: (function(): string), missingSetting: string, missingSettingTemplate: (function(): string), missingEnvironment: string, missingEnvironmentTemplate: (function(): string), missingEnvironmentSetting: string, missingEnvironmentSettingTemplate: (function(): string)}}}
 */
export const Exceptions = {
  types: ExceptionTypes,
  reasons: ExceptionReasons
};

/**
 * All types of errors, Exceptions (Meteor.Error and normal Error), Validation Errors, etc.
 * @type {{exceptions: {types: {invalidEmailType: string, missingSetting: string, missingEnvironment: string, missingEnvironmentSetting: string}, reasons: {invalidEmailType: string, invalidEmailTypeTemplate: (function(): string), missingSetting: string, missingSettingTemplate: (function(): string), missingEnvironment: string, missingEnvironmentTemplate: (function(): string), missingEnvironmentSetting: string, missingEnvironmentSettingTemplate: (function(): string)}}, validation: {email: {required: string, invalid: string}, password: {required: string, mismatch: string, tooWeak: string}, profile: {firstName: {required: string, rangelength: string, minlength: string, maxlength: string}, lastName: {required: string, rangelength: string, minlength: string, maxlength: string}}}}}
 */
export const Errors = {
  exceptions: Exceptions,
  validation: ValidationErrors
};

/**
 * App Metadata
 * @type {{name: string, version: string, domain: string, siteDictionary: string[], auth: {minPwdStrength: number}}}
 */
export const App = {
  name: 'StressMonitor',
  version: '1.0.0',
  domain: 'monitor.com',
  siteDictionary: ['stress', 'monitor'],
  auth: {
    minPwdStrength: 2
  }
};

/**
 * Email Details for App
 * @type {{email: string, support: string, noreply: string}}
 */
export const EmailInfo = {
  email: `stress@${App.domain}`,
  support: `support@${App.domain}`,
  noreply: `do-not-reply@${App.domain}`
};

EmailInfo.fromEmail = `${App.name} <${EmailInfo.email}>`;
EmailInfo.fromSupport = `${App.name} Support <${EmailInfo.support}>`;
EmailInfo.noreply = `${App.name} Do Not Reply <${EmailInfo.noreply}>`;

App.email = EmailInfo;

/**
 * Explicit and template urls for React-Router Route paths.
 * @type {{index: string, homepage: string, unverified: string, info: string, schedule: string, contact: string, resetPassword: string}}
 */
export const Routes = {
  index: '/',
  homepage: '/home',
  unverified: '/unverified',
  info: '/info',
  schedule: '/schedule',
  contact: '/contact',
  resetPassword: '/password/reset'
};

// URL Lookup
Routes.mapPathToName = (path) => _.findKey(Routes, (value) => value === path);  // Object Search for Key
Routes.mapNameToPath = (name) => _.find(Routes, (value, key) => key === name);  // Collection Search for Value

// URL Lookup aliases
Routes.reverse = Routes.reverseLookup = Routes.lookupReverse = Routes.mapPathToName;
Routes.lookup = Routes.mapNameToPath;

/**
 * All constants, namespaced accordingly.
 */
export const All = {
  app: App,
  topics: Topics,
  errors: Errors,
  routes: Routes
};

export default All;
