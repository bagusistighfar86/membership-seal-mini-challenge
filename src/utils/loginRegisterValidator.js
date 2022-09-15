export const nameValidator = (name) => {
  if (!name) {
    return 'Name is required';
  }
  return '';
};

export const emailValidator = (email) => {
  const emailRgx = /\S+@\S+\.\S+/;

  if (!email) {
    return 'Email is required';
  } if (!email.match(emailRgx)) {
    return 'Incorrect email format';
  }
  return '';
};

export const passwordValidator = (password) => {
  if (!password) {
    return 'Password is required';
  } if (password.length < 8) {
    return 'Password must have a minimum 8 characters';
  }
  return '';
};

export const confirmPasswordValidator = (confirmPassword, form) => {
  if (!confirmPassword) {
    return 'Confirm password is required';
  } if (confirmPassword.length < 8) {
    return 'Confirm password must have a minimum 8 characters';
  } if (confirmPassword !== form.password) {
    return 'Passwords do not match';
  }
  return '';
};
