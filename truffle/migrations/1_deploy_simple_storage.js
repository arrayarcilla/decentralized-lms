const Library = artifacts.require("Library");
const Account = artifacts.require("Account");
const Member = artifacts.require("Member");
const Admin = artifacts.require("Admin");

module.exports = function (deployer) {
  deployer.deploy(Library);
  deployer.deploy(Account);
  deployer.deploy(Member);
  deployer.deploy(Admin);
};
