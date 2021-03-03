//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "@openzeppelin/contracts/math/SafeMath.sol";

contract MIATokenLedger {
  using SafeMath for uint256;
  // Accounting state variables
  mapping (address => uint256) public _balances;
  mapping (address => mapping (address => uint256)) public _allowances;
  uint256 public _totalSupply;

  // Allowance Sheet Logic
  
  function addAllowance(address user, address spender, uint256 amount) public {
    _allowances[user][spender] = _allowances[user][spender].add(amount);
  }
  
  function subtractAllowance(address user, address spender, uint256 amount) public {
    _allowances[user][spender] = _allowances[user][spender].sub(amount, "ERC20: decreased allowance below zero");
  }
  
  function setAllowance(address user, address spender, uint256 amount) public {
    _allowances[user][spender] = amount;
  }
  
  // Balance Sheet Logic
  
  function addBalance(address user, uint256 amount) public {
    _balances[user] = _balances[user].add(amount); 
  }
  
  function subtractBalance(address user, uint256 amount) public {
    _balances[user] = _balances[user].sub(amount, "ERC20: transfer amount exceeds balance"); 
  }
  
  function setBalance(address user, uint256 amount) public {
    _balances[user] = amount;
  }
  
  function addTotalSupply(uint256 amount) public {
    _totalSupply = _totalSupply.add(amount);
  }
  
  function subtractTotalSupply(uint256 amount) public {
    _totalSupply = _totalSupply.sub(amount);
  }

  function setTotalSupply(uint256 amount) public {
    _totalSupply = amount;
  }
  
}