import React from "react";
import { Container, Grid, Heading, Text, Box } from "@chakra-ui/react";

const Testimonials = () => {
  return (
    <Container maxW="container.xl" py={8} bg="#f5f5f5" id="testimonials">
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        What Our Clients Say
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        <Box p={6} bg="white" boxShadow="md" borderRadius="md">
          <Text fontSize="lg" mb={4}>
            "This service is amazing! Highly recommend."
          </Text>
          <Text fontSize="sm" textAlign="right">
            - Client A
          </Text>
        </Box>
        <Box p={6} bg="white" boxShadow="md" borderRadius="md">
          <Text fontSize="lg" mb={4}>
            "A game changer for our business."
          </Text>
          <Text fontSize="sm" textAlign="right">
            - Client B
          </Text>
        </Box>
        <Box p={6} bg="white" boxShadow="md" borderRadius="md">
          <Text fontSize="lg" mb={4}>
            "Exceptional customer support and great features."
          </Text>
          <Text fontSize="sm" textAlign="right">
            - Client C
          </Text>
        </Box>
      </Grid>
    </Container>
  );
};

export default Testimonials;
