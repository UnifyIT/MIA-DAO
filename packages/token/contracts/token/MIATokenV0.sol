//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/proxy/Initializable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "hardhat/console.sol";


import "../ledger/MIATokenLedger.sol";


contract MIATokenV0 is MIATokenLedger, Initializable {
  using SafeMath for uint256;
  // Private Token State variables;
  string private _name;
  string private _symbol;
  uint8 private _decimals;

  // Events 
  event Mint(address indexed to, uint256 value);
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  event Burn(address indexed burner, uint256 value);
  
  function initialize(string memory name_, string memory symbol_, uint8 decimals_, uint256 totalSupply) public initializer {
    _name = name_;
    _symbol = symbol_;
    _decimals = decimals_;
    MIATokenOwnable.initializeOwner();
    _mint(_msgSender(), totalSupply);
  }
  
  // Getter functions
  function name() public view returns (string memory) {
    return _name;
  }

  function symbol() public view returns (string memory) {
    return _symbol;
  }

  function decimals() public view returns (uint8) {
    return _decimals;
  }
  
  function totalSupply() public view returns (uint256) {
    return _totalSupply;
  }
  
  function balanceOf(address account) public view returns (uint256) {
    return _balances[account];
  }
  
  function allowance(address owner, address spender) public view returns (uint256) {
    return _allowances[owner][spender];
  }

  // Action functions

  function transfer(address recipient, uint256 amount) public returns(bool) {
    require(recipient != address(0), "to address cannot be 0x0");
    require(amount <= balanceOf(_msgSender()), "not enough balance to transfer");
    _transfer(_msgSender(), recipient, amount);
    return true;
  }
  
  // approve logic thru MIALedger
  function approve(address spender, uint256 amount) public returns (bool) {
    _approve(_msgSender(), spender, amount);
    return true;
  }
  
  function transferFrom(address sender, address recipient, uint256 amount) public virtual returns (bool) {
    require(amount <= allowance(_msgSender(), recipient), "not enough allowance to transfer");
    require(recipient != address(0), "to address cannot be 0x0");
    require(amount <= balanceOf(_msgSender()), "not enough balance to transfer");
    _transfer(sender, recipient, amount);
    uint256 approveAmount = _allowances[sender][recipient].sub(amount, "ERC20: transfer amount exceeds allowance");
    _approve(sender, _msgSender(), approveAmount);
    return true;
  }
  
  
  function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
    addAllowance(_msgSender(), spender, addedValue);
    return true;
  }

  function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
    subtractAllowance(_msgSender(), spender, subtractedValue);
    return true;
  }

  // Internal Functions
  function _transfer(address sender, address recipient, uint256 amount) internal returns(bool) {
    require(sender != address(0), "ERC20: transfer from the zero address");
    require(recipient != address(0), "ERC20: transfer to the zero address");
    _beforeTokenTransfer(sender, recipient, amount);
    subtractBalance(sender, amount);
    addBalance(recipient, amount);
    emit Transfer(sender, recipient, amount);
  }

  function _mint(address recipient, uint256 amount) internal onlyOwner {
    require(recipient != address(0), "ERC20: mint to the zero address");
    _beforeTokenTransfer(address(0), recipient, amount);
    addTotalSupply(amount);
    addBalance(recipient, amount);
    emit Mint(recipient, amount);
    emit Transfer(address(0), recipient, amount);
  }

  function _burn(address account, uint256 amount) internal {
    require(account != address(0), "ERC20: burn from the zero address");
    require(amount <= balanceOf(account), "not enough balance to burn");
    _beforeTokenTransfer(account, address(0), amount);
    subtractBalance(account, amount);
    subtractTotalSupply(amount);
    emit Burn(account, amount);
    emit Transfer(account, address(0), amount);
  }

  function _approve(address owner, address spender, uint256 amount) internal {
    require(_msgSender() != address(0), "ERC20: approve from the zero address");
    require(spender != address(0), "ERC20: approve to the zero address");
    setAllowance(owner, spender, amount);
    emit Approval(owner, spender, amount);
  }

  function _setupDecimals(uint8 decimals_) internal {
    _decimals = decimals_;
  }

  function _beforeTokenTransfer(address from, address to, uint256 amount) internal { }

}