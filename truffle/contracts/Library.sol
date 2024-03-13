// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Library {
    struct Item {
        uint ID;
        MediaType mediaType;
        Category category;
        string title;
        string author;
        uint isbn;
        string publisher;
        bool isAvailable;
        uint copies;
    }

    struct BarrowItem {
        Item item;
        bool isbarrowed;
    }

    struct BorrowRecord {
        string username; // Username of the borrower
        uint itemId;
        uint borrowTimestamp;
    }

    enum Category { fiction, nonfiction, others, references }
    enum MediaType { Books, NewsClippings, Publications, Software, Thesis }

    uint256 public itemId;
    mapping(uint256 => Item) public items;
    mapping(MediaType => Item[]) public sortByMediaType;
    mapping(MediaType => uint256) public mediaTypeCount;
    mapping(address => bool) public isAdmin;
    mapping(address => string) public usernames;
    mapping(address => bool) public adminLogged;
    mapping(address => uint) public adminOrder;
    mapping(address => bool) public memberLogged;
    mapping(address => uint) public memberOrder;
    mapping(uint => BorrowRecord) public borrowRecords;
    uint public borrowRecordId;
    uint public adminCount;
    uint public memberCount;

    // Define events
    event ItemAdded(uint itemId);
    event ItemEdited(uint itemId);
    event ItemDeleted(uint itemId);
    event ItemBorrowed(string username, uint itemId, uint borrowTimestamp);
    event ItemReturned(string username, uint itemId);

    constructor() {
        // Initialize itemId to 1
        itemId = 1;
        borrowRecordId = 1;
        adminCount = 0;
        memberCount = 0;
        
        // Initialize admins
        isAdmin[0xA74EC9907ce644498ed71cffDd157530441D151D] = true;
    }

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only admin can perform this operation");
        _;
    }
//-----------------------------------------------------ADMIN--------------------------------------------------------------
    // Function to add an item to the library
    function addItem(
        MediaType _mediaType,
        Category _category,
        string memory _title,
        string memory _author,
        uint _isbn,
        string memory _publisher,
        bool _isAvailable,
        uint _copies
    ) public onlyAdmin {
        Item memory newItem = Item(
            itemId,
            _mediaType,
            _category,
            _title,
            _author,
            _isbn,
            _publisher,
            _isAvailable,
            _copies
        );

        items[itemId] = newItem;
        itemId++;

        sortByMediaType[_mediaType].push(newItem);
        mediaTypeCount[_mediaType]++;

        emit ItemAdded(itemId - 1);
    }

    // Function to edit an existing item in the library
    function editItem(
        uint _itemId,
        MediaType _mediaType,
        Category _category,
        string memory _title,
        string memory _author,
        uint _isbn,
        string memory _publisher,
        bool _isAvailable,
        uint _copies
    ) public onlyAdmin {
        require(_itemId > 0 && _itemId < itemId, "Invalid item ID");

        Item storage item = items[_itemId];
        item.mediaType = _mediaType;
        item.category = _category;
        item.title = _title;
        item.author = _author;
        item.isbn = _isbn;
        item.publisher = _publisher;
        item.isAvailable = _isAvailable;
        item.copies = _copies;

        emit ItemEdited(_itemId);
    }

    // Function to soft delete an item (set isAvailable to false)
    function deleteItem(uint _itemId) public onlyAdmin {
        require(_itemId > 0 && _itemId < itemId, "Invalid item ID");

        items[_itemId].isAvailable = false;

        emit ItemDeleted(_itemId);
    }

