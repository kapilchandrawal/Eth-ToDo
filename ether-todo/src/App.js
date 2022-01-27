import React from 'react';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  isIos,
  isChrome,
  isAndroid
} from "react-device-detect";


export default function App() {


  const [network, setNetwork] = useState('');
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [isConnect, setIsConnect] = useState(false);
  const [isMetamask, setIsMetamask] = useState(true);
  const [abc, setAbc] = useState(false);

  const [input, setInput] = useState('')
  const [ethInput, setEthInput] = useState('')

  useEffect(() => {
    async function loadBlockchainData() {
      if (isConnect === true) {
        console.log(isConnect)
        const web3 = new Web3(Web3.givenProvider)
        // || "http://localhost:8545"
        const networks = await web3.eth.net.getNetworkType()
        setNetwork(networks)
        // console.log("network:", networks)
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts)
        // console.log("Account:", accounts)
        if (accounts[0] != null) {
          const bal = await web3.eth.getBalance(accounts[0])
          setBalance(bal)
        }
      }
    }
    loadBlockchainData()
  }, [account, balance, network, isConnect])
  async function ethEnabled() {
    const provider = await detectEthereumProvider();
    if (provider) {
      startApp(provider); // Initialize your app
      setIsMetamask(true)
    } else {
      setIsMetamask(false)
    }
    function startApp(provider) {
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      }
    }
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(window.ethereum);
        setIsConnect(true)
      }
    }
    catch (err) {
      console.log(err);
    }
  }


  const sendEther = (e) => {
    console.log(account[0])
    setInput(ethInput)
    console.log(typeof (input))


    // Math.floor(input)

    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: account[0],
            to: '0x64aa91dBafe07627F272a93ca46e7A85A7FDd163',

            gas: input,
          },
        ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error);
  }
  async function onDisconnect() {
    console.log("Disconnected", window.ethereum);
    setNetwork('')
    setAccount('')
    setBalance('')
    setIsConnect(false)
  }
  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h1>Welcome</h1>{
        isConnect === true ? <div>
          <p>Your network : {network}</p>
          <p>Your account : {account}</p>
          <p>Your Balance : {balance}</p>
          <button onClick={onDisconnect}>Disconnect</button>
          <div>

            <input type="text" name="name" placeholder="Enter amount here" onChange={(e) => {
              setEthInput(e.target.value); console.log(ethInput)
            }} />
            {abc === true ?
              <button type="button" value="Submit" onClick={sendEther} >Send</button> : ""}
          </div></div> :
          <div>
            <button onClick={ethEnabled}>Connect</button>
          </div>
      }
      {!isMetamask ? <div className="error metamask" style={{ color: 'red' }}>
        {isIos ? <a href='https://metamask.app.link/skAH3BaF99' target='_blank' rel='noreferrer' style={{ color: 'red', textDecoration: 'none' }}>Install metamask for IOS</a> : ""}
        {isAndroid ? <a href='https://metamask.app.link/skAH3BaF99' target='_blank' rel='noreferrer' style={{ color: 'red', textDecoration: 'none' }}>Install metamask for Android</a> : ""}
        {isChrome ? <a href='https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn' target='_blank' rel='noreferrer' style={{ color: 'red', textDecoration: 'none' }}>Install metamask for Chrome</a> : ""}
      </div> : ''}
    </div>
  )
}

// ethereum.request({ method: 'eth_requestAccounts' });
