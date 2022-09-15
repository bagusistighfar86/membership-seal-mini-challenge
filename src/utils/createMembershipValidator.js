export const nameValidator = (name) => {
  if (!name) {
    return 'Name is required';
  }
  return '';
};

export const addressValidator = (address) => {
  if (!address) {
    return 'Address is required';
  }
  return '';
};

export const handphoneValidator = (password) => {
  if (!password) {
    return 'Handphone is required';
  }
  return '';
};
