pragma solidity ^0.5.0;

contract MyToken {

    /*
    10000,"eilinge",4,"lin"
    msg.sender:0x14723a09acff6d2a60dcdf7aa4aff308fddc160c
    0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db,20
    0x583031d1113ad414f02576bd6afabfb302140225,40
    0xdd870fa1b7c4700f2bd7f44238821c26f7392148,60

    "0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db","0xdd870fa1b7c4700f2bd7f44238821c26f7392148",10
    */
    /* Public variables of the token */
    string public name;
    string public symbol;
    uint8 public decimals;

    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint)) public allowance;
    mapping (address => mapping (address => uint)) public spentAllowance;

    /* This generates a public event on the blockchain that will notify clients */
    event Transfer(address indexed from, address indexed to, uint256 value);
    event ReceiveApproval(address _from, uint256 _value, address _token, bytes _extraData);

    /* Initializes contract with initial supply tokens to the creator of the contract */
    constructor(uint256 initialSupply, string memory tokenName, uint8 decimalUnits, string memory tokenSymbol) public{
        balanceOf[msg.sender] = initialSupply;              // Give the creator all initial tokens
        name = tokenName;                                   // Set the name for display purposes
        symbol = tokenSymbol;                               // Set the symbol for display purposes
        decimals = decimalUnits;                            // Amount of decimals for display purposes
    }

    /* Send coins */
    function transfer(address _to, uint256 _value) payable public{
        if (balanceOf[msg.sender] < _value) revert();           // Check if the sender has enough
        if (balanceOf[_to] + _value < balanceOf[_to]) revert(); // Check for overflows
        balanceOf[msg.sender] -= _value;                     // Subtract from the sender
        balanceOf[_to] += _value;                            // Add the same to the recipient
        emit Transfer(msg.sender, _to, _value);                   // Notify anyone listening that this transfer took place
    }

    /* Allow another contract to spend some tokens in your behalf */

    function approveAndCall(address _spender, uint256 _value, bytes memory _extraData)  public returns (bool) {
        allowance[msg.sender][_spender] = _value;
        //emit ReceiveApproval(msg.sender, _value, this, _extraData);
    }

    /* A contract attempts to get the coins */

    function transferFrom(address _from, address _to, uint256 _value) public payable returns(bool) {
        if (balanceOf[_from] < _value) revert();                 // Check if the sender has enough
        if (balanceOf[_to] + _value < balanceOf[_to]) revert();  // Check for overflows
        if (spentAllowance[_from][msg.sender] + _value > allowance[_from][msg.sender]) revert();   // Check allowance
        balanceOf[_from] -= _value;                          // Subtract from the sender
        balanceOf[_to] += _value;                            // Add the same to the recipient
        spentAllowance[_from][msg.sender] += _value;
        emit Transfer(msg.sender, _to, _value);
    }

    /* This unnamed function is called whenever someone tries to send ether to it */
    function () payable external{
        revert();     // Prevents accidental sending of ether
    }
}
