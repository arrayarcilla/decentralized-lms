const Library = artifacts.require("Library");
const Member = artifacts.require("Member");
const Admin = artifacts.require("Admin");

module.exports = function (deployer) {
  deployer.deploy(Library);;
  deployer.deploy(Member);
  deployer.deploy(Admin);
};
