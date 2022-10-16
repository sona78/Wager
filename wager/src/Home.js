import React from 'react';
import { Heading, Link, Image, Flex, Center, Box, IconButton, Text, Button, Container } from '@chakra-ui/react';
import cover from "./assets/cover.png"
import DASHBOARD from "./App.js"
import Typist from "react-typist"


function Home(){
    return (
        <div id = "main">
            <Flex justify="center" minHeight="100vh" alignItems="center">
            <Box>
                <Image src={cover} alt="Wager logo" height="auto" width="40rem"></Image> 
            </Box>
            <Box>
            <br/>
            <br/>
            <br/>
            <Text fontSize="4xl"><strong>Let's make betting Social</strong></Text>
                <Center>
                <a href = "/Dashboard"><Button bgColor="#2ec4b6" marginTop="2rem">Get Started</Button></a>
                </Center>
            </Box>
            </Flex>
            
        </div>
    );
}

export default Home;