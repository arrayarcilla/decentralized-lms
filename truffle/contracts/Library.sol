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
        string title;    // Title of the borrowed item
        uint itemId;
        bool returned;
    }

    enum Category { fiction, nonfiction, others, references }
    enum MediaType { Books, NewsClippings, Publications, Software, Thesis }

    uint256 public itemId;
    uint public borrowRecordId;
    uint public adminCount;
    uint public memberCount;
    
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

    // Define events
    event ItemAdded(uint itemId);
    event ItemEdited(uint itemId);
    event ItemDeleted(uint itemId);
    event ItemBorrowed(string username, string title);
    event ItemReturned(string username, string title);

    constructor() {
        // Initialize itemId to 1
        itemId = 1;
        borrowRecordId = 1;
        adminCount = 0;
        memberCount = 0;

        isAdmin[0x2665Bcb5bBF409f538B7631e2FD85AA09B200faC] = true;
    }

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only admin can perform this operation");
        _;
    }

//----------------------------------------------------------ADMIN------------------------------------------------------------------

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

    // Function to get list of members who borrowed the item
    function getBorrowers(uint _itemId) public view returns (BorrowRecord[] memory) {
        uint count = 0;
        for (uint i = 1; i < borrowRecordId; i++) {
            if (borrowRecords[i].itemId == _itemId) {
                count++;
            }
        }
        BorrowRecord[] memory borrowers = new BorrowRecord[](count);
        uint index = 0;
        for (uint i = 1; i < borrowRecordId; i++) {
            if (borrowRecords[i].itemId == _itemId) {
                borrowers[index++] = borrowRecords[i];
            }
        }
        return borrowers;
    }

//----------------------------------------------------------MEMBER------------------------------------------------------------------

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
        borrowRecords[borrowRecordId] = BorrowRecord(usernames[msg.sender], items[_itemId].title, _itemId, false);
        emit ItemBorrowed(usernames[msg.sender], items[_itemId].title);
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

        // Mark the item as returned
        for (uint i = 1; i < borrowRecordId; i++) {
            if (borrowRecords[i].itemId == _itemId && keccak256(bytes(borrowRecords[i].username)) == keccak256(bytes(usernames[msg.sender])) && !borrowRecords[i].returned) {
                borrowRecords[i].returned = true;
                break;
            }
        }

        // Emit event for item return
        emit ItemReturned(usernames[msg.sender], items[_itemId].title);
    }

    // Function to get all items borrowed by the sender
    function getMyBorrowedItems() public view returns (BorrowRecord[] memory) {
        uint count = 0;
        for (uint i = 1; i < borrowRecordId; i++) {
            if (keccak256(bytes(borrowRecords[i].username)) == keccak256(bytes(usernames[msg.sender]))) {
                count++;
            }
        }
        BorrowRecord[] memory borrowedItems = new BorrowRecord[](count);
        uint index = 0;
        for (uint i = 1; i < borrowRecordId; i++) {
            if (keccak256(bytes(borrowRecords[i].username)) == keccak256(bytes(usernames[msg.sender]))) {
                borrowedItems[index++] = borrowRecords[i];
            }
        }
        return borrowedItems;
    }

//----------------------------------------------------LIBRARY-----------------------------------------------------

    function setUsername() public {
        require(bytes(usernames[msg.sender]).length == 0, "Username already set");
        if (isAdmin[msg.sender]) {
            require(adminLogged[msg.sender], "Only admins can set their username");
            adminCount++;
            usernames[msg.sender] = string(abi.encodePacked("admin", adminCount));
        } else {
            require(!memberLogged[msg.sender], "Only members can set their username");
            memberCount++;
            string memory memberCountStr = uintToString(memberCount);
            usernames[msg.sender] = string(abi.encodePacked("member", memberCountStr));
        }
    }

    function uintToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
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

    // Function to check if a string contains a substring (case insensitive)
    function containsSubstring(string memory _str, string memory _substr) internal pure returns (bool) {
        bytes memory strBytes = bytes(_str);
        bytes memory substrBytes = bytes(_substr);
        uint256 j;
        for (uint256 i = 0; i < strBytes.length - substrBytes.length + 1; i++) {
            bool found = true;
            for (j = 0; j < substrBytes.length; j++) {
                if (bytesToLower(strBytes[i + j]) != bytesToLower(substrBytes[j])) {
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

    // Function to convert bytes to lowercase
    function bytesToLower(bytes1 _b) internal pure returns (bytes1) {
        if (_b >= 0x41 && _b <= 0x5A) {
            return bytes1(uint8(_b) + 32);
        }
        return _b;
    }
}
