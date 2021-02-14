pragma solidity ^0.4.24;

import './Ownable.sol';

/**
* @title Lockable
* @dev Base contract which allows children to lock certain methods from being called by clients.
* Locked methods are deemed unsafe by default, but must be implemented in children functionality to adhere by
* some inherited standard, for example. 
*/

contract Lockable is Ownable {

	// Events
	event Unlocked();
	event Locked();

	// Fields
	bool public isMethodEnabled = false;

	// Modifiers
	/**
	* @dev Modifier that disables functions by default unless they are explicitly enabled
	*/
	modifier whenUnlocked() {
		require(isMethodEnabled);
		_;
	}

	// Methods
	/**
	* @dev called by the owner to enable method
	*/
	function unlock() onlyOwner public {
		isMethodEnabled = true;
		emit Unlocked();
	}

	/**
	* @dev called by the owner to disable method, back to normal state
	*/
	function lock() onlyOwner public {
		isMethodEnabled = false;
		emit Locked();
	}

}