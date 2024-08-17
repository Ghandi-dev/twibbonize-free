import React from "react";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png"; // Updated path to logo.png

const Header = () => {
  return (
    <Box
      bg="blue.500"
      px={4}
      width="100%" // Ensure the header takes up full width
      position="relative"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" maxWidth="container.xl" mx="auto">
        <Flex alignItems="center">
          <Image src={logo} alt="Logo" boxSize={10} mr={2} />
          <Heading as="h5" size="md" color="white">
            SttTwib
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
