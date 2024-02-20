// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Library.sol";

contract Account is Library{
  struct member{
    string fName;
    string lName;
    uint birthday;
    string homeAddress;
    string email;
    string password;
  }

  // enum role{memeber, admin, none}

  mapping(uint => mapping(uint => member)) memberItemList;
  mapping(uint => uint) internal memberItemListCount;

  mapping(address => member) memberList;
  mapping(address => bool) internal isAdmin;
  mapping(address => bool) internal isMember;

  // mapping(address => role)public assignedRole;

  function login( string memory _password) internal view returns(bool){
    bool temp = false;
    if(isMember[msg.sender]){
        temp = keccak256(abi.encodePacked(memberList[msg.sender].password)) == keccak256(abi.encodePacked(_password));
        // bytes32 reHashed = keccak256(abi.encodePacked(hashedPassword, user.salt));
        // temp = (reHashed == user.salt); // Replace keccak256 with your chosen hash function
    }else if(isAdmin[msg.sender]){
        temp = true;
    }

    return temp;
  }

  function signUp( string memory _fName, string memory _lName, uint _dob, string memory _homeAddress, string memory _email, string memory _password ) internal {
    isMember[msg.sender] = true;
    memberList[msg.sender] = member(_fName, _lName, _dob, _homeAddress, _email, _password);
  }
}