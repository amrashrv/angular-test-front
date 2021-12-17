export enum TASKS_FILTER {
    all,
    active,
    completed
}

export enum REGISTER_FIELD_NAME {
  userName = 'userName',
  email = 'email',
  password = 'password',
  repeatPassword = 'repeatPassword',

}

export enum VALIDATION {
  required = 'required',
  minLength = 'minlength',
  validateEmail = 'invalidEmail',
  pattern = 'pattern',
  compare = 'unequal'
}

export enum LOGIN_FIELD_NAME {
  email = 'email',
  password = 'password'
}

export const emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
