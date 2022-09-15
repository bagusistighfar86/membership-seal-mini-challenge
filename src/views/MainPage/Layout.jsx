import React, { useEffect } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import Sidebar from 'components/Sidebar';
import Navbar from 'components/Navbar';

function Layout({ children }) {
  useEffect(() => {
  }, []);

  return (
    <HStack spacing={0} alignItems="start">
      <Sidebar />
      <Box
        w={{
          base: '100%',
          lg: 'calc(100% - 300px)',
        }}
        bg="#F4F7FE"
        position="relative"
        left={{
          base: '0',
          lg: '300px',
        }}
      >
        <Navbar />
        {children}
      </Box>
    </HStack>
  // <Dasboard />
  );
}

export default Layout;
