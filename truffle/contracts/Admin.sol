// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Account.sol";

contract Admin is Account{

    function addItem( MediaType _mediaType, Category _category, string memory _title, uint _itemNumber, string memory _publish, uint _edition,  uint _year, string memory _seriesName, string[] memory _tags, uint _copies, bool _isAvailable) internal {
        
        Item memory tempItem = Item(_mediaType, _category, _title, _itemNumber, _publish, _edition, _year, _seriesName, _tags, _copies, _isAvailable, itemId);
        
        itemList[itemId] =  tempItem;
        itemId++;

        sortByMediaType[_mediaType].push(tempItem);
        mediaTypeCount[_mediaType]++;

        for(uint i = 0; i < 5; i++){
            filter[i][filterCount[i]] = tempItem;
            filterCount[i]++;
        }
    }
    

    function deleteItem(uint _ID) internal {
        itemList[_ID].isAvailable = false;
    }

    function editItem( Category _category, string memory _seriesName, string[] memory _tags, uint _copies, bool _isAvailable, uint _ID) internal {
        Item memory tempItem = Item(itemList[_ID].mediaType, _category, itemList[_ID].title, itemList[_ID].itemNumber, itemList[_ID].publisher, itemList[_ID].edition, itemList[_ID].year, _seriesName, _tags, _copies, _isAvailable, itemId);
        
        itemList[_ID] =  tempItem;
    }

    function showLIstOfMemebersFromBarrowedITem(uint _itemID)internal view returns(member[] memory){
        member[] memory list = new member[](memberItemListCount[_itemID]);
      
        for(uint i = 0; i < memberItemListCount[_itemID]; i++){
            member memory currentMember =  memberItemList[_itemID][i];
            list[i] = currentMember;
        }
        return list;
    }

    // function deleteMemeber(uint _memeberId)public {

    // }
}