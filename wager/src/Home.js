import React from "react";
import {
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
import cover from "./assets/cover.png";
import DASHBOARD from "./App.js";
import Particles from "react-tsparticles"

function Home() {
  return (
    <div id="main">
        <Particles
    params={{
	    "particles": {
	        "number": {
	            "value": 160,
	            "density": {
	                "enable": false
	            }
	        },
	        "size": {
	            "value": 3,
	            "random": true,
	            "anim": {
	                "speed": 4,
	                "size_min": 0.3
	            }
	        },
	        "line_linked": {
	            "enable": false
	        },
	        "move": {
	            "random": true,
	            "speed": 1,
	            "direction": "top",
	            "out_mode": "out"
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "bubble"
	            },
	            "onclick": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        },
	        "modes": {
	            "bubble": {
	                "distance": 250,
	                "duration": 2,
	                "size": 0,
	                "opacity": 0
	            },
	            "repulse": {
	                "distance": 400,
	                "duration": 4
	            }
	        }
	    }
	}} />
      <Flex justify="center" minHeight="100vh" alignItems="center">
        <Box>
          <Image
            src={cover}
            alt="Wager logo"
            height="auto"
            width="40rem"
          ></Image>
        </Box>
        <Box>
          <br />
          <br />
          <br />
          <Text fontSize="4xl">
            <strong>Let's make betting Social!</strong>
          </Text>
          <Center>
            <a href="/Dashboard">
              <Button bgColor="#2ec4b6" marginTop="2rem">
                Get Started
              </Button>
            </a>
          </Center>
        </Box>
      </Flex>
    </div>
  );
}

export default Home;
