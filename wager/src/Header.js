import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Accordion, Nav, Navbar, NavDropdown, Image, Jumbotron, ListGroup, Container, Col, Row, Carousel, Card, Button, Form, CardColumns } from 'react-bootstrap';
import styled from 'styled-components';
import{  
BrowserRouter as Router,
  Route,
  NavLink as Link,
  Switch,
  Redirect,
  useHistory
} from "react-router-dom";
import logo from './assets/cover.png';
import {HOME, DASHBOARD} from './App.js'
const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #15cdfc;
  }
`;


const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #db3d44;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

  class Header extends React.Component{
    render(){
        return(
            <Navbar style = {{backgroundColor: "#198754", color: "#fdfffc", boxShadow:'0vh 0.2vh'}}  expand="lg">
              <Navbar.Brand style = {{marginLeft:'10px'}}><Image src={logo} alt="Wager logo" height="auto" width="100rem"></Image> </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" style = {{backgroundColor: "white"}}/>
              <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto" >
                  <NavLink to={HOME} style = {{color: "white", margin: '5px'}}>
                    Home
                  </NavLink>
                  <NavLink to={DASHBOARD} style = {{color: "white", margin: '5px'}}>
                    Dashboard
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        );
    }

  }
                /*
                <NavBtn>
                  <NavBtnLink to = '/' onClick = {this.signOut} >Sign Out</NavBtnLink>
                </NavBtn>
                */

  export default Header;


