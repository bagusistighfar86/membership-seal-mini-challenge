import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Center, Link, Spinner, Table, TableContainer, Tbody, Td, Text, Tr,
} from '@chakra-ui/react';
import { Link as ReachLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getCookie } from 'utils/setCookies';
import Layout from './Layout';

function ShowDetailMembership() {
  const navigate = useNavigate();
  const { id } = useParams();

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
        setIsLoading(false);
      }
    });
  };

  const detailMember = [
    { label: 'Name', data: form.name },
    { label: 'Address', data: form.address },
    { label: 'Handphone', data: form.handphone },
    { label: 'Status', data: form.status },
    { label: 'Age', data: form.age },
    { label: 'Gender', data: form.gender },
  ];

  useEffect(() => {
    getMemberDetail();
  }, []);

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

            <TableContainer mt={10}>
              <Table variant="striped" colorScheme="blue" size="md" w="100%">
                <Tbody>
                  {detailMember.map((item) => (
                    <Tr key={item.label}>
                      <Td fontWeight="bold">{item.label}</Td>
                      {item.label === 'Status'
                        ? <Td>{item.data ? 'True' : 'False'}</Td>
                        : <Td>{item.data}</Td>}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        )}
    </Layout>
  );
}

export default ShowDetailMembership;
