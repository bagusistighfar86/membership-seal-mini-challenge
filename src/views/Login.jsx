import React, { useState } from 'react';
import {
  Box, Button, Container, Flex, FormControl, FormLabel, Image, Input, Text, VStack, chakra, HStack, Heading, Link, InputGroup, InputRightElement, useToast,
} from '@chakra-ui/react';
import { Link as ReachLink, useNavigate } from 'react-router-dom';
import LogoSeal from 'assets/logo-seal.png';
import LogoKM from 'assets/logo-km.png';
import { useLoginFormValidator } from 'components/useLoginRegisterFormValidator';
import WallpaperLogin from 'assets/wallpaper-login.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { setCookie } from 'utils/setCookies';

function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { errors, validateForm, onBlurField } = useLoginFormValidator(form);

  const onUpdateField = (e) => {
    const field = e.target.name;
    const nextFormState = {
      ...form,
      [field]: e.target.value,
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
      email: '',
      password: '',
    };
    setForm(nextFormState);
  };

  const fetchLogin = () => {
    axios({
      method: 'post',
      url: 'api/login',
      data: {
        email: form.email,
        password: form.password,
      },
    }).then((res) => {
      if (res) {
        console.log(res);
        setCookie('accessToken', res.data.data.access_token, 30);
        resetFormState();
        navigate('/create-membership');
        toast({
          title: 'Login Successed',
          position: 'top',
          status: 'success',
          isClosable: true,
        });
      }
    }).catch((err) => {
      console.log(err);
      toast({
        title: 'Failed Login',
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
    fetchLogin();
  };

  return (
    <Container maxW="100%" h="100vh" p={0}>
      <Flex width="100%" h="100vh">
        <Box
          flexBasis="50%"
          bgImage={WallpaperLogin}
          bgSize="cover"
          bgPos="-100px"
          display={{
            base: 'none',
            md: 'block',
          }}
        >
          <Flex h="100vh" justifyContent="center" alignItems="center">
            <HStack h="100px" p={5} spacing={8} justifyContent="center">
              <Image h="100%" src={LogoKM} />
              <Image h="100%" src={LogoSeal} />
            </HStack>
          </Flex>
        </Box>
        <Box
          flexBasis={{
            base: '100%',
            md: '50%',
          }}
        >
          <Container>
            <VStack h="100vh" justifyContent="center">
              <Heading mb={10} fontSize="2xl">LOGIN PAGE</Heading>
              <chakra.form
                w={{
                  base: '90%',
                  xl: '100%',
                }}
                onSubmit={onSubmitForm}
              >
                <FormControl mb={5}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    onBlur={onBlurField}
                    onChange={onUpdateField}
                    value={form.email}
                    border="none"
                    borderRadius={0}
                    borderBottom="2px solid black"
                  />
                  {errors.email.dirty && errors.email.error ? (
                    <Text color="red">{errors.email.message}</Text>
                  ) : null}
                </FormControl>
                <FormControl mb={10}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={onUpdateField}
                      onBlur={onBlurField}
                      border="none"
                      borderRadius={0}
                      borderBottom="2px solid black"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" bg="none" _hover={{ bg: 'none', color: '#AFAFAF' }} onClick={handleShowPassword}>
                        {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.password.dirty && errors.password.error ? (
                    <Text color="red">{errors.password.message}</Text>
                  ) : null}
                </FormControl>
                <Text mb={10} textAlign="center">
                  Don’t have account?
                  <Link
                    as={ReachLink}
                    to="/register"
                    onClick={() => navigate('/register')}
                    ms={2}
                    color="blue"
                    fontWeight="bold"
                    _hover={{
                      cursor: 'pointer',
                    }}
                  >
                    REGISTER
                  </Link>
                </Text>
                <Button type="submit" colorScheme="blue" variant="solid" w="100%">Login</Button>
              </chakra.form>
            </VStack>
          </Container>
        </Box>
      </Flex>
    </Container>
  );
}

export default Login;
