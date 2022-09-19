import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, HStack, Link, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Text, Spinner, Center,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare, faArrowLeft, faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { Link as ReachLink, useNavigate } from 'react-router-dom';
import { getCookie } from 'utils/setCookies';
import DeleteMembershipButton from 'components/Button/DeleteMembershipButton';
import Layout from './Layout';

function ShowMembership() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [navigation, setNavigation] = useState({
    currentPage: '',
    prevURL: '',
    nextURL: '',
  });
  const [urlPagination, setUrlPagination] = useState('https://challenge.madjou.com/api/memberships');

  const getMembership = async () => {
    const accessToken = getCookie('accessToken');
    await axios({
      method: 'get',
      url: urlPagination,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      if (res) {
        const nav = {
          currentPage: res.data.data.current_page,
          prevURL: res.data.data.prev_page_url,
          nextURL: res.data.data.next_page_url,
        };
        setNavigation(nav);
        // (res.data.data);
        setData(res.data.data.data);
        setIsLoading(false);
      }
    });
  };

  const updateNav = async () => {
    const accessToken = getCookie('accessToken');
    await axios({
      method: 'get',
      url: urlPagination,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      if (res) {
        const nav = {
          currentPage: res.data.data.current_page,
          prevURL: res.data.data.prev_page_url,
          nextURL: res.data.data.next_page_url,
        };
        setNavigation(nav);
      }
    });
  };

  useEffect(() => {
    getMembership();
  }, [urlPagination]);

  const editMemberButton = (taskId) => (
    <Link
      as={ReachLink}
      to={`/membership/edit/${taskId}`}
      onClick={() => navigate(`/membership/edit/${taskId}`)}
      fontSize={{
        base: 'lg',
        sm: '2xl',
      }}
      _hover={{
        textDecor: 'none',
        color: 'black',
      }}
    >
      <FontAwesomeIcon icon={faPenToSquare} />
    </Link>
  );

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
          <Box minH="100vh" pt={32} px={5}>
            <TableContainer>
              <Table
                variant="striped"
                colorScheme="blue"
                size={{
                  base: 'sm',
                  sm: 'md',
                }}
                w="100%"
              >
                <Thead>
                  <Tr fontWeight="black">
                    <Th w="2%">No</Th>
                    <Th w="100%" textAlign="center">data</Th>
                    <Th w="auto" textAlign="center">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((member, index) => (
                    <Tr key={member.id}>
                      <Td w="2%" fontWeight="bold">{index + 1}</Td>
                      <Td w="100%" textAlign="start">
                        <Link
                          as={ReachLink}
                          to={`/membership/detail/${member.id}`}
                          onClick={() => navigate(`/membership/detail/${member.id}`)}
                          color="black"
                          _hover={{
                            cursor: 'pointer',
                            textDecor: 'underline',
                          }}
                        >
                          {member.full_name}
                        </Link>
                      </Td>
                      <Td w="auto">
                        <HStack
                          h="100%"
                          alignItems="center"
                          justifyContent="center"
                          spacing={8}
                          color="#AFAFAF"
                        >
                          {editMemberButton(member.id)}
                          <DeleteMembershipButton
                            url={`api/memberships/${member.id}`}
                            taskId={member.id}
                            data={data}
                            setData={setData}
                            updateNav={updateNav}
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <HStack color="white" w="100%" justifyContent="center" mt={10}>
              <Button bg="#002550" _hover={{ bg: '#013e85' }} onClick={() => setUrlPagination(navigation.prevURL)} disabled={!navigation.prevURL}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
              <Box px={10} py={2} bg="#002550" bordadius={8} fontWeight="bold"><Text>{navigation.currentPage}</Text></Box>
              <Button bg="#002550" _hover={{ bg: '#013e85' }} onClick={() => setUrlPagination(navigation.nextURL)} disabled={!navigation.nextURL}>
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </HStack>
          </Box>
        )}
    </Layout>
  );
}

export default ShowMembership;
