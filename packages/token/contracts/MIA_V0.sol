//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "hardhat/console.sol";

import "./access/MIA_Ownable.sol";
import "./storage/MIA_TokenStorage.sol";

 contract MIA_V0 is ERC20, MIA_Ownable, MIA_TokenStorage {
  using SafeMath for uint256;
  
  constructor(
    string memory _name, 
    string memory _symbol, 
    address _balances, 
    address _allowances,
    uint8 _decimals
  ) ERC20(_name, _symbol) MIA_TokenStorage(_balances, _allowances) public {
    console.log("HELLO MIA_V0");
    console.log("MIA_V0 address(this)", address(this));
    // console.log("constructor");
    // console.log("msg.sender");
    // console.log(msg.sender);
    // _mint(0x44A814f80c14977481b47C613CD020df6ea3D25D, 1000000000);
    _setupDecimals(_decimals);
  }
  
  event Mint(address indexed to, uint256 value);
  event Burn(address indexed burner, uint256 value);
  
  function _totalSupply() public view returns (uint256) {
      return balances.totalSupply();
  }
  
  function _allowance(address owner, address spender) public view returns (uint256) {
      return allowances.allowanceOf(owner, spender);
  }

  function _balanceOf(address who) public view returns (uint256) {
      return balances.balanceOf(who);
  }

  function mint(address _to, uint256 _amount) public onlyOwner2 {
      console.log("     ");
      console.log("1");
      console.log("mint");
      console.log("msg.sender");
      console.log(msg.sender);
      return _mint(_to, _amount);
  }
  
  function _mint(address _to, uint256 _amount) internal override {
      console.log("     ");
      console.log("_mint");
      console.log("2");
      balances.addTotalSupply(_amount);
      console.log("3");
      balances.addBalance(_to, _amount);
      console.log("4");
      console.log("msg.sender");
      console.log(msg.sender);
      emit Mint(_to, _amount);
      emit Transfer(address(0), _to, _amount);
  }
  
  function burn(uint256 _amount) public {
      _burn(msg.sender, _amount);
  }
  
  function _burn(address _tokensOf, uint256 _amount) internal override {
    require(_amount <= balanceOf(_tokensOf),"not enough balance to burn");
    // no need to require value <= totalSupply, since that would imply the
    // sender's balance is greater than the totalSupply, which *should* be an assertion failure
    balances.subBalance(_tokensOf, _amount);
    balances.subTotalSupply(_amount);
    emit Burn(_tokensOf, _amount);
    emit Transfer(_tokensOf, address(0), _amount);
  }
  
  function approve(address _spender, uint256 _value) public override returns (bool) {
      allowances.setAllowance(msg.sender, _spender, _value);
      emit Approval(msg.sender, _spender, _value);
      return true;
  }
    

  function transfer(address _to, uint256 _amount) public override returns (bool) {
      require(_to != address(0),"to address cannot be 0x0");
      require(_amount <= balanceOf(msg.sender),"not enough balance to transfer");
  
      balances.subBalance(msg.sender, _amount);
      balances.addBalance(_to, _amount);
      emit Transfer(msg.sender, _to, _amount);
      return true;
  }

  function transferFrom(address _from, address _to, uint256 _amount) public override returns (bool) {
      require(_amount <= allowance(_from, msg.sender),"not enough allowance to transfer");
      require(_to != address(0),"to address cannot be 0x0");
      require(_amount <= balanceOf(_from),"not enough balance to transfer");
  
      allowances.subAllowance(_from, msg.sender, _amount);
      balances.addBalance(_to, _amount);
      balances.subBalance(_from, _amount);
      emit Transfer(_from, _to, _amount);
      return true;
  }

}