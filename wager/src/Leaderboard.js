import React from 'react';
import { Grid, SimpleGrid, Modal, ModalOverlay, FormControl, FormLabel, Input, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, GridItem, VStack, StackDivider, Heading, Link, Image, Flex, Center, Box, IconButton, Text, Button, Container } from '@chakra-ui/react';
import Header from "./Header.js"
const axios = require('axios').default;

let fullUsers = []

class Leaderboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentBoard: null
        }
    }
    async componentDidMount(){
        let users = []
        fetch('api/users', { method: 'GET' })
        .then(function (response){
            users = response;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function() {
            for (let i = 0; i < users.length; i ++){

            }
            function compare( a, b ) {
                if ( a.bettingScore < b.bettingScore ){
                  return -1;
                }
                if ( a.bettingScore > b.bettingScore ){
                  return 1;
                }
                return 0;
              }
            users.sort(compare)
            fullUsers = users;
        })
    }
    render(){
        return(
            <Grid
            templateAreas={`"header header"
                            "nav main"
                            "nav footer"`}
            color='blackAlpha.700'
            h = "100%"
            fontWeight='bold'>
                <GridItem style = {{minHeight: "5vh"}} colSpan={8} area={'header'}>
                    <Header/>
                </GridItem>
                <GridItem pl='2'colSpan={8} bg='#dfd' style = {{ textAlign: "center", minHeight: "95vh"}} area={'main'}>
                    <br/>
                    <Center bg='#525B88' h='100px' style= {{marginLeft: "10rem", marginRight: "10rem", color:"white", fontSize: "50px" }} color='white'>
                    <u><h1 > <strong>Leaderboard: </strong></h1></u>
                    </Center>
                    <br/>
                {fullUsers.length != 0 &&
                <>                
                <SimpleGrid columns={3}>
                <Box>

                </Box>
                <Box>
                    <h1 style = {{fontSize: "25px"}}>Member:</h1>
                {fullUsers.map((member) => (
                    <h3>{member.name}</h3>
                ))}
                </Box>
                <Box>
                <h1 style = {{fontSize: "25px"}}>Score:</h1>
                {fullUsers.map((member) => (
                    <h3>{member.bettingScore}</h3>
                ))} 
                </Box>

                </SimpleGrid>       
                </>
                }
                </GridItem>
                </Grid>
                
        );
    }
}

export default Leaderboard