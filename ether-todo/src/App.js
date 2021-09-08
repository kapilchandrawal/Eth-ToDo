import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider)
    // || "http://localhost:8545"

    const network = await web3.eth.net.getNetworkType()
    console.log("network:", network)

    const accounts = await web3.eth.getAccounts()
    console.log("Account:", accounts)

    const balance = await web3.eth.getBalance(accounts[0])
    console.log("balance:", balance)

    this.setState({
      network: network,
      account: accounts,
      balance: balance
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      balance: ''
    }
  }
  render() {
    return (
      <div className="container">
        <h1>Welcome</h1>
        <p>Your network : {this.state.network}</p>
        <p>Your account : {this.state.account}</p>
        <p>Your Balance : {this.state.balance}</p>
        {/* <button onClick={() => {
          ethereum.request({ method: 'eth_requestAccounts' });
        }}>Enable Ethereum</button> */}
      </div>
    );
  }
}

export default App;