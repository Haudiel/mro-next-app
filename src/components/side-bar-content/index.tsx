import {
  Box,
  CloseButton,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { SidebarProps, LinkItemProps } from "@/services/interfaces";
import NavItem from "../navitem";
import { FiCheck, FiHome, FiTrendingUp } from "react-icons/fi";
import Link from "next/link";

const LinkItems: Array<LinkItemProps> = [
  { name: "Pendientes", icon: FiHome, href: "/dashboard" },
  { name: "Mis solicitudes", icon: FiTrendingUp, href: "/solicitud" },
  { name: "Aprobaciones", icon: FiCheck, href: "/aprobaciones" },
];
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Magna_logo.svg/2560px-Magna_logo.svg.png" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link key={link.name} href={link.href} passHref>
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        </Link>
      ))}
    </Box>
  );
};

export default SidebarContent;
