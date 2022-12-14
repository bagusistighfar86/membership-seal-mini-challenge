import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Container, Flex, HStack, Image, VStack, chakra, FormControl, FormLabel, Input, Button, Text, Heading, Link, InputRightElement, InputGroup, useToast,
} from '@chakra-ui/react';
import { Link as ReachLink, useNavigate } from 'react-router-dom';
import { useRegisterFormValidator } from 'components/useLoginRegisterFormValidator';
import LogoSeal from 'assets/logo-seal.png';
import LogoKM from 'assets/logo-km.png';
import WallpaperLogin from 'assets/wallpaper-login.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { getCookie } from 'utils/setCookies';

function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const auth = { accessToken: getCookie('accessToken') };

    if (auth.accessToken) navigate('/');
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { ors, validateForm, onBlurField } = useRegisterFormValidator(form);

  const onUpdateField = (e) => {
    const field = e.target.name;
    const nextFormState = {
      ...form,
      [field]: e.target.value,
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

  const fetchRegister = () => {
    axios({
      method: 'post',
      url: 'api/register',
      data: {
        full_name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirmPassword,
      },
    }).then((res) => {
      if (res) {
        navigate('/login');
        toast({
          title: 'Data successed to register',
          position: 'top',
          status: 'success',
          isClosable: true,
        });
      }
    }).catch(() => {
      toast({
        title: 'Data failed to register',
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
    fetchRegister();
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
              <Heading mb={10} fontSize="2xl">REGISTER PAGE</Heading>
              <chakra.form
                w={{
                  base: '90%',
                  xl: '100%',
                }}
                onSubmit={onSubmitForm}
              >
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
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    onBlur={onBlurField}
                    onChange={onUpdateField}
                    value={form.email}
                    border="none"
                    bordadius={0}
                    borderBottom="2px solid black"
                  />
                  {ors.email.dirty && ors.email.or ? (
                    <Text color="red">{ors.email.message}</Text>
                  ) : null}
                </FormControl>
                <FormControl mb={5}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={onUpdateField}
                      onBlur={onBlurField}
                      border="none"
                      bordadius={0}
                      borderBottom="2px solid black"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowPassword} bg="none" _hover={{ bg: 'none', color: '#AFAFAF' }}>
                        {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {ors.password.dirty && ors.password.or ? (
                    <Text color="red">{ors.password.message}</Text>
                  ) : null}
                </FormControl>
                <FormControl mb={10}>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={onUpdateField}
                      onBlur={onBlurField}
                      border="none"
                      bordadius={0}
                      borderBottom="2px solid black"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowConfirmPassword} bg="none" _hover={{ bg: 'none', color: '#AFAFAF' }}>
                        {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {ors.confirmPassword.dirty && ors.confirmPassword.or ? (
                    <Text color="red">{ors.confirmPassword.message}</Text>
                  ) : null}
                </FormControl>
                <Text mb={10} textAlign="center">
                  Already have account?
                  <Link
                    as={ReachLink}
                    to="/login"
                    onClick={() => navigate('/login')}
                    ms={2}
                    color="blue"
                    fontWeight="bold"
                    _hover={{
                      cursor: 'pointer',
                    }}
                  >
                    LOGIN
                  </Link>
                </Text>
                <Button type="submit" colorScheme="blue" variant="solid" w="100%">Register</Button>
              </chakra.form>
            </VStack>
          </Container>
        </Box>
      </Flex>
    </Container>
  );
}

export default Register;
