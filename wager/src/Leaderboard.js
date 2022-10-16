import React from "react";
import {
  Grid,
  SimpleGrid,
  Modal,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  GridItem,
  VStack,
  StackDivider,
  Heading,
  Link,
  Image,
  Flex,
  Center,
  Box,
  IconButton,
  Text,
  Button,
  Container,
} from "@chakra-ui/react";
import Header from "./Header.js";

let fullUsers = [];

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBoard: null,
    };
  }

async componentDidMount(){

        const response = await fetch('http://localhost:4000/api/users',{
            method: "GET"
        })
        fullUsers = response

        console.log(fullUsers.json)
  }
  render() {
    return (
      <Grid
        templateAreas={`"header header"
                            "nav main"
                            "nav footer"`}
        color="blackAlpha.700"
        h="100%"
        fontWeight="bold"
      >
        <GridItem style={{ minHeight: "5vh" }} colSpan={8} area={"header"}>
          <Header />
        </GridItem>
        <GridItem
          pl="2"
          colSpan={8}
          bg="#dfd"
          style={{ textAlign: "center", minHeight: "95vh" }}
          area={"main"}
        >
          <br />
          <Center
            bg="#525B88"
            h="100px"
            style={{
              marginLeft: "10rem",
              marginRight: "10rem",
              color: "white",
              fontSize: "50px",
            }}
            color="white"
          >
            <u>
              <h1>
                {" "}
                <strong>Leaderboard: </strong>
              </h1>
            </u>
          </Center>
          <br />
          {fullUsers.length != 0 && (
            <>
              <SimpleGrid columns={3}>
                <Box></Box>
                <Box>
                  <h1 style={{ fontSize: "25px" }}>Member:</h1>
                  {fullUsers.map((member) => (
                    <h3>{member.firstname}</h3>
                  ))}
                </Box>
                <Box>
                  <h1 style={{ fontSize: "25px" }}>Score:</h1>
                  {fullUsers.map((member) => (
                    <h3>{member.betting_score}</h3>
                  ))}
                </Box>
              </SimpleGrid>
            </>
          )}
        </GridItem>
      </Grid>
    );
  }
}

export default Leaderboard;
