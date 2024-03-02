// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Library.sol";

contract Member is Library{
    
    function memeberBorrowHistory() public view returns(BarrowItem[] memory){
        BarrowItem[] memory list = new BarrowItem[](memberItemListCount[msg.sender]);
      
        for(uint i = 0; i < memberItemListCount[msg.sender]; i++){
            BarrowItem memory currentBorrow =  memberItemList[msg.sender][i];
            list[i] = currentBorrow;
        }
        return list;
    }
    
    function borrow(uint _itemID) public {
        //records what specific Item this current member is barrowing
        memberItemList[msg.sender][memberItemListCount[msg.sender]] = BarrowItem(itemList[_itemID], false);
        //increment the number of Item the current member barrowed
        memberItemListCount[msg.sender]++;
        //reduce the specific Item availability count
        specificItemListCount[_itemID]--;
        //record each member who barrowed this specific Item
        whoBarrowedList[_itemID][barrowedItemCount[_itemID]] = msg.sender;
    }

    function practice()pure public returns(bool){
        return true;
    }
}