import React, { useEffect, useState } from "react";
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

function Holder() {
  const [result, setResult] = useState([]);
  const api = () => {
    fetch("http://localhost:4000/api/users", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setResult(data.sort()));
  };
  useEffect(() => {
    api();
  }, []);
  return <Leaderboard arr={result} />;
}

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBoard: null,
    };
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
          {this.props.arr.length != 0 && (
            <>
              <SimpleGrid columns={3}>
                <Box columns={1}>
                  <h1 style={{ fontSize: "50px" }}>Member:</h1>
                  <br />
                  {this.props.arr.map((member) => (
                    <>
                      <h3 style={{ fontSize: "20px" }}>
                        {member.firstname} {member.lastname}
                      </h3>
                      <br />
                    </>
                  ))}
                </Box>
                <Box columns={1}></Box>
                <Box columns={1}>
                  <h1 style={{ fontSize: "50px" }}>Score:</h1>
                  <br />
                  {this.props.arr.map((member) => (
                    <>
                      <h3 style={{ fontSize: "20px" }}>
                        {member.betting_score}
                      </h3>
                      <br />
                    </>
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

export default Holder;
