import React from 'react';
import {
  Button, HStack, Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure, useToast, VStack,
} from '@chakra-ui/react';
import { getCookie } from 'utils/setCookies';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function DeleteMembershipButton({
  url, taskId, data, setData, updateNav,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const handleDelete = async () => {
    const accessToken = getCookie('accessToken');
    await axios({
      method: 'delete',
      url,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      if (res) {
        const newData = data.filter((item) => item.id !== taskId);
        // (data);
        setData(newData);
        toast({
          title: 'Data deleted successfully',
          position: 'bottom-left',
          status: 'success',
          isClosable: true,
        });
        updateNav();
      }
    });
  };

  return (
    <>
      <Button
        bg="none"
        m={0}
        p={0}
        onClick={onOpen}
        fontSize={{
          base: 'lg',
          sm: '2xl',
        }}
        _hover={{
          textDecor: 'none',
          color: 'black',
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent p={5}>
          <ModalBody>
            <VStack spacing={5}>
              <Text fontSize="xl" fontWeight="bold">Are you sure want to delete?</Text>
              <HStack spacing={5}>
                <Button type="button" onClick={onClose}>Cancel</Button>
                <Button type="button" onClick={handleDelete} colorScheme="red">Delete</Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteMembershipButton;
