// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Library.sol";

contract Admin is Library{

    function addItem( MediaType _mediaType, Category _category, string memory _title, uint _itemNumber, string memory _publish, uint _edition,  uint _year, string memory _seriesName, string[] memory _tags, uint _copies, bool _isAvailable) public {
        
        Item memory tempItem = Item(_mediaType, _category, _title, _itemNumber, _publish, _edition, _year, _seriesName, _tags, _isAvailable, itemId);
        
        itemList[itemId] =  tempItem;
        itemId++;
        specificItemListCount[itemId] = _copies;


        sortByMediaType[_mediaType].push(tempItem);
        mediaTypeCount[_mediaType]++;

        for(uint i = 0; i < 5; i++){
            filter[i][filterCount[i]] = tempItem;
            filterCount[i]++;
        }
    }
    

    function deleteItem(uint _ID) public {
        itemList[_ID].isAvailable = false;
    }

    function editItem( uint _ID, Category _category, string memory _seriesName, string[] memory _tags, uint _copies, bool _isAvailable) public {
        Item memory tempItem = Item(itemList[_ID].mediaType, _category, itemList[_ID].title, itemList[_ID].itemNumber, itemList[_ID].publisher, itemList[_ID].edition, itemList[_ID].year, _seriesName, _tags, _isAvailable, itemId);
        itemList[_ID] =  tempItem;
        specificItemListCount[_ID] = _copies;
    }

    function showListOfMemebersFromBarrowedITem(uint _itemID)public view returns(address[] memory){
        address[] memory list = new address[](barrowedItemCount[_itemID]);
      
        for(uint i = 0; i < barrowedItemCount[_itemID]; i++){
            address currentMember =  whoBarrowedList[_itemID][i];
            list[i] = currentMember;
        }
        return list;
    }
}