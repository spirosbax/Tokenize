import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {isMobile} from 'react-device-detect'
import Select from 'react-select'
import { Button } from 'react-bootstrap'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import './Create.css'

import ConditionalInput from './ConditionalInput.js'
import erc20 from '../solidity/contracts/ERC20.sol'
import erc20Interface from '../solidity/contracts/ERC20Interface.sol'
import safeMath from '../solidity/libraries/SafeMath.sol'

const Web3 = require('web3')
var web3
var netId

const solcWrapper = require('solc/wrapper')
const solc = solcWrapper(window.Module)

var netIdtoName = {
    1: "mainnet",
    2: "morden",
    3: "ropsten",
    4: "rinkeby",
    42: "kovan"
}
var input = {
    "ERC20.sol": erc20,
    "ERC20Interface.sol": erc20Interface,
    "SafeMath.sol": safeMath
}

const options = [
  { value: 'ERC20', label: 'ERC20' },
  { value: 'ERC223', label: 'ERC223' },
  { value: 'ERC721', label: 'ERC721' },
  { value: 'ERC777', label: 'ERC777' }
]

class Create extends Component {
    constructor(props){
        super(props)
        this.state = {
            tokenName:"",
            tokenDecimals: null,
            tokenTotalSupply: null,
            tokenSymbol: "",
            tokenSelectedType: null,
            founderOption: false,
            founderAddress: "",
            defaultFounderAddress: ""
        }
        this.launchContract = this.launchContract.bind(this)
        this.validateParameters = this.validateParameters.bind(this)
        this.founderChange = this.founderChange.bind(this)
    }

    componentDidMount() {
        this.setUpWeb3()
        this.acknowlegdeNetwork()
    }

    async setUpWeb3(){
        if (window.ethereum) {
            web3 = new Web3(window.ethereum)
            try {
                await window.ethereum.enable()
            } catch (error) {
                alert("Please accept access")
            }
        } else if (window.web3) {
            web3 = new Web3(Web3.givenProvider)
        } else {
            alert("please insall metamask")
            //TODO redirect to install metamask
        }
        await web3.eth.getAccounts()
        .then((accounts) => {
            if (accounts[0] == undefined) {
                alert("Please login to MetaMask")
            }
            web3.eth.defaultAccount = accounts[0]
            this.state.defaultFounderAddress = accounts[0]
            console.log("Default account is " + accounts[0])
        })
        .catch((error) => {
            console.log(error)
        })
    }


    acknowlegdeNetwork() {
        web3.eth.net.getId()
        .then((netid) => {
            console.log("This is the ", netIdtoName[netid])
            netId = netid
        })
    }

    handleChange = (selectedType) => {
        this.setState({ tokenSelectedType : selectedType})
    }

    founderChange = (event) => {
        event.preventDefault()
        this.setState({ founderAddress: event.target.value })
    }

    launchContract() {
        this.validateParameters()

        const compiled = solc.compile({sources: input}, 1)
        var erc20Compiled = compiled.contracts["ERC20.sol:ERC20"]
        var erc20ABI = JSON.parse(erc20Compiled.interface)
        var erc20Contract = new web3.eth.Contract(erc20ABI)


        erc20Contract.deploy({
            data: erc20Compiled.bytecode,
            arguments: [this.state.founderOption ? this.state.founderAddress : this.state.defaultFounderAddress,
                        this.state.tokenName,
                        this.state.tokenSymbol,
                        this.state.tokenDecimals,
                        this.state.tokenTotalSupply]
        }).send({
            from: web3.eth.defaultAccount
        }, function(error, txHash){
            if(error){
                console.log(error)
            }
            console.log("view transaction at https://", netId === 1 ? "" : netIdtoName[netId]+".", "etherscan.io/tx/", txHash)
        }).on('error', function(error){
            console.log(error)
        }).on('transactionHash', function(transactionHash){
            console.log(transactionHash)
        }).on('receipt', function(receipt){
            console.log(receipt)
        }).on('confirmation', function(confirmationNumber, receipt){
            console.log(confirmationNumber, receipt)
        }).then(function(newContractInstance){
            console.log(newContractInstance.options.address) // instance with the new contract address
            console.log("view address at https://", netId === 1 ? "" : netIdtoName[netId]+".", "etherscan.io/address/", newContractInstance.options.address)
        });
    }

    validateParameters(){
        console.log(this.state)
    }

    render() {
        // console.log("isMobile: ", isMobile)
        return (
            <div class="create">
                <Card id="forms">
                    <CardContent>
                        <form>
                            <label for="type">Token Type</label>
                            <Select className="type" value={this.state.tokenSelectedType} onChange={this.handleChange} options={options} />
                            <hr/>

                            <div className="form-group">
                                <label for="name">Token Name</label>
                                <input type="string" className="form-control" placeholder="eg. IonioCoin"
                                value={this.state.tokenName} onChange={e => this.setState({ tokenName: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label for="decimals">Token Decimals</label>
                                <input type="number" className="form-control" placeholder="eg. 18"
                                value={this.state.tokenDecimals} onChange={e => this.setState({ tokenDecimals: e.target.value })}/>
                            </div>

                            <div className="form-group">
                                <label for="totalSupply">Total token supply</label>
                                <input className="form-control" placeholder="eg. 1000000"
                                value={this.state.tokenTotalSupply} onChange={e => this.setState({ tokenTotalSupply: e.target.value })}/>
                            </div>

                            <div className="form-group">
                                <label for="symbol">Token symbol</label>
                                <input type="string" className="form-control" placeholder="eg. BTC"
                                value={this.state.tokenSymbol} onChange={e => this.setState({ tokenSymbol: e.target.value })}/>
                            </div>

                            <FormGroup id="founderOption">
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.founderOption}
                                            onChange={event => this.setState({ founderOption: event.target.checked })}
                                        />
                                    }
                                    label="Provide a different founder"
                                />
                            </FormGroup>

                            <ConditionalInput founderOption={this.state.founderOption} founderChange={this.founderChange}/>

                            <Button bsStyle="primary" onClick={this.launchContract}>
                                Launch Contract
                            </Button>


                        </form>
                    </CardContent>
                </Card>

                <Card id="text" style={{flex: isMobile ? "0 1 auto" : "0 1 50%"}}>
                    <CardContent>
                        <h3>Token Name</h3>
                        The name of the token for example: Bitcoin or Litecoin.
                        <h3>Token Decimals</h3>
                        The level of divisibility that the token will have.
                        For example, if a token has 1 decimal point, then the minimum amount that can be transfered is 0.1, if it has 2 decimal points the minumun is 0.01, and so on.
                        It is recomended to set this parameter to 18.
                        <h3>Token Total Supply</h3>
                        The number of tokens with will be created in total.
                        <h3>Token Symbol</h3>
                        The symbol of the token, for example, Bitcoin's symbol is BTC, Euro's symbol is EUR, and so on.
                        <h3>Provide a different founder address</h3>
                        By default all of the tokens that will be created are going to be transfered to your active metamask account.
                        If you want to change that and transfer the funds to another wallet, enable this option and provide the address that you want the funds transfered to.
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Create
