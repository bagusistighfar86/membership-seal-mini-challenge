import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import theme from 'style/theme';
import Login from 'views/Login';
import Register from 'views/Register';
import CreateMembership from 'views/MainPage/CreateMembership';
import ShowMembership from 'views/MainPage/ShowMembership';
import EditMemberbershipData from 'views/MainPage/EditMembershipData';
import ShowDetailMembership from 'views/MainPage/ShowDetailMembership';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="create-membership" element={<CreateMembership />} />
        <Route path="membership" element={<ShowMembership />} />
        <Route path="/membership/edit/:id" element={<EditMemberbershipData />} />
        <Route path="/membership/detail/:id" element={<ShowDetailMembership />} />
        {/* <Route element={<PrivateRoutes />}>
          <Route element={<Token />} path="token" />
          <Route path="/" element={<Dashboard />} />
        </Route> */}
      </Routes>
    </ChakraProvider>
  );
}

export default App;
