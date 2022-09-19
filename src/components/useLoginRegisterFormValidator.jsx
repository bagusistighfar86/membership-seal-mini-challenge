/* eslint-disable no-shadow */
import { useState } from 'react';

import {
  nameValidator,
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
} from 'utils/loginRegisterValidator';

const touchors = (ors) => Object.entries(ors).reduce((acc, [field, fieldor]) => {
  acc[field] = {
    ...fieldor,
    dirty: true,
  };
  return acc;
}, {});

const useLoginFormValidator = (form) => {
  const [ors, setors] = useState({
    email: {
      dirty: false,
      or: false,
      message: '',
    },
    password: {
      dirty: false,
      or: false,
      message: '',
    },
  });

  const validateForm = ({
    form, field, ors, forceTouchors = false,
  }) => {
    let isValid = true;

    // Create a deep copy of the ors
    let nextors = JSON.parse(JSON.stringify(ors));

    // Force validate all the fields
    if (forceTouchors) {
      nextors = touchors(ors);
    }

    const {
      email, password,
    } = form;

    if (nextors.email.dirty && (field ? field === 'email' : true)) {
      const emailMessage = emailValidator(email, form);
      nextors.email.or = !!emailMessage;
      nextors.email.message = emailMessage;
      if (emailMessage) isValid = false;
    }

    if (nextors.password.dirty && (field ? field === 'password' : true)) {
      const passwordMessage = passwordValidator(password, form);
      nextors.password.or = !!passwordMessage;
      nextors.password.message = passwordMessage;
      if (passwordMessage) isValid = false;
    }

    setors(nextors);

    return {
      isValid,
      ors: nextors,
    };
  };

  const onBlurField = (e) => {
    const field = e.target.name;
    const fieldor = ors[field];
    if (fieldor.dirty) return;

    const updatedors = {
      ...ors,
      [field]: {
        ...ors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, ors: updatedors });
  };

  return {
    validateForm,
    onBlurField,
    ors,
  };
};

const useRegisterFormValidator = (form) => {
  const [ors, setors] = useState({
    name: {
      dirty: false,
      or: false,
      message: '',
    },
    email: {
      dirty: false,
      or: false,
      message: '',
    },
    password: {
      dirty: false,
      or: false,
      message: '',
    },
    confirmPassword: {
      dirty: false,
      or: false,
      message: '',
    },
  });

  const validateForm = ({
    form, field, ors, forceTouchors = false,
  }) => {
    let isValid = true;

    // Create a deep copy of the ors
    let nextors = JSON.parse(JSON.stringify(ors));

    // Force validate all the fields
    if (forceTouchors) {
      nextors = touchors(ors);
    }

    const {
      name, email, password, confirmPassword,
    } = form;

    if (nextors.name.dirty && (field ? field === 'name' : true)) {
      const nameMessage = nameValidator(name, form);
      nextors.name.or = !!nameMessage;
      nextors.name.message = nameMessage;
      if (nameMessage) isValid = false;
    }

    if (nextors.email.dirty && (field ? field === 'email' : true)) {
      const emailMessage = emailValidator(email, form);
      nextors.email.or = !!emailMessage;
      nextors.email.message = emailMessage;
      if (emailMessage) isValid = false;
    }

    if (nextors.password.dirty && (field ? field === 'password' : true)) {
      const passwordMessage = passwordValidator(password, form);
      nextors.password.or = !!passwordMessage;
      nextors.password.message = passwordMessage;
      if (passwordMessage) isValid = false;
    }

    if (
      nextors.confirmPassword.dirty
      && (field ? field === 'confirmPassword' : true)
    ) {
      const confirmPasswordMessage = confirmPasswordValidator(
        confirmPassword,
        form,
      );
      nextors.confirmPassword.or = !!confirmPasswordMessage;
      nextors.confirmPassword.message = confirmPasswordMessage;
      if (confirmPasswordMessage) isValid = false;
    }

    setors(nextors);

    return {
      isValid,
      ors: nextors,
    };
  };

  const onBlurField = (e) => {
    const field = e.target.name;
    const fieldor = ors[field];
    if (fieldor.dirty) return;

    const updatedors = {
      ...ors,
      [field]: {
        ...ors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, ors: updatedors });
  };

  return {
    validateForm,
    onBlurField,
    ors,
  };
};

export { useLoginFormValidator, useRegisterFormValidator };
