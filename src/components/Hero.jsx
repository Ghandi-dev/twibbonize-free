import React from "react";
import { Container, Heading, Text, Button, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 8rem)" // Adjust 80px to the combined height of header and footer
      bgGradient="linear(to-t, blue.200, teal.500)"
      backgroundSize="cover"
      backgroundPosition="center"
      textAlign="center"
    >
      <Heading as="h1" size="2xl" p={2} mb={5} bgClip="text" fontWeight="extrabold" textColor="white">
        Kampanyekan Acaramu Secara Gratis
      </Heading>
      <Button colorScheme="blue" size="lg" onClick={() => navigate("/create")} leftIcon={<FaPlus />}>
        Buat Kampanye
      </Button>
    </Box>
  );
};

export default Hero;
