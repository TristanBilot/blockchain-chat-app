const ChatApp = artifacts.require("ChatApp");

module.exports = function(deployer) {
  deployer.deploy(ChatApp);
};
