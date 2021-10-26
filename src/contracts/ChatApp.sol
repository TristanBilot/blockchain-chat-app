// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;

contract ChatApp {

    mapping (address => string) public messages;

    event messageSentEvent(address indexed from, address indexed to, string message);
    event etherSentEvent(address indexed from, address indexed to, bool success);

    function sendMsg(address to, string memory message) public {
        emit messageSentEvent(msg.sender, to, message);
    }

    function sendEther(address payable to) public payable {
        bool sent = to.send(msg.value);
        emit etherSentEvent(msg.sender, to, sent);

        require(sent, "Failed to send Ether");
    }
}
