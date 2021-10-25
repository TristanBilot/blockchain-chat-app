import React, { Component } from 'react';

class Chat extends Component {

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
            chats: chats
        }
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

    didReceiveMessage(message) {
        let chats = this.state.chats
        chats.push(
            {
                msg: message,
                response: true
            }
        )
        this.setState({
            chats: chats
        })
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
                    <input type="text" class="write-message" placeholder="Type your message here"></input>
                    <i class="icon send fa fa-paper-plane-o clickable" aria-hidden="true"></i>
                    <button  class="btn btn-success send-btn" onClick={() => this.didReceiveMessage("test")}>Send</button>
                </div>
                </div>
        </body>)
    }

}

export default Chat;