//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "../erc20/MIA_ERC20.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "hardhat/console.sol";

import "../ledger/MIATokenLedger.sol";

contract MIATokenV0 is Initializable, MIATokenLedger, Ownable {
  using SafeMath for uint256;
  // Private Token State variables;
  string private _name;
  string private _symbol;
  uint8 private _decimals;
  address private _ledger;

  // Events 
  event Mint(address indexed to, uint256 value);
  event Burn(address indexed burner, uint256 value);
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);

  // Public Functions
  // function initialize() should: 
  // - Instanciate ERC20 to have name and symbol
  // - Instanciate MIALedger with addreses of MIAAllowanceSheet & MIABalanceSheet
  function initialize(string memory name_, string memory symbol_, uint8 decimals_, address ledger_) public initializer {
  // function initialize(uint8 _decimals, string memory _string) public initializer {
    console.log("START***********MIATokenV0.sol");
    console.log("INITIALIZE IS SUCCESS");
    console.log("string memory name_", name_);
    console.log("string memory symbol_", symbol_);
    console.log("uint8 decimals_", decimals_);
    console.log("address ledger_", ledger_);
    console.log("totalSupply", totalSupply);    
    // Is it necessary to instanciate the ledger inside this function 
    // how do i connect this token to the already deployed ledger?.
    _name = name_;
    _symbol = symbol_;
    _decimals = decimals_;
    _ledger = ledger_;
    console.log("END***********MIATokenV0.sol");
  }
  
  function name() public view returns (string memory) {
      return _name;
  }

  function symbol() public view returns (string memory) {
      return _symbol;
  }

  function decimals() public view returns (uint8) {
      return _decimals;
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
  
  function transfer(address _to, uint256 _amount) public onlyOwner returns(bool) {
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
  
  function allowance(address owner, address spender) public view returns(uint256) {
    console.log("allowance(address owner, address spender)");
    console.log("address owner", owner);
    console.log("address spender", spender);
    return allowances[owner][spender];
  }
  
  function balanceOf(address account) public virtual view returns (uint256) {
      return balances[account];
  }


  // Internal Functions
  function _mint(address _to, uint256 _amount) internal {
    console.log("_mint(address _to, uint256 _amount)");
    console.log("address _to", _to);
    console.log("uint256 _amount", _amount);
    
  }

  function _burn(uint256 _amount) internal {
    console.log("_burn(uint256 _amount)", _amount);
  }

}