//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "hardhat/console.sol";

contract MIALogicV0 is Initializable, ERC20, Ownable {
  using SafeMath for uint256;
  int256 someStateNum = 2;
  
  constructor() ERC20("MIA DAO", "MIA") {

  }
  
  function initialize() public initializer onlyOwner {
    _setupDecimals(6);
  }
  
  function setSomeStateNum(int256 num) public {
    someStateNum = num;
  }
  
  function getSomeStateNum() public returns(int256){
    return someStateNum;
  }

}

