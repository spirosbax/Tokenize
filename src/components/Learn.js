import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {isMobile} from 'react-device-detect'
import './Learn.css'

class Learn extends Component {
    render(){
        return (
            <div className="learn">
                <div className="learn-definition">
                    <div className="definition">
                        <q>Ethereum is a platform that can be used to create any arbitrary smart contract <br/>
                            including smart contracts that represent digital assets called Ethereum tokens</q>
                    </div>
                    <div className="definition-link">
                        <a href="https://blog.coinbase.com/a-beginners-guide-to-ethereum-tokens-fbd5611fe30b">
                            https://blog.coinbase.com/a-beginners-guide-to-ethereum-tokens-fbd5611fe30b
                        </a>
                    </div>
                </div>

                <div className="learn-tokens" style={{flexFlow: isMobile ? "row wrap" : "row"}}>
                    <Card id="erc20">
                        <CardContent>
                            <h3 className="card-head">ERC20</h3>
                            <span>
                            ERC-20 defines a common list of rules for Ethereum tokens to follow within the larger Ethereum ecosystem, allowing developers to accurately predict interaction between tokens.
                            These rules include how the tokens are transferred between addresses and how data within each token is accessed.
                            </span>
                        </CardContent>
                    </Card>
                    <Card id="erc223">
                        <CardContent>
                            <h3 className="card-head">ERC223</h3>
                            <span>
                            ERC223 is backwards compatible with ERC20 meaning every software that supports ERC20 will also supports ERC223. In additions, ERC223 merges the token transfer function among wallets and contracts into one single function ‘transfer’. The biggest change is that ERC223 no longer allow token to be transferred to a contract that does not allow token to be withdrawn. Before ERC223, if someone send his/her token into a contract that has not allowed anyone to use it, the token will simply be locked and can never leave that contract. Because of this, hundreds of thousands of dollars’ worth of ERC20 token has been locked up.
                            </span>
                        </CardContent>
                    </Card>
                    <Card id="erc721">
                        <CardContent>
                            <h3 className="card-head">ERC721</h3>
                            <span>
                            ERC-721 is a free, open standard that describes how to build non-fungible or unique tokens on the Ethereum blockchain. While most tokens are fungible (every token is the same as every other token), ERC-721 tokens are all unique.
                            Think of them like rare, one-of-a-kind collectables
                            </span>
                        </CardContent>
                    </Card>
                    <Card id="erc777">
                        <CardContent>
                            <h3 className="card-head">ERC777</h3>
                            <span>
                            ERC777 is a new fungible token standard that relies on ERC820 (Contract pseudo-introspection registry) and tries to solve ERC20’s problems, such as lack of transaction handling mechanisms that led to the loss of millions of dollars from the Ethereum ecosystem. In short, ERC777 focuses on adoption by offering a wide range of transaction handling mechanisms.
                            </span>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Learn
