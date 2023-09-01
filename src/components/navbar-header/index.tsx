import { Box, Flex, Image, useColorModeValue} from '@chakra-ui/react';
import React from 'react';

const NavBar: React.FC = () => {
  return (
    <Flex
    px={{ base: 0, md: 0 }}
    height="20"
    alignItems="center"
    bg={useColorModeValue('white', 'gray.900')}
    borderBottomWidth="1px"
    borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    // justifyContent={{ base: 'space-between', md: 'flex-end' }}
    >
      <Image h="3.5rem" src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Magna_logo.svg/2560px-Magna_logo.svg.png'/>
  </Flex>
  );
};

export default NavBar;