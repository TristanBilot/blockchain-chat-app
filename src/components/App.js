import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import ChatApp from '../abis/ChatApp.json'
import Chat from "./Chat";

class App extends Component {

  // async componentWillMount() {
  //   console.log(window.ethereum)
  //   await this.loadWeb3()
  //   await this.loadBlockchainData()
  // }

  

  render() {
    return (
      <Chat></Chat>
    );
  }
}

export default App;
