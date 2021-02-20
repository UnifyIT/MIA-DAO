//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import './TokenV0.sol';

contract TokenV1 is TokenV0 {
    function setVal(uint _val) public override returns (bool success) {
        val = 4 * _val;
        return true;
    }
}