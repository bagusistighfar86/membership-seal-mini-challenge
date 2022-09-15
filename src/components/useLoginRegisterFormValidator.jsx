/* eslint-disable no-shadow */
import { useState } from 'react';

import {
  nameValidator,
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
} from 'utils/loginRegisterValidator';

const touchErrors = (errors) => Object.entries(errors).reduce((acc, [field, fieldError]) => {
  acc[field] = {
    ...fieldError,
    dirty: true,
  };
  return acc;
}, {});

const useLoginFormValidator = (form) => {
  const [errors, setErrors] = useState({
    email: {
      dirty: false,
      error: false,
      message: '',
    },
    password: {
      dirty: false,
      error: false,
      message: '',
    },
  });

  const validateForm = ({
    form, field, errors, forceTouchErrors = false,
  }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const {
      email, password,
    } = form;

    if (nextErrors.email.dirty && (field ? field === 'email' : true)) {
      const emailMessage = emailValidator(email, form);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      if (emailMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (field ? field === 'password' : true)) {
      const passwordMessage = passwordValidator(password, form);
      nextErrors.password.error = !!passwordMessage;
      nextErrors.password.message = passwordMessage;
      if (passwordMessage) isValid = false;
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = (e) => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};

const useRegisterFormValidator = (form) => {
  const [errors, setErrors] = useState({
    name: {
      dirty: false,
      error: false,
      message: '',
    },
    email: {
      dirty: false,
      error: false,
      message: '',
    },
    password: {
      dirty: false,
      error: false,
      message: '',
    },
    confirmPassword: {
      dirty: false,
      error: false,
      message: '',
    },
  });

  const validateForm = ({
    form, field, errors, forceTouchErrors = false,
  }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const {
      name, email, password, confirmPassword,
    } = form;

    if (nextErrors.name.dirty && (field ? field === 'name' : true)) {
      const nameMessage = nameValidator(name, form);
      nextErrors.name.error = !!nameMessage;
      nextErrors.name.message = nameMessage;
      if (nameMessage) isValid = false;
    }

    if (nextErrors.email.dirty && (field ? field === 'email' : true)) {
      const emailMessage = emailValidator(email, form);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      console.log(isValid);
      if (emailMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (field ? field === 'password' : true)) {
      const passwordMessage = passwordValidator(password, form);
      nextErrors.password.error = !!passwordMessage;
      nextErrors.password.message = passwordMessage;
      if (passwordMessage) isValid = false;
    }

    if (
      nextErrors.confirmPassword.dirty
      && (field ? field === 'confirmPassword' : true)
    ) {
      const confirmPasswordMessage = confirmPasswordValidator(
        confirmPassword,
        form,
      );
      nextErrors.confirmPassword.error = !!confirmPasswordMessage;
      nextErrors.confirmPassword.message = confirmPasswordMessage;
      if (confirmPasswordMessage) isValid = false;
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = (e) => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};

export { useLoginFormValidator, useRegisterFormValidator };
