//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

import "../access/MIA_Ownable.sol";
/**
* @title MIA AllowanceSheet
* @notice A wrapper around the allowanceOf mapping. 
*/

contract MIA_AllowanceSheet is MIA_Ownable {
  using SafeMath for uint256;
  
  mapping (address => mapping (address => uint256)) public allowanceOf;
  
  function addAllowance(address _tokenHolder, address _spender, uint256 _value) public onlyOwner {
      allowanceOf[_tokenHolder][_spender] = allowanceOf[_tokenHolder][_spender].add(_value);
  }

  function subAllowance(address _tokenHolder, address _spender, uint256 _value) public onlyOwner {
      allowanceOf[_tokenHolder][_spender] = allowanceOf[_tokenHolder][_spender].sub(_value);
  }

  function setAllowance(address _tokenHolder, address _spender, uint256 _value) public onlyOwner {
      allowanceOf[_tokenHolder][_spender] = _value;
  }
}