//-----------------------------------------------------MEMBER--------------------------------------------------------------

    // Function to borrow an item by its ID
    function borrowItem(uint _itemId) public {
        require(_itemId > 0 && _itemId < itemId, "Invalid item ID");

        // Check if the item is available for borrowing
        require(items[_itemId].isAvailable, "Item is not available for borrowing");

        // Check if there are available copies of the item to borrow
        require(items[_itemId].copies > 0, "No available copies left for borrowing");

        // Decrement the count of available copies
        items[_itemId].copies--;

        // Record the borrowing including username
        borrowRecords[borrowRecordId] = BorrowRecord(usernames[msg.sender], _itemId, block.timestamp);
        emit ItemBorrowed(usernames[msg.sender], _itemId, block.timestamp);
        borrowRecordId++;

        // If there are no more copies available, mark the item as unavailable
        if (items[_itemId].copies == 0) {
            items[_itemId].isAvailable = false;
        }
    }

    // Function to return an item by its ID
    function returnItem(uint _itemId) public {
        require(_itemId > 0 && _itemId < itemId, "Invalid item ID");

        // Check if the item is borrowed
        bool found = false;
        for (uint i = 1; i < borrowRecordId; i++) {
            if (borrowRecords[i].itemId == _itemId && keccak256(bytes(borrowRecords[i].username)) == keccak256(bytes(usernames[msg.sender]))) {
                found = true;
                break;
            }
        }
        require(found, "Item is not borrowed by the sender");

        // Increment the count of available copies
        items[_itemId].copies++;

        // Mark the item as available
        items[_itemId].isAvailable = true;

        // Emit event for item return
        emit ItemReturned(usernames[msg.sender], _itemId);
    }

    // Function to get all books borrowed by a member
    function getBorrowedBooksByMember(address _member) public view returns (Item[] memory) {
        uint count = 0;
        for (uint i = 1; i < borrowRecordId; i++) {
            if (borrowRecords[i].borrower == _member) {
                count++;
            }
        }

        Item[] memory borrowedBooks = new Item[](count);
        uint index = 0;
        for (uint i = 1; i < borrowRecordId; i++) {
            if (borrowRecords[i].borrower == _member) {
                borrowedBooks[index++] = items[borrowRecords[i].itemId];
            }
        }

        return borrowedBooks;
    }

//-----------------------------------------------------LIBRARY--------------------------------------------------------------

    // Function to set username for the sender
    function setUsername() public {
        require(bytes(usernames[msg.sender]).length == 0, "Username already set");
        if (isAdmin[msg.sender]) {
            require(adminLogged[msg.sender], "Only admins can set their username");
            adminCount++;
            usernames[msg.sender] = string(abi.encodePacked("admin", adminCount));
        } else {
            require(memberLogged[msg.sender], "Only members can set their username");
            memberCount++;
            usernames[msg.sender] = string(abi.encodePacked("member", memberCount));
        }
    }

    // Function to read username of the sender
    function getUsername(address _user) public view returns (string memory) {
        return usernames[_user];
    }

    // Function to log admin in
    function loginAdmin() public {
        require(isAdmin[msg.sender], "Only admin can log in");
        require(!adminLogged[msg.sender], "Admin already logged in");

        adminLogged[msg.sender] = true;
    }

    // Function to log member in
    function loginMember() public {
        require(!isAdmin[msg.sender], "Members cannot log in as admin");
        require(!memberLogged[msg.sender], "Member already logged in");

        memberLogged[msg.sender] = true;
    }

    // Function to read all items added to the library
    function readAllItems() public view returns (Item[] memory) {
        Item[] memory allItems = new Item[](itemId - 1);

        for (uint256 i = 1; i < itemId; i++) {
            allItems[i - 1] = items[i];
        }

        return allItems;
    }

    // Function to search for items based on title, author, or publisher
    function searchItems(string memory _keyword) public view returns (Item[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i < itemId; i++) {
            if (
                containsSubstring(items[i].title, _keyword) ||
                containsSubstring(items[i].author, _keyword) ||
                containsSubstring(items[i].publisher, _keyword)
            ) {
                count++;
            }
        }

        Item[] memory searchResults = new Item[](count);
        uint256 index = 0;
        for (uint256 i = 1; i < itemId; i++) {
            if (
                containsSubstring(items[i].title, _keyword) ||
                containsSubstring(items[i].author, _keyword) ||
                containsSubstring(items[i].publisher, _keyword)
            ) {
                searchResults[index++] = items[i];
            }
        }

        return searchResults;
    }

    // Function to check if a string contains a substring
    function containsSubstring(string memory _string, string memory _substring) private pure returns (bool) {
        bytes memory stringBytes = bytes(_string);
        bytes memory substringBytes = bytes(_substring);

        if (stringBytes.length < substringBytes.length) {
            return false;
        }

        for (uint256 i = 0; i <= stringBytes.length - substringBytes.length; i++) {
            bool found = true;
            for (uint256 j = 0; j < substringBytes.length; j++) {
                if (stringBytes[i + j] != substringBytes[j]) {
                    found = false;
                    break;
                }
            }
            if (found) {
                return true;
            }
        }
        return false;
    }

    // Function to get items by media type
    function getItemsByMediaType(MediaType _mediaType) public view returns (Item[] memory) {
        return sortByMediaType[_mediaType];
    }

    // Function to get the role of the user (admin or member)
    function getUserRole() public view returns (string memory) {
        return isAdmin[msg.sender] ? "admin" : "member";
    }
}