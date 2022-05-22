
//=======================================================================================================================

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


// import "../../@openzeppelin/contracts@4.5.0/token/ERC20/ERC20.sol";
// import "DBP-site/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "C:/Users/Lenovo/Desktop/DBP-site/DBPBackend/app/controllers/contracts/token/ERC20/ERC20.sol";
import "C:/Users/ryzen/OneDrive/Desktop/DBP_site/DBPBackend/app/controllers/contracts/token/ERC20/ERC20.sol";
// import "./ERC20.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";

//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract DebtToken is ERC20 {

    address  owner = msg.sender;
    uint256 public totalsupply;
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        // _mint(msg.sender, _totalSupply * 10**uint(decimals()));
    }

    function mint(address _owner,uint256 _totalsupply)public{
        totalsupply = _totalsupply;
        _mint(_owner, totalsupply * 10**uint(decimals()));

    }
}