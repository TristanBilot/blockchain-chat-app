import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import ChatApp from '../abis/ChatApp.json'
import Chat from "./Chat";

class App extends Component {

  async componentWillMount() {
    console.log(window.ethereum)
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {

      // Need to put ws:// instead of http:// because of web sockets.
      // Web sockets are mandatory to listen to events.
      window.web3 = new Web3(Web3.providers.WebsocketProvider("ws://localhost:7545"))
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData()  {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })

    // Load smart contract
    const networkId =  await web3.eth.net.getId()
    const chatAppData = ChatApp.networks[networkId]
    const abi = ChatApp.abi
    if(chatAppData) {
      const chatContract = new web3.eth.Contract(abi, chatAppData.address)
      this.setState({ chatContract })

      chatContract.events.messageSentEvent({})
        .on('data', async function(event){
            console.log(event.returnValues);
        })
        .on('error', console.error);

      await chatContract.methods.sendMsg("hello").send({ from: this.state.account}).on('transactionHash', (hash)  => {
        console.log("done")
      })

    } else {
      window.alert('Token contract not deployed to detected network.')
    }
  }

  render() {
    return (
      <Chat></Chat>
    );
  }
}

export default App;
