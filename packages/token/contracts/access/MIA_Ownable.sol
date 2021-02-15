//SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract MIA_Ownable2 is Ownable {
  address public pendingOwner;

  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() public {
    console.log("        ");
    console.log("this", address(this));
    console.log("MIA_Ownable");
    console.log("owner()", owner());
    console.log("_msgSender()", _msgSender());
    console.log("****1****");
    pendingOwner = address(0);
    console.log("pendingOwner", pendingOwner);
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyPendingOwner() {
    require(msg.sender == pendingOwner);
    _;
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function _transferOwnership(address _newOwner) public onlyOwner {
    require(_newOwner != address(0));
    pendingOwner = _newOwner;
  }

  /**
   * @dev Allows the pendingOwner address to finalize the transfer.
   */
  function claimOwnership() onlyPendingOwner public {
    emit OwnershipTransferred(owner(), pendingOwner);
    transferOwnership(pendingOwner);
    pendingOwner = address(0);
  }

}

contract MIA_Ownable {
  address public owner;
  address public pendingOwner;


  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() public {
    owner = msg.sender;
    pendingOwner = address(0);
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    console.log("     ");
    console.log("onlyOwner modifier");
    console.log("owner", owner);
    console.log("msg.sender", msg.sender);
    console.log("i need to be true:", owner == msg.sender);
    console.log("this", address(this));
    console.log("     ");
    require(msg.sender == owner, "Ownable: caller is not the owner");
    _;
  }
  
  modifier onlyOwner2() {
    console.log("     ");
    console.log("onlyOwner2 modifier");
    console.log("owner", owner);
    console.log("msg.sender", msg.sender);
    console.log("i need to be true:", owner == msg.sender);
    console.log("this", address(this));
    console.log("     ");
    require(msg.sender == owner, "Ownable: caller is not the owner");
    _;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyPendingOwner() {
    require(msg.sender == pendingOwner);
    _;
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function transferOwnership(address _newOwner) public onlyOwner {
    require(_newOwner != address(0));
    pendingOwner = _newOwner;
  }

  /**
   * @dev Allows the pendingOwner address to finalize the transfer.
   */
  function claimOwnership() onlyPendingOwner public {
    emit OwnershipTransferred(owner, pendingOwner);
    owner = pendingOwner;
    pendingOwner = address(0);
  }


}




