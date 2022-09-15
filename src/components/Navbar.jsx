import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex, Heading, Image, Link, Spacer, Text, useDisclosure, VStack,
} from '@chakra-ui/react';
import { Link as ReachLink, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightToBracket, faPlus, faUser, faBars,
} from '@fortawesome/free-solid-svg-icons';
import { deleteCookie } from 'utils/setCookies';
import LogoSeal from 'assets/logo-seal.png';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const [judul, setJudul] = useState('');
  const [active, setActive] = useState('');

  const SideItem = [
    {
      label: 'Create Membership',
      path: '/create-membership',
      icon: faPlus,
    },
    {
      label: 'Membership',
      path: '/membership',
      icon: faUser,
    },
  ];

  useEffect(() => {
    if (location.pathname.includes('/create-membership')) {
      setJudul('Create Membership');
      setActive('Home');
    } else if (location.pathname.includes('/membership')) {
      setJudul('Membership');
      setActive('Portfolio');
    }
  }, []);

  const handleLogout = () => {
    navigate('/login');
    deleteCookie('accessToken');
  };

  return (
    <Box
      w={{
        base: '100%',
        lg: 'calc(100% - 300px)',
      }}
      h="130px"
      alignItems="center"
      position="fixed"
      zIndex="sticky"
    >
      <Flex
        bg="rgba(255, 255, 255, 0.5)"
        boxShadow="0px 2px 5px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(10px)"
        h="100px"
        w="100%"
        px={5}
        alignItems="center"
      >
        <Button me={3} ref={btnRef} colorScheme="teal" onClick={onOpen}>
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <Center h="100px" borderBottom="2px solid black">
                <Image src={LogoSeal} h="60px" />
              </Center>
            </DrawerHeader>

            <DrawerBody>
              <VStack
                spacing={1}
                color="white"
                alignItems="start"
              >
                {SideItem.map((item) => (
                  <Link
                    as={ReachLink}
                    key={item.label}
                    to={item.path}
                    onClick={() => navigate(item.path)}
                    w="100%"
                    py={4}
                    px={5}
                    display="flex"
                    alignItems="center"
                    borderRadius={10}
                    fontSize="lg"
                    fontWeight="400"
                    textDecor="none"
                    color="black"
                    _hover={{
                      textDecor: 'none',
                    }}
                    boxShadow={active === item.label ? 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' : null}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <Text ms={2}>{item.label}</Text>
                  </Link>
                ))}
                <Link
                  as={ReachLink}
                  to="/login"
                  onClick={() => handleLogout()}
                  display={{
                    base: 'flex',
                    md: 'none',
                  }}
                  py={16}
                  px={5}
                  alignItems="center"
                  fontSize="xl"
                  fontWeight="500"
                  color="red"
                  _hover={{
                    textDecor: 'none',
                  }}
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <Text ms={3}>Logout</Text>
                </Link>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Heading
          size={{
            base: 'md',
            xl: 'lg',
          }}
          fontWeight="500"
        >
          {judul}

        </Heading>
        <Spacer />
        <Link
          as={ReachLink}
          to="/login"
          onClick={() => handleLogout()}
          display={{
            base: 'none',
            md: 'flex',
          }}
          alignItems="center"
          fontSize="xl"
          fontWeight="500"
          color="red"
          _hover={{
            textDecor: 'none',
          }}
        >
          <FontAwesomeIcon icon={faRightToBracket} />
          <Text ms={3}>Logout</Text>
        </Link>
      </Flex>
    </Box>
  );
}

export default Navbar;
