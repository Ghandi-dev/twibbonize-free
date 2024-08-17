import React from "react";
import { Container, Grid, Box, Heading, Text } from "@chakra-ui/react";

const Features = () => {
  return (
    <Container py={8} id="features">
      <Heading as="h2" size="xl" textAlign="center" mb={8}>
        Our Features
      </Heading>
      <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={6}>
        <Box p={4} bg="white" boxShadow="md" borderRadius="md" textAlign="center">
          <Heading as="h3" size="md" mb={4}>
            Feature 1
          </Heading>
          <Text>Description of feature 1.</Text>
        </Box>
        <Box p={4} bg="white" boxShadow="md" borderRadius="md" textAlign="center">
          <Heading as="h3" size="md" mb={4}>
            Feature 2
          </Heading>
          <Text>Description of feature 2.</Text>
        </Box>
        <Box p={4} bg="white" boxShadow="md" borderRadius="md" textAlign="center">
          <Heading as="h3" size="md" mb={4}>
            Feature 3
          </Heading>
          <Text>Description of feature 3.</Text>
        </Box>
      </Grid>
    </Container>
  );
};

export default Features;
