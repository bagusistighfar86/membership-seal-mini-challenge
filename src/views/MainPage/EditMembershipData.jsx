import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, FormControl, FormLabel, Input, Link, Text, VStack, chakra, Checkbox, Select, HStack, useToast, Center, Spinner,
} from '@chakra-ui/react';
import { Link as ReachLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useCreateMembershipFormValidator from 'components/useCreateMembershipFormValidator';
import { getCookie } from 'utils/setCookies';
import Layout from './Layout';

function EditMembershipData() {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const detailUrl = `https://challenge.madjou.com/api/memberships/${id}`;

  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState({
    name: '',
    address: '',
    handphone: '',
    age: '',
    status: false,
    gender: '',
  });

  const [formBeforeEdit, setFormBeforeEdit] = useState({
    name: '',
    address: '',
    handphone: '',
    age: '',
    status: false,
    gender: '',
  });

  const { ors, validateForm, onBlurField } = useCreateMembershipFormValidator(form);

  const getMemberDetail = () => {
    const accessToken = getCookie('accessToken');
    axios({
      method: 'get',
      url: detailUrl,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      if (res) {
        const nextFormState = {
          name: res.data.data.full_name,
          address: res.data.data.address,
          handphone: res.data.data.phone,
          age: res.data.data.age,
          status: res.data.data.is_active,
          gender: res.data.data.gender,
        };
        setForm(nextFormState);
        setFormBeforeEdit(nextFormState);
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    getMemberDetail();
  }, []);

  const onUpdateField = (e) => {
    const field = e.target.name;
    const { type } = e.target;
    const nextFormState = {
      ...form,
      [field]: type === 'checkbox' ? e.target.checked : e.target.value,
    };
    setForm(nextFormState);
    if (ors[field].dirty) {
      validateForm({
        form: nextFormState,
        ors,
        field,
      });
    }
  };

  const handleCancelEdit = () => {
    const nextFormState = {
      name: formBeforeEdit.name,
      address: formBeforeEdit.address,
      handphone: formBeforeEdit.handphone,
      age: formBeforeEdit.age,
      status: formBeforeEdit.status,
      gender: formBeforeEdit.gender,
    };
    setForm(nextFormState);
  };

  const handleSaveEditForm = () => {
    const accessToken = getCookie('accessToken');
    axios({
      method: 'post',
      url: `api/memberships/${id}`,
      data: {
        full_name: form.name,
        address: form.address,
        phone: form.handphone,
        is_active: form.status,
        gender: form.gender,
        age: parseInt(form.age, 10),
        _method: 'PUT',
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      if (res) {
        // (res);
        navigate(-1);
        toast({
          title: 'Membership successed to edit',
          position: 'top',
          status: 'success',
          isClosable: true,
        });
      }
    }).catch(() => {
      toast({
        title: 'Membership failed to edit',
        position: 'top',
        status: 'or',
        isClosable: true,
      });
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const { isValid } = validateForm({ form, ors, forceTouchors: true });
    if (!isValid) return;
    handleSaveEditForm();
  };

  return (
    <Layout>
      {(isLoading)
        ? (
          <Center minH="100vh" pt={32} px={5}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        )
        : (
          <Box minH="100vh" pt={32} px={5} left="300px">
            <Link
              as={ReachLink}
              to="/"
              onClick={() => navigate('/')}
              display="flex"
              alignItems="center"
              fontSize="xl"
              fontWeight="500"
              _hover={{
                textDecor: 'none',
                color: '#AFAFAF',
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} fontSize="3xl" />
              <Text ms={3}>Back</Text>
            </Link>

            <VStack
              my={10}
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
                    bordadius={0}
                    borderBottom="2px solid black"
                  />
                  {ors.name.dirty && ors.name.or ? (
                    <Text color="red">{ors.name.message}</Text>
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
                    bordadius={0}
                    borderBottom="2px solid black"
                  />
                  {ors.address.dirty && ors.address.or ? (
                    <Text color="red">{ors.address.message}</Text>
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
                    bordadius={0}
                    borderBottom="2px solid black"
                  />
                  {ors.handphone.dirty && ors.handphone.or ? (
                    <Text color="red">{ors.handphone.message}</Text>
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
                  <Select name="gender" placeholder="Select gender" value={form.gender} onChange={onUpdateField}>
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
                    bordadius={0}
                    borderBottom="2px solid black"
                  />
                </FormControl>
                <HStack spacing={2}>
                  <Button
                    as={ReachLink}
                    to="/membership"
                    type="button"
                    colorScheme="red"
                    variant="solid"
                    px={6}
                    onClick={() => handleCancelEdit()}
                  >
                    Cancel
                  </Button>
                  <Button
                    to="."
                    type="submit"
                    colorScheme="blue"
                    variant="solid"
                    px={6}
                  >
                    Save
                  </Button>
                </HStack>
              </chakra.form>
            </VStack>
          </Box>
        )}
    </Layout>
  );
}

export default EditMembershipData;
