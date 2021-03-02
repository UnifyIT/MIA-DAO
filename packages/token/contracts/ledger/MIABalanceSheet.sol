//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract MIABalanceSheet is Ownable {
  using SafeMath for uint256;

  mapping (address => uint256) public balanceOf;
  uint256 public totalSupply;
  
  function addBalance(address user, uint256 amount) public onlyOwner {
    balanceOf[user] = balanceOf[user].add(amount); 
  }
  
  function subtractBalance(address user, uint256 amount) public onlyOwner {
    balanceOf[user] = balanceOf[user].sub(amount); 
  }
  
  function setBalance(address user, uint256 amount) public onlyOwner {
    balanceOf[user] = amount;
  }
  
  function addTotalSupply(uint256 amount) public onlyOwner {
    totalSupply = totalSupply.add(amount);
  }
  
  function subtractTotalSupply(uint256 amount) public onlyOwner {
    totalSupply = totalSupply.sub(amount);
  }
  
  function setTotalSupply(uint256 amount) public onlyOwner {
    totalSupply = amount;
  }
}