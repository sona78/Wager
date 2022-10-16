import React from "react";
import {
  Grid,
  SimpleGrid,
  Modal,
  NumberInput,
  NumberInputField,
  Select,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
import { Card } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import uniqueHash from "unique-hash";
import Header from "./Header.js";
import { getProvider, connect, NewWagerInstruction } from "./utils.js";
import {
  Keypair,
  Connection,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  useWallet,
  useConnection,
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { Buffer } from "buffer";
let OptionsList = [];

const Processing = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  return (
    <Dashboard
      Connection={connection}
      Key={publicKey}
      transactionSend={sendTransaction}
    />
  );
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // Wallet detection
    this.provider = getProvider(); // see "Detecting the Provider"
    connect(this.provider);
    this.network = "https://api.devnet.solana.com";
    this.connection = new Connection(this.network);
    this.publicKey = props.Key;
    this.systemProgram = new PublicKey("11111111111111111111111111111111");
    this.rentSysvar = new PublicKey(
      "SysvarRent111111111111111111111111111111111"
    );
    this.programId = Keypair.generate();
    this.state = {
      user: {},
      bets: [],
      betComplete: [],
      name: "",
      minPlayers: 0,
      maxPlayers: 0,
      minBet: 0,
      maxBet: 0,
      options: [0, 0, 0, 0, 0, 0, 0, 0],
      option: "",
      time: 0,
      currentBet: {},
      userBets: [],
      joinCode: "",
      connection: props.Connection,
      publicKey: props.Key,
      betOption: "",
      betValue: 0,
      addIsOpen: false,
      accIsOpen: false,
      joinIsOpen: false,
      betIsOpen: false,
    };
    this.openAccModal = this.openAccModal.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.openBetModal = this.openBetModal.bind(this);
    this.openJoinModal = this.openJoinModal.bind(this);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleOptionNewChange = this.handleOptionNewChange.bind(this);
    this.handleOptionEnter = this.handleOptionEnter.bind(this);

    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  async componentDidMount() {}
  openAddModal = (e) => {
    e.preventDefault();
    this.setState({ addIsOpen: true });
  };
  onAddClose = (e) => {
    e.preventDefault();
    this.setState({ addIsOpen: false });
  };
  openJoinModal = (e) => {
    e.preventDefault();
    this.setState({ joinIsOpen: true });
  };
  onJoinClose = (e) => {
    e.preventDefault();
    this.setState({ joinIsOpen: false });
  };
  openAccModal = (e) => {
    e.preventDefault();
    this.setState({ accIsOpen: true });
  };
  onAccClose = (e) => {
    e.preventDefault();
    this.setState({ accIsOpen: false });
  };
  openBetModal = (e) => {
    e.preventDefault();
    this.setState({ betIsOpen: true });
  };
  openBetModal(index) {
    this.setState({ currentBet: this.state.bets[index] });
    this.setState({ betIsOpen: true });
  }
  onBetClose = (e) => {
    e.preventDefault();
    this.setState({ betIsOpen: false });
  };
  handleOptionNewChange = (e) => {
    this.setState({ option: e.target.value });
  };
  handleOptionEnter() {
    if (this.state.option === "DELETE" || this.state.option == "") {
      OptionsList.splice(OptionsList.length - 1);
    } else {
      console.log(this.state.option);
      OptionsList.push(this.state.option);
    }
    this.setState({ options: OptionsList });
    this.setState({ option: "" });
  }
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleTimeChange = (e) => {
    this.setState({ time: e.value });
  };
  handleminPlayersChange = (e) => {
    this.setState({ minPlayers: e.value });
  };
  handlemaxPlayersChange = (e) => {
    this.setState({ maxPlayers: e.value });
  };
  handleminBetChange = (e) => {
    this.setState({ minBet: e.value });
  };
  handlejoinCodeChange = (e) => {
    this.setState({ joinCode: e.value });
  };

  handleBetSubmit = async (e) => {
    let name = this.state.name;
    let minPlayers = this.state.minPlayers;
    let maxPlayers = this.state.maxPlayers;
    let minBet = this.state.minBet;
    let maxBet = this.state.maxBet;
    let options = this.state.options;
    while (options.length < 8) {
      options.push("zero");
    }
    console.log(options);
    let hours = this.state.time; //TIME IN HOURS
    let index = uniqueHash(name + maxBet + options);
    console.log(Buffer.from(name));

    let [potPDA, potBump] = await PublicKey.findProgramAddress(
      [Buffer.from(name)],
      this.programId.publicKey
    );
    /*     console.log(name);
    console.log(this.provider.publicKey.toBase58());
    console.log(potPDA.toBase58());
    console.log(potBump);
    console.log(PublicKey.isOnCurve(potPDA)); */
    //Create bet RPC Call(Send Transaction for Create Bet)
    const instruction = new TransactionInstruction({
      programId: this.programId.publicKey,
      keys: [
        {
          pubkey: this.provider.publicKey,
          isSigner: true,
          isWritable: true,
        },
        { pubkey: potPDA, isSigner: false, isWritable: true },
        {
          pubkey: this.systemProgram,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: this.rentSysvar,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: NewWagerInstruction(
        name,
        minPlayers,
        maxPlayers,
        minBet,
        maxBet,
        options[0],
        options[1],
        options[2],
        options[3],
        options[4],
        options[5],
        options[6],
        options[7],
        hours
      ),
    });
    let transaction = new Transaction().add(instruction);
    console.log(transaction);
    transaction.recentBlockhash = await this.connection.getLatestBlockhash();
    console.log("blockhas retreived");
    transaction.feePayer = this.provider.publicKey;
    console.log(transaction);
    const signedTransaction = await this.provider.signTransaction(transaction);
    const signature = await this.connection.sendRawTransaction(
      signedTransaction.serialize()
    );
    /* const signature = await this.provider.signAndSendTransaction(transaction);
    console.log("success!");
    await this.connection.getSignatureStatus(signature); */
  };

  handleBetOption = (e) => {
    this.setState({ betOption: e.target.value });
  };

  handleBetValue = (e) => {
    this.setState({ betValue: e.target.value });
  };

  handleBetting = async (index) => {
    let option = this.state.betOption;
    let value = this.state.value;
    let bet = this.state.userBets[index]; //bet object in contention

    //Sending Bet Transaction and Balance for Bet
    let [potPDA, potBump] = await PublicKey.findProgramAddress(
      [Buffer.from(bet)],
      this.programId.publicKey
    );
    //Make bet RPC Call(Send Transaction for Make Bet)
    let instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: this.state.publicKey,
          isSigner: false,
          isWritable: false,
        },
        { pubkey: potPDA, isSigner: false, isWritable: true },
        {
          pubkey: this.systemProgram.toString(),
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: this.rentSysvar.toString(),
          isSigner: false,
          isWritable: false,
        },
      ],
      programId: this.programId.publicKey.toString(),
      data: NewWagerInstruction(bet, value, option),
    });
    const transaction = new Transaction().add(instruction);
    transaction.recentBlockhash = await this.connection.getLatestBlockhash();
    transaction.feePayer = this.provider.publicKey;

    const signature = await this.provider.signAndSendTransaction(transaction);
    console.log("success!");
    await this.connection.getSignatureStatus(signature);
  };

  handleJoinBet = async (id) => {
    //use account info to join based on if bet in id is active
  };

  selectOption(id, option) {
    //use bet id and option
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
        <GridItem style={{ minHeight: "5vh" }} colSpan={30} area={"header"}>
          <Header />
        </GridItem>
        <GridItem
          style={{ minHeight: "95vh" }}
          pl="2"
          colSpan={1}
          bg="#525B88"
          area={"nav"}
        >
          <br />
          <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4}>
            <MdAccountCircle
              onClick={this.openAccModal}
              size={40}
              style={{ color: "white" }}
            />
            <BsFillPlusCircleFill
              onClick={this.openAddModal}
              size={40}
              style={{ color: "white" }}
            />
            <RiMoneyDollarCircleFill
              onClick={this.openJoinModal}
              size={40}
              style={{ color: "white" }}
            />
          </VStack>

          <Modal isOpen={this.state.accIsOpen} onClose={this.onAccClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Account Details</ModalHeader>
              <ModalBody>
                <strong>Name: </strong> {this.state.user.firstName}{" "}
                {this.state.user.lastName}
                <br />
                <br />
                <strong>Email: </strong> {this.state.user.email} <br />
                <br />
                <strong>Trust Score: </strong> {this.state.user.trustScore}{" "}
                <br />
                <br />
                <strong>Betting Score: </strong> {this.state.user.bettingScore}{" "}
                <br />
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={this.onAccClose}>
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
                    <Input
                      value={this.state.name}
                      onChange={this.handleNameChange}
                      placeholder="Bet name"
                    />
                  </FormControl>

                  <br />
                  <Flex>
                    <FormControl isRequired>
                      <FormLabel>Minimum Players</FormLabel>
                      <NumberInput
                        onChange={this.handleminPlayersChange}
                        min={2}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Maximum Players</FormLabel>
                      <NumberInput
                        onChange={this.handlemaxPlayersChange}
                        min={2}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </Flex>

                  <br />
                  <Flex>
                    <FormControl isRequired>
                      <FormLabel>Minimum Bet ($)</FormLabel>
                      <NumberInput
                        onChange={this.handleminBetChange}
                        min={0.0}
                        precision={2}
                        step={0.5}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Maximum Bet ($)</FormLabel>
                      <NumberInput
                        onChange={this.handlemaxBetChange}
                        min={0.0}
                        precision={2}
                        step={0.5}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </Flex>

                  <br />

                  <Flex>
                    <FormControl isRequired>
                      <FormLabel>Options</FormLabel>
                      <Input
                        value={this.state.option}
                        onChange={this.handleOptionNewChange}
                        placeholder="Enter Option"
                      />
                      <Button
                        variant="secondary"
                        onClick={this.handleOptionEnter}
                      >
                        Log Option
                      </Button>
                      <br />
                    </FormControl>
                  </Flex>
                  <br />
                  {OptionsList.map((option) => {
                    return <p key={option}>{option}</p>;
                  })}

                  <br />

                  <FormControl isRequired>
                    <FormLabel>Hours to Bet</FormLabel>
                    <NumberInput
                      value={this.state.time}
                      onChange={this.handleTimeChange}
                      placeholder="Enter Option"
                    >
                      <NumberInputField />
                    </NumberInput>
                  </FormControl>
                </>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={this.onAddClose}>
                  Close
                </Button>
                <Button onClick={this.handleBetSubmit} colorScheme="blue">
                  Wager!
                </Button>
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
                    <Input placeholder="Bet Code" />
                  </FormControl>
                </>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={this.onJoinClose}>
                  Close
                </Button>
                <Button colorScheme="blue">Wager!</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </GridItem>
        <GridItem
          pl="2"
          colSpan={29}
          style={{ minHeight: "95vh" }}
          area={"main"}
        >
          <InfiniteScroll
            dataLength={this.state.bets.length}
            next={this.state.bets}
            hasMore={false}
            loader={<h4>Loading...</h4>}
          >
            {this.state.userBets.map((bet, index) =>
              this.state.betComplete[index] ? (
                <>
                  <Card id={bet.id} style={{ margin: "1rem", width: "90%" }}>
                    <Card.Header>ID: {bet.id}</Card.Header>
                    <Card.Title>{bet.name}</Card.Title>
                    <SimpleGrid columns={2} spacing={10}>
                      <Box>
                        Position: {bet.currentOption} <br />
                        Stake: {bet.stake} <br />
                      </Box>
                      <Box>
                        Total Pot: {bet.total} <br />
                        Total Players: {bet.playerCount} <br />
                        <br />
                      </Box>
                    </SimpleGrid>
                    <Card.Footer align="right">
                      {bet.options.map((option) => (
                        <Button
                          colorScheme="green"
                          mr={3}
                          onClick={this.selectOption(bet.id, option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </Card.Footer>
                  </Card>

                  <Modal
                    isOpen={this.state.betIsOpen}
                    onClose={this.onBetClose(index)}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Make Bet</ModalHeader>
                      <ModalBody>
                        <>
                          <FormControl isRequired>
                            <FormLabel>Bet Option</FormLabel>
                            <Select
                              onChange={this.handleBetOption}
                              placeholder="Select option"
                            >
                              {bet.options.map((option) => (
                                <option value={option}>{option}</option>
                              ))}
                            </Select>
                          </FormControl>

                          <FormControl isRequired>
                            <FormLabel>Bet Value ($)</FormLabel>
                            <NumberInput
                              onChange={this.handleBetValue}
                              min={0.0}
                              precision={2}
                              step={0.5}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                        </>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          variant="ghost"
                          mr={3}
                          onClick={this.onBetClose}
                        >
                          Close
                        </Button>
                        <Button
                          onClick={this.handleBetting(index)}
                          colorScheme="blue"
                        >
                          Wager!
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              ) : (
                <Card id={bet.id} style={{ margin: "1rem", width: "90%" }}>
                  <Card.Header>ID: {bet.id}</Card.Header>

                  <Card.Title>{bet.name}</Card.Title>
                  <Card.Body>
                    <SimpleGrid columns={2} spacing={10}>
                      <Box>
                        Position: {bet.position} <br />
                        Stake: {bet.stake} <br />
                      </Box>
                      <Box>
                        Betting Expires: {bet.time} <br />
                        Total Players: {bet.playerCount} <br />
                        <br />
                      </Box>
                    </SimpleGrid>
                  </Card.Body>
                  <Card.Footer align="right">
                    <Button
                      colorScheme="green"
                      mr={3}
                      onClick={this.openBetModal(index)}
                    >
                      Make Bet
                    </Button>

                    <Modal
                      isOpen={this.state.betIsOpen}
                      onClose={this.onBetClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Make Bet</ModalHeader>
                        <ModalBody>
                          <>
                            <FormControl isRequired>
                              <FormLabel>Bet Option</FormLabel>
                              <Select
                                onChange={this.handleBetOption}
                                placeholder="Select option"
                              >
                                {bet.options.map((option) => (
                                  <option value={option}>{option}</option>
                                ))}
                              </Select>
                            </FormControl>

                            <FormControl isRequired>
                              <FormLabel>Bet Value ($)</FormLabel>
                              <NumberInput
                                onChange={this.handleBetValue}
                                min={0.0}
                                precision={2}
                                step={0.5}
                              >
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            </FormControl>
                          </>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            variant="ghost"
                            mr={3}
                            onClick={this.onBetClose}
                          >
                            Close
                          </Button>
                          <Button
                            onClick={this.handleBetting(index)}
                            colorScheme="blue"
                          >
                            Wager!
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Card.Footer>
                </Card>
              )
            )}

            <Card id="ID" style={{ margin: "1rem", width: "90%" }}>
              <Card.Header>BET NAME</Card.Header>
              <Card.Body>
                <SimpleGrid columns={2} spacing={10}>
                  <Box>
                    Position: POSITION <br />
                    Stake: STAKE <br />
                    Total Pot: POT
                  </Box>
                  <Box>
                    Betting Expires: DATE <br />
                    Total Players: PLAYERS <br />
                    <br />
                  </Box>
                </SimpleGrid>
              </Card.Body>
              <Card.Footer align="right">
                <Button colorScheme="green" mr={3} onClick={this.openBetModal}>
                  Make Bet
                </Button>

                <Modal isOpen={this.state.betIsOpen} onClose={this.onBetClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Make Bet</ModalHeader>
                    <ModalBody>
                      <>
                        <FormControl isRequired>
                          <FormLabel>Bet Code</FormLabel>
                          <Input
                            placeholder="Bet Code"
                            onChange={this.handlejoinCodeChange}
                          />
                        </FormControl>
                      </>
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="ghost" mr={3} onClick={this.onBetClose}>
                        Close
                      </Button>
                      <Button colorScheme="blue" onClick={this.handleJoinBet()}>
                        Wager!
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Card.Footer>
            </Card>
          </InfiniteScroll>
        </GridItem>
      </Grid>
    );
  }
}

/*

*/
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

export default Processing;
