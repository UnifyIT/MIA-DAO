//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import './Storage.sol';
import './Ownable.sol';

contract TokenV0 is Storage, Ownable {
    function setVal(uint _val) public virtual returns (bool success) {
        val = 2 * _val;
        return true;
    }
    
    function setValOnlyOwner(string memory _val) public onlyOwner returns (bool success) {
        valStr = _val;
        return true;
    }

}

