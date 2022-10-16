import React from 'react';
import { Grid, SimpleGrid, Modal, ModalOverlay, FormControl, FormLabel, Input, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, GridItem, VStack, StackDivider, Heading, Link, Image, Flex, Center, Box, IconButton, Text, Button, Container } from '@chakra-ui/react';
import {Card} from 'react-bootstrap';
import InfiniteScroll from "react-infinite-scroll-component";
import {BsFillPlusCircleFill} from 'react-icons/bs'
import {MdAccountCircle} from 'react-icons/md'
import {RiMoneyDollarCircleFill} from 'react-icons/ri'
import Header from "./Header.js"

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: {},
            bets: [],
            addIsOpen: false,
            accIsOpen: false,
            joinIsOpen: false,
            betIsOpen: []
        }
    }
    async componentDidMount(){

    }
    openAddModal = e =>{
        e.preventDefault()
        this.setState({addIsOpen : true})
    }
    onAddClose = e =>{
        e.preventDefault()
        this.setState({addIsOpen : false})
    }
    openJoinModal = e =>{
        e.preventDefault()
        this.setState({joinIsOpen : true})
    }
    onJoinClose = e =>{
        e.preventDefault()
        this.setState({joinIsOpen : false})
    }
    openAccModal = e =>{
        e.preventDefault()
        this.setState({accIsOpen : true})
    }
    onAccClose = e =>{
        e.preventDefault()
        this.setState({accIsOpen : false})
    }
    openBetModal(index){

        this.setState({betIsOpen: true})
    }
    onBetClose(index){

        this.setState({betIsOpen: false})
    }
    deleteBet(index){
        var arr = this.state.bets;

        if (index != null){
            arr = arr.slice(0, index).concat(arr.slice(index + 1, arr.length))
            this.setState({bets: arr})
        }
    }
    render(){
        return(
            <Grid
            templateAreas={`"header header"
                            "nav main"
                            "nav footer"`}
            color='blackAlpha.700'
            h = "100%"
            fontWeight='bold'
            >
            
                <GridItem style = {{minHeight: "5vh"}}colSpan={30} area={'header'}>
                    
                    <Header/>
                </GridItem>
                <GridItem style = {{minHeight: "95vh"}} pl='2' colSpan={1} bg='#525B88' area={'nav'}>
                    <br/>
                    <VStack
                        divider={<StackDivider borderColor='gray.200' />}
                        spacing={4}>
                    <MdAccountCircle onClick={this.openAccModal} size = {40} style={{color: "white"}}/>
                    <BsFillPlusCircleFill onClick={this.openAddModal} size = {40} style={{color: "white"}}/>

                    <RiMoneyDollarCircleFill  onClick={this.openJoinModal} size = {40} style={{color: "white"}}/>



                    </VStack>
                    <Modal isOpen={this.state.accIsOpen} onClose={this.onAccClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Account Details</ModalHeader>
                    <ModalBody>
                    <strong>Name: </strong> {this.state.user.firstName} {this.state.user.lastName}<br/><br/>
                    <strong>Email: </strong> {this.state.user.email} <br/><br/>
                    <strong>Trust Score: </strong> {this.state.user.trustScore} <br/>
                    <strong>Betting Score: </strong> {this.state.user.bettingScore} <br/>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={this.onAccClose}>
                        Close
                        </Button>
                    </ModalFooter>
                    </ModalContent>
                    </Modal>

                    <Modal isOpen={this.state.addIsOpen} onClose={this.onAddClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Create New Bet</ModalHeader>
                    <ModalBody>
                    <>
                        <FormControl isRequired>
                        <FormLabel>Bet Name</FormLabel>
                        <Input placeholder='Bet name' />
                        </FormControl>
                    </>

                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={this.onAddClose}>
                        Close
                        </Button>
                        <Button colorScheme='blue'>Wager!</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>

                <Modal isOpen={this.state.joinIsOpen} onClose={this.onJoinClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Join Bet</ModalHeader>
                    <ModalBody>
                    <>
                        <FormControl isRequired>
                        <FormLabel>Bet Code</FormLabel>
                        <Input placeholder='Bet Code' />
                        </FormControl>
                    </>

                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={this.onJoinClose}>
                        Close
                        </Button>
                        <Button colorScheme='blue'>Wager!</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>

                </GridItem>
                <GridItem pl='2'colSpan={29}  style = {{minHeight: "95vh"}} area={'main'}>
                    <InfiniteScroll
                        dataLength={this.state.bets.length}
                        next={this.state.bets}
                        hasMore={false}
                        loader={<h4>Loading...</h4>}>
                    

                        <Card id = "ID" style = {{margin:"1rem", width: "90%"}}>
                                <Card.Header>BET NAME</Card.Header>
                                <Card.Body> 
                                <SimpleGrid columns={2} spacing={10}>
                                    <Box>
                                    Position: POSITION <br/>
                                    Stake: STAKE <br/>
                                    Total Pot: POT
                                    </Box>
                                    <Box>
                                    Betting Expires: DATE <br/>
                                    Total Players: PLAYERS <br/>
                                    <br/>

                                    </Box>
                                                                                        
                                </SimpleGrid>

                                </Card.Body>
                                <Card.Footer align = "right" >
                                    <Button colorScheme='red' mr={3} onClick={this.deleteBet}>
                                        Exit Bet
                                    </Button>
                                    <Button colorScheme='green' mr={3} onClick={this.onJoinClose}>
                                        Make Bet
                                    </Button>

                                    <Modal isOpen={this.state.joinIsOpen} onClose={this.onJoinClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                        <ModalHeader>Make Bet</ModalHeader>
                                        <ModalBody>
                                        <>
                                            <FormControl isRequired>
                                            <FormLabel></FormLabel>
                                            <Input placeholder='Bet Code' />
                                            </FormControl>
                                        </>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button variant='ghost' mr={3} onClick={this.onJoinClose}>
                                            Close
                                            </Button>
                                            <Button colorScheme='blue'>Wager!</Button>
                                        </ModalFooter>
                                        </ModalContent>
                                    </Modal>


                                </Card.Footer>
                            </Card>

                        {this.state.bets.map((bet, index) => (
                            <Card id = "ID" style = {{margin:"1rem", width: "90%"}}>
                                <Card.Header>{bet.name}</Card.Header>
                                <Card.Body> 
                                <SimpleGrid columns={2} spacing={10}>
                                    <Box>
                                    Position: {bet.position} <br/>
                                    Stake: {bet.stake} <br/>
                                    Total Pot: {bet.totalPot}
                                    </Box>
                                    <Box>
                                    Betting Expires: {bet.time} <br/>
                                    Total Players: {bet.playerNumber} <br/>
                                    <br/>

                                    </Box>
                                                                                        
                                </SimpleGrid>

                                </Card.Body>
                                <Card.Footer align = "right" >
                                    <Button colorScheme='red' mr={3} onClick={this.deleteBet(index)}>
                                        Exit Bet
                                    </Button>
                                    <Button colorScheme='green' mr={3} onClick={this.openBetModal(index)}>
                                        Make Bet
                                    </Button>

                                    <Modal isOpen={this.state.joinIsOpen} onClose={this.onBetClose(index)}>
                                        <ModalOverlay />
                                        <ModalContent>
                                        <ModalHeader>Make Bet</ModalHeader>
                                        <ModalBody>
                                        <>
                                            <FormControl isRequired>
                                            <FormLabel></FormLabel>
                                            <Input placeholder='Bet Code' />
                                            </FormControl>
                                        </>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button variant='ghost' mr={3} onClick={this.onJoinClose}>
                                            Close
                                            </Button>
                                            <Button colorScheme='blue'>Wager!</Button>
                                        </ModalFooter>
                                        </ModalContent>
                                    </Modal>


                                </Card.Footer>
                            </Card>
                        ))}
                    </InfiniteScroll>
                </GridItem>
            </Grid>
        )
    }
}

                        /*
                        {this.state.bets.map((bet, index) => (
                            <Card key = {bet.id} style = {{margin:"1rem", width: "90%"}}>
                                <Card.Header>{bet.name}</Card.Header>
                                <Card.Body> what bet, time, total players, money, total pot
                                    <Card.Title>Special title treatment</Card.Title>
                                </Card.Body>
                            </Card>
                        ))}
                        */

export default Dashboard