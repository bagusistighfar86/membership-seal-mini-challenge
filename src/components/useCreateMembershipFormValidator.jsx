/* eslint-disable no-shadow */
import { useState } from 'react';

import {
  nameValidator,
  addressValidator,
  handphoneValidator,
} from 'utils/createMembershipValidator';

const touchors = (ors) => Object.entries(ors).reduce((acc, [field, fieldor]) => {
  acc[field] = {
    ...fieldor,
    dirty: true,
  };
  return acc;
}, {});

const useCreateMembershipFormValidator = (form) => {
  const [ors, setors] = useState({
    name: {
      dirty: false,
      or: false,
      message: '',
    },
    address: {
      dirty: false,
      or: false,
      message: '',
    },
    handphone: {
      dirty: false,
      or: false,
      message: '',
    },
    status: {
      dirty: false,
      or: false,
      message: '',
    },
    gender: {
      dirty: false,
      or: false,
      message: '',
    },
    age: {
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
      name, address, handphone,
    } = form;

    if (nextors.name.dirty && (field ? field === 'name' : true)) {
      const nameMessage = nameValidator(name, form);
      nextors.name.or = !!nameMessage;
      nextors.name.message = nameMessage;
      if (nameMessage) isValid = false;
    }

    if (nextors.address.dirty && (field ? field === 'address' : true)) {
      const addressMessage = addressValidator(address, form);
      nextors.address.or = !!addressMessage;
      nextors.address.message = addressMessage;
      if (addressMessage) isValid = false;
    }

    if (nextors.handphone.dirty && (field ? field === 'handphone' : true)) {
      const handphoneMessage = handphoneValidator(handphone, form);
      nextors.handphone.or = !!handphoneMessage;
      nextors.handphone.message = handphoneMessage;
      if (handphoneMessage) isValid = false;
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

export default useCreateMembershipFormValidator;
