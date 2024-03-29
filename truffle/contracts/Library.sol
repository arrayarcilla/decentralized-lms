// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Library{

    struct Item {
        MediaType mediaType;
        Category category;
        string title;
        uint itemNumber;
        string publisher;
        uint edition;
        uint year;
        string seriesName;
        string[] tags;
        bool isAvailable;
        uint ID;
    }

    struct BarrowItem{
        Item item;
        bool isbarrowed;
    }

    enum Category{fiction, nonfiction, others, references}
    enum MediaType{Books, NewsClippings, Publications, Software, Thesis}

    uint256 public itemId;
    // address public owner;

    mapping(MediaType =>  Item[]) public sortByMediaType;
    mapping(MediaType => uint) public mediaTypeCount;

    mapping(uint => mapping(uint => Item)) public filter;
    mapping(uint => uint) public filterCount;

    mapping(uint => uint) public specificItemListCount;

    mapping(uint => Item) public itemList;

    //---------------------------------Barrowed Items------------------------------------------

    mapping(address => mapping(uint => BarrowItem)) public memberItemList;
    mapping(address => uint) internal memberItemListCount;

    mapping(uint => mapping(uint => address))public whoBarrowedList;
    mapping(uint => uint) public barrowedItemCount;

    //---------------------------------Account------------------------------------------
    mapping(address => bool) public isAdmin;
    
    constructor()  {
        // owner = msg.sender;
        isAdmin[0xE64E30E8Fd16e1b3Ff71b2A277898a2925BdEBA0] = true;
        itemId = 1;
    }

    function search(uint _filter, string memory _content) public view returns(Item[] memory){
        Item[] memory list =  new Item[](filterCount[_filter]);

        uint resultIndex = 0; // Track the index in the results array

        if(_filter == 1){
            //title
            for(uint i = 0; i < itemId; i++){
                if(keccak256(abi.encodePacked(filter[_filter][filterCount[i]].title)) == keccak256(abi.encodePacked(_content))){
                    Item memory currentItem = filter[_filter][filterCount[i]];
                    list[resultIndex] = currentItem;
                }
            }
        }else if(_filter == 2){
            //publish
            for(uint i = 0; i < itemId; i++){
                if(keccak256(abi.encodePacked(filter[_filter][filterCount[i]].publisher)) == keccak256(abi.encodePacked(_content))){
                    Item memory currentItem = filter[_filter][filterCount[i]];
                    list[resultIndex] = currentItem;
                }
            }
        }else if(_filter == 3){
            //seriesName
            for(uint i = 0; i < itemId; i++){
                if(keccak256(abi.encodePacked(filter[_filter][filterCount[i]].seriesName)) == keccak256(abi.encodePacked(_content))){
                    Item memory currentItem = filter[_filter][filterCount[i]];
                    list[resultIndex] = currentItem;
                }
            }
        }else if(_filter == 4){
            //tags
            for(uint i = 0; i < itemId; i++){
                for(uint j = 0; j < filter[_filter][filterCount[i]].tags.length; j++){
                    if(keccak256(abi.encodePacked(filter[_filter][filterCount[i]].tags[j])) == keccak256(abi.encodePacked(_content))){
                        Item memory currentItem = filter[_filter][filterCount[i]];
                        list[resultIndex] = currentItem;
                    }
                }
                
            }
        }
        


        return list;
    }

    function sort(MediaType _mediaType) public view returns (Item[] memory){
        return sortByMediaType[_mediaType];
    }

    function read() public view returns(Item[] memory){
        Item[] memory list =  new Item[](itemId);

        for(uint i = 0; i < itemId; i++){
            Item memory currentItem = itemList[i];
            list[i] = currentItem;
        }
        return list;
    }

    function getRole() view public returns(string memory){
        return (isAdmin[msg.sender])? "admin": "member";
    }
}
