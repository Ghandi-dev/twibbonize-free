import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      bg="#333"
      color="white"
      height="4rem"
      width="100%"
      display="flex"
      alignItems="center" // Center content vertically
      justifyContent="center" // Center content horizontally
      position="relative"
      textAlign="center"
      zIndex={1000}
    >
      <Text fontSize="sm">© {currentYear} Ghandi & Sekolah Tinggi Wastukancana</Text>
    </Box>
  );
};

export default Footer;
