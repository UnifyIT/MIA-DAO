//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "@openzeppelin/contracts/math/SafeMath.sol";
// import "@openzeppelin/contracts/proxy/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MIATokenLedger {
// contract MIATokenLedger {
  using SafeMath for uint256;
  // Accounting state variables
  mapping (address => mapping (address => uint256)) public allowances;

  mapping (address => uint256) public balances;
  uint256 public totalSupply;

  // Allowance Sheet Logic
  // function addAllowance(address user, address spender, uint256 amount) public onlyOwner {
  function addAllowance(address user, address spender, uint256 amount) public {
    allowances[user][spender] = allowances[user][spender].add(amount);
  }
  
  // function subtractAllowance(address user, address spender, uint256 amount) public onlyOwner {
  function subtractAllowance(address user, address spender, uint256 amount) public {
    allowances[user][spender] = allowances[user][spender].sub(amount);
  }
  
  // function setAllowance(address user, address spender, uint256 amount) public onlyOwner {
  function setAllowance(address user, address spender, uint256 amount) public {
    allowances[user][spender] = amount;
  }
  
  // Balance Sheet Logic
  
  // function addBalance(address user, uint256 amount) public onlyOwner {
  function addBalance(address user, uint256 amount) public {
    balances[user] = balances[user].add(amount); 
  }
  
  // function subtractBalance(address user, uint256 amount) public onlyOwner {
  function subtractBalance(address user, uint256 amount) public {
    balances[user] = balances[user].sub(amount); 
  }
  
  // function setBalance(address user, uint256 amount) public onlyOwner {
  function setBalance(address user, uint256 amount) public {
    balances[user] = amount;
  }
  
  // function addTotalSupply(uint256 amount) public onlyOwner {
  function addTotalSupply(uint256 amount) public {
    totalSupply = totalSupply.add(amount);
  }
  
  // function subtractTotalSupply(uint256 amount) public onlyOwner {
  function subtractTotalSupply(uint256 amount) public {
    totalSupply = totalSupply.sub(amount);
  }
  
  // function setTotalSupply(uint256 amount) public onlyOwner {
  function setTotalSupply(uint256 amount) public {
    totalSupply = amount;
  }
  
}