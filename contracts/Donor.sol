// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";

contract Donor is ERC20Burnable, Ownable {
    constructor() ERC20("Donor", "DONR"){
        _mint(msg.sender, 1000000000000000000000000000); //1,000,000,000 = 1 billion.
    } 

    function burn(uint256 amount) public override onlyOwner {
        _burn(_msgSender(), amount);
    }
    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }
}