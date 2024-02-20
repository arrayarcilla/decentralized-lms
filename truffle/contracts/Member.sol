// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Account.sol";

contract Member is Account{

    struct barrowItem{
        Item item;
        bool isReturned;
    }
    

    mapping(address => mapping(uint => barrowItem)) internal memberBorrowedList;
    mapping(address => uint) internal borrowedListCount; 
    
    function memeberBorrowHistory() internal view returns(barrowItem[] memory){
        barrowItem[] memory list = new barrowItem[](borrowedListCount[msg.sender]);
      
        for(uint i = 0; i < borrowedListCount[msg.sender]; i++){
            barrowItem memory currentBorrow =  memberBorrowedList[msg.sender][i];
            list[i] = currentBorrow;
        }
        return list;
    }
    function borrow(uint _itemID) internal {
        memberBorrowedList[owner][borrowedListCount[owner]] = barrowItem(itemList[_itemID], false);
        borrowedListCount[owner]++;
        itemList[_itemID].copies--;

        memberItemList[_itemID][memberItemListCount[_itemID]] = memberList[owner];
        memberItemListCount[_itemID]++;
    }
}