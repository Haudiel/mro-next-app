'use client'

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import SidebarContent from '../side-bar-content'
import MobileNav from '../mobileNav'
import TableCard from '../tabla-card'


const SidebarWithHeader = () => {

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
        //*Agregar info aqui
      <Box ml={{ base: 0, md: 60 }} p="4">
        <TableCard/>
      </Box>
    </Box>
  )
}

export default SidebarWithHeader
