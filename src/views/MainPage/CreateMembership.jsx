import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, Text, VStack, chakra, FormControl, FormLabel, Input, Button, Checkbox, Select, useToast,
} from '@chakra-ui/react';
import useCreateMembershipFormValidator from 'components/useCreateMembershipFormValidator';
import { getCookie } from 'utils/setCookies';
import Layout from './Layout';

function CreateMembership() {
  const toast = useToast();

  const [form, setForm] = useState({
    name: '',
    address: '',
    handphone: '',
    age: '',
    status: false,
    gender: 1,
  });

  const { errors, validateForm, onBlurField } = useCreateMembershipFormValidator(form);

  const onUpdateField = (e) => {
    console.log(e.target.value);
    const field = e.target.name;
    const { type } = e.target;
    const nextFormState = {
      ...form,
      [field]: type === 'checkbox' ? e.target.checked : e.target.value,
    };
    setForm(nextFormState);

    if (errors[field].dirty) {
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
    }
  };

  const resetFormState = () => {
    const nextFormState = {
      name: '',
      address: '',
      handphone: '',
      age: '',
      status: false,
      gender: '',
    };
    setForm(nextFormState);
  };

  const fetchCreate = () => {
    const accessToken = getCookie('accessToken');
    axios({
      method: 'post',
      url: 'api/memberships',
      data: {
        full_name: form.name,
        address: form.address,
        phone: form.handphone,
        is_active: form.status, // Harus selalu true gabisa false
        gender: form.gender,
        age: parseInt(form.age, 10),
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      if (res) {
        // console.log(res);
        resetFormState();
        toast({
          title: 'Membership successed to create',
          position: 'top',
          status: 'success',
          isClosable: true,
        });
      }
    }).catch((err) => {
      console.log(err);
      toast({
        title: 'Membership failed to create',
        position: 'top',
        status: 'error',
        isClosable: true,
      });
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    fetchCreate();
  };

  return (
    <Layout>
      <Box minH="100vh" pt={32} px={5}>
        <VStack
          alignItems="start"
          w={{
            base: '100%',
            md: '80%',
            xl: '50%',
          }}
        >
          <chakra.form w="100%" onSubmit={onSubmitForm}>
            <FormControl mb={5}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                onBlur={onBlurField}
                onChange={onUpdateField}
                value={form.name}
                border="none"
                borderRadius={0}
                borderBottom="2px solid black"
              />
              {errors.name.dirty && errors.name.error ? (
                <Text color="red">{errors.name.message}</Text>
              ) : null}
            </FormControl>
            <FormControl mb={5}>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                name="address"
                onBlur={onBlurField}
                onChange={onUpdateField}
                value={form.address}
                border="none"
                borderRadius={0}
                borderBottom="2px solid black"
              />
              {errors.address.dirty && errors.address.error ? (
                <Text color="red">{errors.address.message}</Text>
              ) : null}
            </FormControl>
            <FormControl mb={5}>
              <FormLabel>Handphone</FormLabel>
              <Input
                type="text"
                name="handphone"
                onBlur={onBlurField}
                onChange={onUpdateField}
                value={form.handphone}
                border="none"
                borderRadius={0}
                borderBottom="2px solid black"
              />
              {errors.handphone.dirty && errors.handphone.error ? (
                <Text color="red">{errors.handphone.message}</Text>
              ) : null}
            </FormControl>
            <Checkbox
              name="status"
              isChecked={form.status}
              onChange={onUpdateField}
              mb={5}
              fontWeight="bold"
            >
              Status
            </Checkbox>
            <FormControl
              mb={5}
              w={{
                base: '50%',
                sm: '35%',
                lg: '30%',
              }}
            >
              <FormLabel>Gender</FormLabel>
              <Select name="gender" placeholder="Select gender" onChange={onUpdateField} value={form.gender}>
                <option value="L">Laki - Laki</option>
                <option value="P">Perempuan</option>
              </Select>
            </FormControl>
            <FormControl mb={10}>
              <FormLabel>Age</FormLabel>
              <Input
                type="number"
                name="age"
                onChange={onUpdateField}
                value={form.age}
                border="none"
                borderRadius={0}
                borderBottom="2px solid black"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" variant="solid" w="100%">Create</Button>
          </chakra.form>
        </VStack>
      </Box>
    </Layout>
  );
}

export default CreateMembership;
