pragma solidity ^0.4.21;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "./../contracts/GetAddr.sol";

contract TestGet {
  function testGetAddr() public{
    GetAddr meta = GetAddr(DeployedAddresses.GetAddr());

    uint expected = 5;

    Assert.equal(meta.f1(), expected, "v3 should be 5");
  }
}
