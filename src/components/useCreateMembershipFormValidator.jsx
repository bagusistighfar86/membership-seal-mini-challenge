/* eslint-disable no-shadow */
import { useState } from 'react';

import {
  nameValidator,
  addressValidator,
  handphoneValidator,
} from 'utils/createMembershipValidator';

const touchErrors = (errors) => Object.entries(errors).reduce((acc, [field, fieldError]) => {
  acc[field] = {
    ...fieldError,
    dirty: true,
  };
  return acc;
}, {});

const useCreateMembershipFormValidator = (form) => {
  const [errors, setErrors] = useState({
    name: {
      dirty: false,
      error: false,
      message: '',
    },
    address: {
      dirty: false,
      error: false,
      message: '',
    },
    handphone: {
      dirty: false,
      error: false,
      message: '',
    },
    status: {
      dirty: false,
      error: false,
      message: '',
    },
    gender: {
      dirty: false,
      error: false,
      message: '',
    },
    age: {
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
      name, address, handphone,
    } = form;

    if (nextErrors.name.dirty && (field ? field === 'name' : true)) {
      const nameMessage = nameValidator(name, form);
      nextErrors.name.error = !!nameMessage;
      nextErrors.name.message = nameMessage;
      if (nameMessage) isValid = false;
    }

    if (nextErrors.address.dirty && (field ? field === 'address' : true)) {
      const addressMessage = addressValidator(address, form);
      nextErrors.address.error = !!addressMessage;
      nextErrors.address.message = addressMessage;
      if (addressMessage) isValid = false;
    }

    if (nextErrors.handphone.dirty && (field ? field === 'handphone' : true)) {
      const handphoneMessage = handphoneValidator(handphone, form);
      nextErrors.handphone.error = !!handphoneMessage;
      nextErrors.handphone.message = handphoneMessage;
      if (handphoneMessage) isValid = false;
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

export default useCreateMembershipFormValidator;
