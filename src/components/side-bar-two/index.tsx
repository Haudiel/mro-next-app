'use client'

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  chakra,
} from '@chakra-ui/react'
import React from 'react'
import SidebarContent from '../side-bar-content'
import MobileNav from '../mobileNav'
import TableCard from '../tabla-card'


const SidebarWithHeaderTwo = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpend={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <chakra.h1>Hello apartado</chakra.h1>
      </Box>
    </Box>
  )
}

export default SidebarWithHeaderTwo
