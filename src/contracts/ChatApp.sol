// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;

contract ChatApp {
    string public name = "test";
    uint32 private i = 0;
    mapping (address => string) public messages;

    event messageSentEvent(address indexed from, address indexed to, string message);

    function increment() public returns (uint32 index) {
        i = i + 1;
        return i;
    }

    function getMsg() public view returns (string memory) {
        return messages[msg.sender];
    }

    function sendMsg(string memory message) public {
        emit messageSentEvent(msg.sender, msg.sender, message);
    }
}
