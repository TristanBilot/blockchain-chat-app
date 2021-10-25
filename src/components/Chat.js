import Web3 from 'web3';
import React, { Component } from 'react';
import ChatApp from '../abis/ChatApp.json'

class Chat extends Component {

    async componentWillMount() {
        console.log(window.ethereum)
        await this.loadWeb3()
        await this.loadBlockchainData()
        await this.listenToMessages()
      }

    constructor(props) {
        super(props)
        let chats = [
            {
                msg: "What are you doing tonight ? Want to go take a drink ?",
                response: true
            },
            {
                msg: "Hey Megan ! It's been a while 😃",
                response: false
            }
        ]
        this.state = {
            chats: chats,
            inputValue: ''
        }
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
          this.setState({ chatContract: chatContract })
        }
        else {
            window.alert('Chat contract not deployed to detected network.')
        }
    }

    async listenToMessages() {
        var binded = this.didReceiveMessageBinded.bind(this)
        this.state.chatContract.events.messageSentEvent({})
        .on('data', binded)
        .on('error', console.error);
    }

    didReceiveMessage(message) {
        let chats = this.state.chats
        chats.push(
            {
                msg: message,
                response: true
            }
        )
        this.setState({
            chats: chats,
            inputValue: ''
        })
    }

    async didReceiveMessageBinded(event){
        const message = event.returnValues.message
        this.didReceiveMessage(message)
    }

    getMessagesAsDivs() {
        let chatDivs = this.state.chats.map(x => x.response ? 
            <div class="message text-only">
                <div class="response">
                    <p class="text"> {x.msg} </p>
                    </div>
                </div> :
            <div class="message text-only">
                <p class="text"> {x.msg} </p>
            </div>
        )
        return chatDivs.reverse()
    }

    async didSendMessage(message) {
        await this.state.chatContract.methods.sendMsg(message).send({ from: this.state.account})
    }

    updateInputValue(evt) {
        this.setState({
          inputValue: evt.target.value
        });
      }

    render() {
        return (
        <body>
            <div class="container">
                <section class="chat">
                    <div class="header-chat">
                    <i class="icon fa fa-user-o" aria-hidden="true"></i>
                    <p class="name">Address</p>
                    <i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
                    </div>
                    <div class="messages-chat">
                    { this.getMessagesAsDivs() }
                    </div>
                </section>
                <div class="footer-chat">
                    <i class="icon fa fa-smile-o clickable" style={{fontSize: "25pt"}} aria-hidden="true"></i>
                    <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} type="text" class="write-message" placeholder="Type your message here"></input>
                    <i class="icon send fa fa-paper-plane-o clickable" aria-hidden="true"></i>
                    <button class="btn btn-success send-btn" onClick={() => this.didSendMessage(this.state.inputValue)}>Send</button>
                </div>
                </div>
        </body>)
    }

}

export default Chat;