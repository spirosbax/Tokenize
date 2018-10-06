import React, { Component } from 'react'
import { Navbar, Nav, NavItem, MenuItem} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap"
import { Link, Route } from 'react-router-dom'
import './App.css'

import Home from './components/Home.js'
import Learn from './components/Learn.js'
import Create from './components/Create.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/home">Home</Link>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <LinkContainer to="/home">
                    <NavItem className="App-navbar-item" eventKey={1}>
                        Home
                    </NavItem>
                </LinkContainer>

                <LinkContainer to="/learn">
                    <NavItem className="App-navbar-item" eventKey={2}>
                        Learn
                    </NavItem>
                </LinkContainer>

                <LinkContainer to="/create">
                    <MenuItem className="App-navbar-item" eventKey={3}>
                        Create
                    </MenuItem>
                </LinkContainer>

              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/home" component={Home}/>
            <Route path="/learn" component={Learn}/>
            <Route path="/create" component={Create}/>
        </div>
      </div>
    );
  }
}

export default App
