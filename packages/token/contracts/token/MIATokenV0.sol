//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "hardhat/console.sol";

import "../ledger/MIALedger.sol";

contract MIATokenV0 is Initializable, ERC20, MIALedger, Ownable {
  using SafeMath for uint256;
  // Events 
  event Mint(address indexed to, uint256 value);
  event Burn(address indexed burner, uint256 value);
  // Not needed since they are already defined.
  // event Transfer(address indexed from, address indexed to, uint256 value);
  // event Approval(address indexed owner, address indexed spender, uint256 value);

  // Public Functions
  // constructor(string memory _name, string memory _symbol, uint8 _decimals, address _balances, address _allowances) MIALedger(_balances, _allowances) public {
  //   _setupDecimals(_decimals);
  //   _setupName(_name);
  //   _setupSymbol(_symbol);
  // }
  // function initialize() should: 
  // - Instanciate ERC20 to have name and symbol
  // - Instanciate MIALedger with addreses of MIAAllowanceSheet & MIABalanceSheet
  
  function initialize(string memory _name, string memory _symbol, uint8 _decimals, address _balances, address _allowances) public initializer {
    MIALedger.initialize(_balances, _allowances);
    _setupDecimals(_decimals);
    _setupName(_name);
    _setupSymbol(_symbol);
  }
  
  function mint(address _to, uint256 _amount) public onlyOwner {
    return _mint(_to, _amount);
  }
  

  function burn(uint256 _amount) public onlyOwner {
    return _burn(_amount);
  }
  
  function approve(uint256 _amount) public onlyOwner returns(bool) {
    console.log("approve(uint256 _amount)", _amount);
    // approve logic thru MIALedger
    return true;
  }
  
  function transfer(address _to, uint256 _amount) public override onlyOwner returns(bool) {
    console.log("transfer(address _to, uint256 _amount)");
    console.log("address _to", _to);
    console.log("uint256 _amount", _amount);
    // transfer logic thru MIALedger
    return true;
  }
  
  function transferFrom(address _to, uint256 _amount) public onlyOwner returns(bool) {
    console.log("transferFrom(address _to, uint256 _amount)");
    console.log("address _to", _to);
    console.log("uint256 _amount", _amount);
    // transferFrom logic thru MIALedger
    return true;
  }
  
  function balanceOf(address _user) public view override returns(uint256) {
    console.log("balanceOf(address _user)", _user);
    // return balances.balanceOf[_user];
    return 1;
  }
  
  function allowance(address owner, address spender) public override view returns(uint256) {
    console.log("allowance(address owner, address spender)");
    console.log("address owner", owner);
    console.log("address spender", spender);
    // return allowances.allowanceOf[owner][spender];
    return 1;
  }
  
  
  // Internal Functions
  function _mint(address _to, uint256 _amount) internal override {
    console.log("_mint(address _to, uint256 _amount)");
    console.log("address _to", _to);
    console.log("uint256 _amount", _amount);
    
  }
  
  
  function _burn(uint256 _amount) internal {
    console.log("_burn(uint256 _amount)", _amount);
  }

}