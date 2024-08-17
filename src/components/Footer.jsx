import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      bg="#333"
      color="white"
      p={4}
      width="100%" // Ensure the header takes up full width
      position="relative"
      textAlign="center"
      zIndex={1000} // Ensure it stays on top of other content
    >
      <Text fontSize="sm">© {currentYear} Ghandi & Sekolah Tinggi Wastukancana</Text>
    </Box>
  );
};

export default Footer;
