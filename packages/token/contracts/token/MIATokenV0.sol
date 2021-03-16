//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/GSN/Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "hardhat/console.sol";


contract MIATokenV0 is Context, IERC20, Initializable {
  using SafeMath for uint256;

  mapping (address => uint256) private _balances;

  mapping (address => mapping (address => uint256)) private _allowances;
  
  // Private Token State variables;
  uint256 private _totalSupply;

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
  
  function totalSupply() public view override returns (uint256) {
    return _totalSupply;
  }
  
  function balanceOf(address account) public view returns (uint256) {
    return _balances[account];
  }
  
  function allowance(address owner, address spender) public view override returns (uint256) {
    return _allowances[owner][spender];
  }

  // Action functions

  function transfer(address recipient, uint256 amount) public virtual override returns(bool) {
    require(recipient != address(0), "to address cannot be 0x0");
    require(amount <= balanceOf(_msgSender()), "not enough balance to transfer");
    
    _transfer(_msgSender(), recipient, amount);
    return true;
  }
  
  // approve logic thru MIALedger
  function approve(address spender, uint256 amount) public virtual override returns (bool) {
    _approve(_msgSender(), spender, amount);
    return true;
  }
  
  function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
    require(amount <= allowance(_msgSender(), recipient), "not enough allowance to transfer");
    require(recipient != address(0), "to address cannot be 0x0");
    require(amount <= balanceOf(_msgSender()), "not enough balance to transfer");
    
    _transfer(sender, recipient, amount);
    _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
    return true;
  }
  
  
  function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
    _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
    return true;
  }

  function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
    _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
    return true;
  }

  // Internal Functions
  function _transfer(address sender, address recipient, uint256 amount) internal virtual returns(bool) {
    require(sender != address(0), "ERC20: transfer from the zero address");
    require(recipient != address(0), "ERC20: transfer to the zero address");

    _beforeTokenTransfer(sender, recipient, amount);

    _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
    _balances[recipient] = _balances[recipient].add(amount);
    emit Transfer(sender, recipient, amount);
  }

  function _mint(address account, uint256 amount) internal virtual {
    require(account != address(0), "ERC20: mint to the zero address");

    _beforeTokenTransfer(address(0), account, amount);

    _totalSupply = _totalSupply.add(amount);
    _balances[account] = _balances[account].add(amount);
    emit Mint(account, amount);
    emit Transfer(address(0), account, amount);
  }

  function _burn(address account, uint256 amount) internal virtual {
    require(account != address(0), "ERC20: burn from the zero address");
    require(amount <= balanceOf(account), "not enough balance to burn");

    _beforeTokenTransfer(account, address(0), amount);

    _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
    _totalSupply = _totalSupply.sub(amount);
    emit Burn(account, amount);
    emit Transfer(account, address(0), amount);
  }

  function _approve(address owner, address spender, uint256 amount) internal virtual {
    require(_msgSender() != address(0), "ERC20: approve from the zero address");
    require(spender != address(0), "ERC20: approve to the zero address");

    _allowances[owner][spender] = amount;
    emit Approval(owner, spender, amount);
  }

  function _setupDecimals(uint8 decimals_) internal {
    _decimals = decimals_;
  }

  function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }

}