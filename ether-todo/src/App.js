import React from 'react';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';

export default function App() {

  const [network, setNetwork] = useState('');
  const [accounts, setAccount] = useState('');
  const [balance, setBalance] = useState('');

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
  },)

  return (

    <div className="container">
      <h1>Welcome</h1>
      <p>Your network : {network}</p>
      <p>Your account : {accounts}</p>
      <p>Your Balance : {balance}</p>
      {/* <button onClick={() => {
          ethereum.request({ method: 'eth_requestAccounts' });
        }}>Enable Ethereum</button> */}
    </div>

  )
}
