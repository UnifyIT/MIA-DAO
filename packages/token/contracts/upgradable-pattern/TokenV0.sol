//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import './Storage.sol';
import './Ownable.sol';
import "hardhat/console.sol";

contract TokenV0 is Storage, Ownable {
    uint public val2 = 1;
    function setVal(uint _val) public virtual returns (bool success) {
        console.log("TESTING SETVAL");
        val = 2 * _val;
        val2 = val2 * 3 * _val;
        console.log("val", val);
        console.log("val2", val2);
        return true;
    }
    
    function setValOnlyOwner(string memory _val) public onlyOwner returns (bool success) {
        valStr = _val;
        return true;
    }

}

