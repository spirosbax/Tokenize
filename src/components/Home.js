import React, { Component } from 'react'
import './Home.css'

class Home extends Component {
    render() {
        return (
            <div className="App-body">
              <div className="flex-item App-tokenize">
                Tokenize Anything
              </div>
              <div className="flex-item App-create">
                Create <span>Secure</span>, <span>Decentralized</span>, Ethereum Tokens
              </div>
            </div>
        );
    }
}

export default Home
