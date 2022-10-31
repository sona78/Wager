import React, { useState } from "react";
import axios from "axios";
import {
  Stack,
  Text,
  InputGroup,
  InputRightElement,
  Input,
  useToast,
  Button,
  Image,
  Box,
  Container,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import dash from "./images/Dashboard.PNG";

const Home = (props) => {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const handleSubmit = async (e) => {
    //check email validity
    let error = !email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    error &&
      toast({
        title: "Invalid Email",
        description: "Make sure to enter a valid email address!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    if (!error) {
      axios.post(
        `https://sheet.best/api/sheets/c122b525-c0e2-4ebd-997e-614116491820`,
        { email }
      );
      toast({
        title: "Success!",
        description: "We've got your email noted and will reach out soon.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <section id="hero" style={{ backgroundColor: "#F7F8FC" }}>
        <Container maxW="80vw">
          <Stack
            direction={"row"}
            justify={"center"}
            alignItems="center"
            w={"full"}
            h={"100vh"}
          >
            <Stack direction={"column"} align={"center"} w={"70%"}>
              <Text fontSize="6xl" as="b" color="#195F50">
                Wager
              </Text>
              <Text fontSize="2xl" color="#252733">
                Chances, Payments, and Leaderboards
              </Text>
              <Text fontSize="2xl" color="#252733">
                Let's Make Betting Social.
              </Text>
              <FormControl>
                <InputGroup>
                  <Input
                    variant="filled"
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      backgroundColor={"#252733"}
                      color={"#fff"}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>Invalid Email</FormErrorMessage>
              </FormControl>
            </Stack>
            <Box w={"60%"}>
              <Image src={dash}></Image>
            </Box>
          </Stack>
        </Container>
      </section>
    </>
  );
};

export default Home;
