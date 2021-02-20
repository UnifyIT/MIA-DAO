//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "./Ownable.sol";
import "./Storage.sol";

contract Registry is Ownable, Storage {
      address public logic_contract;

      // admin to set contract
      function setLogicContract(address _c) public onlyOwner returns (bool success){
          logic_contract = _c;
          return true;
      }

      // fall back function
      fallback () payable external {

          address target = logic_contract;

          assembly {
              // Copy the data sent to the memory address starting free mem position
              let ptr := mload(0x40)
              calldatacopy(ptr, 0, calldatasize())

              // Proxy the call to the contract address with the provided gas and data
              let result := delegatecall(gas(), target, ptr, calldatasize(), 0, 0)

              // Copy the data returned by the proxied call to memory
              let size := returndatasize()
              returndatacopy(ptr, 0, size)

              // Check what the result is, return and revert accordingly
              switch result
              case 0 { revert(ptr, size) }
              case 1 { return(ptr, size) }
          }
      }
}