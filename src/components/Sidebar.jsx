import React, { useEffect, useState } from 'react';
import {
  Box, Center, VStack, Image, Link, Text,
} from '@chakra-ui/react';
import { Link as ReachLink, useLocation, useNavigate } from 'react-router-dom';
import LogoSeal from 'assets/logo-seal.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState('');

  const NavItem = [
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
    if (location.pathname === '/create-membership') setActive('Home');
    else if (location.pathname.includes('/membership')) setActive('Portfolio');
  }, [location.pathname]);

  return (
    <Box
      h="100vh"
      w="300px"
      px={5}
      position="fixed"
      bg="white"
      display={{
        base: 'none',
        lg: 'block',
      }}
    >
      <Center h="100px" borderBottom="2px solid black">
        <Image src={LogoSeal} h="60px" />
      </Center>
      <VStack
        my={3}
        spacing={1}
        color="white"
        display={{ base: 'none', md: 'flex' }}
        alignItems="start"
      >
        {NavItem.map((item) => (
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
      </VStack>
    </Box>
  );
}

export default Sidebar;
