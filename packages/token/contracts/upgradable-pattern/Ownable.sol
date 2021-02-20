//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

abstract contract Ownable {

  address public owner;

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
}