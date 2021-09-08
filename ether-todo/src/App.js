import React from 'react';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
// import detectEthereumProvider from '@metamask/detect-provider';


export default function App() {

  const [network, setNetwork] = useState('');
  const [accounts, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  // const ethereum = window.ethereum;
  // if (ethereum) {
  //   ethereum.on('accountsChanged', function (accounts) {
  //     // Time to reload your interface with accounts[0]!
  //     console.log(accounts[0])
  //   });
  // }
  useEffect(() => {

    async function loadBlockchainData() {
      const web3 = new Web3(Web3.givenProvider)
      // || "http://localhost:8545"

      const network = await web3.eth.net.getNetworkType()
      setNetwork(network)
      console.log("network:", network)

      const accounts = await web3.eth.getAccounts()
      setAccount(accounts)
      console.log("Account:", accounts)

      const balance = await web3.eth.getBalance(accounts[0])
      setBalance(balance)
      console.log("balance:", balance)
    }
    loadBlockchainData()
  } )

  const Web3 = require("web3");
  async function ethEnabled() {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(window.ethereum);
      }

      if (!ethEnabled()) {
        alert("Please install MetaMask to use this dApp!");
      }
    }
    catch (err) {
      console.log(err);
    }
  }



    return (

      <div className="container">

        <h1>Welcome</h1>
        <p>Your network : {network}</p>
        <p>Your account : {accounts}</p>
        <p>Your Balance : {balance}</p>
        <button onClick={ethEnabled}>Enable Ethereum</button>
      </div>

    )
  }
// ethereum.request({ method: 'eth_requestAccounts' });
