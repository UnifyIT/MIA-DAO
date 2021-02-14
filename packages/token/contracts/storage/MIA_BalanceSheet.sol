//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

import "../access/MIA_Ownable.sol";
/**
* @title MIA BalanceSheet
* @notice A wrapper around the balanceOf mapping. 
*/

contract MIA_BalanceSheet is MIA_Ownable {
  using SafeMath for uint256;

  mapping (address => uint256) public balanceOf;
  uint256 public totalSupply;

  function addBalance(address _addr, uint256 _value) public onlyOwner {
      balanceOf[_addr] = balanceOf[_addr].add(_value);
  }

  function subBalance(address _addr, uint256 _value) public onlyOwner {
      balanceOf[_addr] = balanceOf[_addr].sub(_value);
  }

  function setBalance(address _addr, uint256 _value) public onlyOwner {
      balanceOf[_addr] = _value;
  }

  function addTotalSupply(uint256 _value) public onlyOwner {
      totalSupply = totalSupply.add(_value);
  }

  function subTotalSupply(uint256 _value) public onlyOwner {
      totalSupply = totalSupply.sub(_value);
  }

  function setTotalSupply(uint256 _value) public onlyOwner {
      totalSupply = _value;
  }
}