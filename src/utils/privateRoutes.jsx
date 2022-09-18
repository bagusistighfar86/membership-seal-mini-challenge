import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from './setCookies';

function PrivateRoutes() {
  const auth = { accessToken: getCookie('accessToken') };

  if (!auth.accessToken) return <Navigate to="/login" />;
  return <Outlet />;
}

export default PrivateRoutes;
