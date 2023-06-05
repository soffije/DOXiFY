//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Chat {
    struct User{
        address selfAddress;
        address[] friends;
        address[] requests;
        address[] pending;
        string public_key;
    }
    
    struct Message {
        string content;
        address sender;
        address recipient;
        uint256 timestamp;
        string fileHash;
    }

    mapping(address => User) users;

    address[] usersArray;
    Message[] messages;

    event MessageSent(address indexed sender, address indexed recipient, string content, string fileHash, uint256 timestamp);
    event FriendRequestSent(address indexed requester, address indexed recipient, uint256 timestamp);
    event FriendRequestReject(address indexed requester, address indexed recipient, uint256 timestamp);
    modifier userExists(address user) {
        require(users[user].selfAddress != address(0), "User does not exist");
    _;}
    


    function addMe(string memory pubkey) public {
       if(users[msg.sender].selfAddress == address(0)){

        User memory newUser;
        address sender = msg.sender;
        
        newUser.selfAddress = sender;
        newUser.public_key=pubkey;
        users[sender] = newUser;
        usersArray.push(sender);
       }
    }

    function addFriend(address friendAddress) userExists(friendAddress) userExists(msg.sender)public {
        require(msg.sender != friendAddress, "Cannot add yourself as a friend");
        require(!isFriend(friendAddress),"Alredy friends");
        require(!isRequest(msg.sender,friendAddress),"You need acception");
        
        if (isRequest(friendAddress,msg.sender)) {
            for (uint256 i = 0; i < users[friendAddress].requests.length; i++) {
                if (users[friendAddress].requests[i] == msg.sender) {
                    delete users[friendAddress].requests[i];
                    users[friendAddress].requests.pop();

                    break;
                }
            }
            
            for (uint256 i = 0; i < users[msg.sender].pending.length; i++) {
                if (users[msg.sender].pending[i] == friendAddress) {
                    delete users[msg.sender].pending[i];
                     users[msg.sender].pending.pop();
                    break;
                }
            
            }
            users[msg.sender].friends.push(friendAddress);
            users[friendAddress].friends.push(msg.sender);
            emit FriendRequestSent(msg.sender, friendAddress, block.timestamp); 
        }
        else {
            users[msg.sender].requests.push(friendAddress);
            users[friendAddress].pending.push(msg.sender);
            emit FriendRequestSent(msg.sender, friendAddress, block.timestamp); 
        }
    }

    function rejectRequest(address friendAddress) userExists(friendAddress) userExists(msg.sender) public {
        require(isRequest(friendAddress, msg.sender), "No friend request from this user");
        for (uint256 i = 0; i < users[friendAddress].pending.length; i++) {
            if (users[friendAddress].pending[i] == msg.sender) {
                delete users[friendAddress].pending[i];
                users[friendAddress].pending.pop();
                break;
            }
        }
        for (uint256 i = 0; i < users[msg.sender].requests.length; i++) {
            if (users[msg.sender].requests[i] == friendAddress) {
                delete users[msg.sender].requests[i];
                users[msg.sender].requests.pop();
                break;
            }
        }
        emit FriendRequestReject(msg.sender, friendAddress, block.timestamp); 
    }

    function rejectPending(address friendAddress) userExists(friendAddress) userExists(msg.sender) public {
        require(isRequest(msg.sender, friendAddress), "No friend request to this user");
        for (uint256 i = 0; i < users[msg.sender].pending.length; i++) {
            if (users[msg.sender].pending[i] == friendAddress) {
                delete users[msg.sender].pending[i];
                users[msg.sender].pending.pop();
                break;
            }
        }
        for (uint256 i = 0; i < users[friendAddress].requests.length; i++) {
            if (users[friendAddress].requests[i] == msg.sender) {
                delete users[friendAddress].requests[i];
                users[friendAddress].requests.pop();
                break;
            }
        }
        emit FriendRequestReject(msg.sender, friendAddress, block.timestamp); 
    }
    
    function sendMessage(address recipient, string memory content, string memory fileHash) public returns (Message memory) {
        Message memory newMessage = Message({
            content: content,
            sender: msg.sender,
            recipient: recipient,
            timestamp: block.timestamp,
            fileHash: fileHash
        });

        messages.push(newMessage);
        emit MessageSent(msg.sender, recipient, content, fileHash, block.timestamp);

        return sendMessageReturn(messages.length - 1);
    }

    function sendMessageReturn(uint index) public view returns (Message memory) {
        require(index >= 0 && index < messages.length, "Invalid index");
        return messages[index];
    }

    function getMessages(address recipient) public view returns (Message[] memory) {
        uint256 numMessages = 0;
        for (uint256 i = 0; i < messages.length; i++) {
            if ((messages[i].sender == msg.sender && messages[i].recipient == recipient) || (messages[i].sender == recipient && messages[i].recipient == msg.sender)) {
                numMessages++;
            }
        }
        Message[] memory mess = new Message[](numMessages);
        uint256 index = 0;
        for (uint256 i = 0; i < messages.length; i++) {
            if ((messages[i].sender == msg.sender && messages[i].recipient == recipient) || (messages[i].sender == recipient && messages[i].recipient == msg.sender)) {
                mess[index] = messages[i];
                index++;
            }
        }
        return mess;
    }

    function isFriend(address friendAddress)public view returns (bool) {
        for (uint256 i = 0; i < users[msg.sender].friends.length; i++) {
            if (users[msg.sender].friends[i] == friendAddress) {
                return true;
            }
        }
        return false;
    }

    function isRequest(address sender,address recipient)  private view returns (bool) {
        for (uint256 i = 0; i < users[sender].requests.length; i++) {
            if (users[sender].requests[i] == recipient) {
                return true;
            }
        }
        return false;
    }

    function getMessageFileHash(uint256 index) public view returns (string memory){
        require(index < messages.length, "Invalid message index");
        return messages[index].fileHash;
    }

    function getUser()  public view userExists(msg.sender) returns (User memory) {
        return users[msg.sender];
    }

    function getFriends()public view returns (address[] memory){
        return users[msg.sender].friends;
    }

    function getRequests()public view returns (address[] memory){
        return users[msg.sender].requests;
    }

    function getPending()public view returns (address[] memory){
        return users[msg.sender].pending;
    }
}