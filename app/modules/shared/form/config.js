export const ERROR_COLOR = '#9f3a38'

export const FORM = {
  INPUT_WRAP: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5
  },
  ERROR_STYLE: {
    marginTop: 5,
    color: ERROR_COLOR,
    fontSize: 13
  },
  TEXTINPUT_STYLE: {
    height: 35,
    width: 230,
    padding: 5,
    fontSize: 14
  }
}

export const SIGNIN_FORM = {
  name: 'signin',
  submitText: 'SIGN IN',
  fields: [
    {
      name: 'email',
      keyboardType: 'email-address',
      placeholder: 'Email *',
      autoCapitalize: 'none'
    },
    { name: 'password',
      secureTextEntry: true,
      placeholder: 'Password *'
    }
  ],
  validate: values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Enter email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Enter a valid email'
    }
    if (!values.password) {
      errors.password = 'Enter password'
    }
    return errors
  }
}

export const REGISTER_FORM = {
  name: 'register',
  submitText: 'REGISTER',
  fields: [
    {
      name: 'username',
      placeholder: 'User name *',
      autoCapitalize: 'none'
    },
    {
      name: 'email',
      keyboardType: 'email-address',
      placeholder: 'Email *',
      autoCapitalize: 'none'
    },
    {
      name: 'password',
      secureTextEntry: true,
      placeholder: 'Password *'
    }
  ],
  validate: values => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Enter user name'
    }
    if (!values.email) {
      errors.email = 'Enter email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Enter a valid email'
    }
    if (!values.password) {
      errors.password = 'Enter password'
    }
    return errors
  }
}
