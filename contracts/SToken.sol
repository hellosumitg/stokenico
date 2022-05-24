// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract SToken is ERC20 {
    constructor() ERC20("SToken", "ST") {
        // _mint(address account, uint256 amount):-Creates amount tokens and assigns them to account.
        _mint(msg.sender, 1000000 * 10**18);
    }
}