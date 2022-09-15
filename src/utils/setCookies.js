import { useToast } from '@chakra-ui/react';

function setCookie(cName, cValue, minutes) {
  const d = new Date();
  d.setTime(d.getTime() + (minutes * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cName}=${cValue}; ${expires};path=/`;
}

function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function checkCookie(cName) {
  const toast = useToast();
  const cItem = getCookie(cName);
  if (cItem !== '') {
    toast({
      title: 'Access token was expired. Please login again.',
      position: 'top',
      status: 'error',
      isClosable: true,
    });
    return false;
  }
  return true;
}

function deleteCookie(cName) {
  const path = window.location.origin;
  console.log(path);

  document.cookie = `${cName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
}
export {
  setCookie, checkCookie, getCookie, deleteCookie,
};
