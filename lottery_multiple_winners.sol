pragma solidity ^0.4.10;


contract Lottery{
    address public _owner;
    address public _winner;
    address[10] public _users;
    uint public _stoptime;
    
    uint public _randone;
    uint public _Randint;
    
    constructor(uint _time) public{
        _owner = msg.sender;
        _stoptime = now + _time;
    }
    
    modifier onlyOwnner(){
        require(_owner == msg.sender);
        _;
    }

    function joinGame() payable public{
        require(now < _stoptime, "this game is Done");
        require(msg.sender.balance >= 10 ether, "your balance not enough");
        require(msg.value == 10 ether, "your must pay 10 ether");
        uint _newuser = getRandint();
        require(_newuser != 0, "the number is not 0");
        require(_users[_newuser] == uint160(0x000000), "this number is used, you should rerun this function");
        _users[_newuser] = msg.sender;
    }
    
    function getRandint() internal returns(uint){
        _Randint = uint(keccak256(abi.encodePacked(_randone, now, msg.sender))) % 10;
        _randone ++;
        return _Randint;
    }
    
    function stopGame() onlyOwnner() payable public{
        require(now < _stoptime, "this game is Done");
        uint _winrand = getRandint();
        _winner = _users[_winrand];
        require(_winner != uint160(0x0), "this number of user is not exist");
        _winner.transfer(address(this).balance);
        delete _users;
    }
}
