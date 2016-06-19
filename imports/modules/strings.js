
export const Topics = {
  auth: {
    modal: 'auth.modal'
  }
};

export const EmailMessages = {
  required: 'An email address is required',
  invalid: 'Email address is invalid'
};

export const PasswordMessages = {
  required: 'A password is required',
  mismatch: 'Password confirmation is incorrect'
};

export const ValidationMessages = {
  email: EmailMessages,
  password: PasswordMessages
};

export const Messages = {
  validation: ValidationMessages
};

export default {
  topics: Topics,
  messages: Messages
};
