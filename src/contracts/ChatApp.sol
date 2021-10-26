// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;

contract ChatApp {

    mapping (address => mapping (address => Message[])) public messages;

    struct Message {
        string message;
        address from;
    }

    event messageSentEvent(address indexed from, address indexed to, string message);
    event etherSentEvent(address indexed from, address indexed to, bool success);
    event messagesFetchedEvent(address indexed from, address indexed to, Message[] messages);

    function sendMsg(address to, string memory message) public {
        messages[msg.sender][to].push(Message(message, msg.sender));
        messages[to][msg.sender].push(Message(message, msg.sender));
        emit messageSentEvent(msg.sender, to, message);
    }

    function sendEther(address payable to) public payable {
        bool sent = to.send(msg.value);
        emit etherSentEvent(msg.sender, to, sent);

        require(sent, "Failed to send Ether");
    }

    function getAllMsg(address to) public {
        if (messages[msg.sender][to].length == 0) {
            emit messagesFetchedEvent(msg.sender, to, messages[to][msg.sender]);
        }
        else {
            emit messagesFetchedEvent(msg.sender, to, messages[msg.sender][to]);
        }
    }
}
