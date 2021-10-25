// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;

contract ChatApp {

    mapping (address => string) public messages;

    event messageSentEvent(address indexed from, address indexed to, string message);

    function sendMsg(address to, string memory message) public {
        emit messageSentEvent(msg.sender, to, message);
    }
}