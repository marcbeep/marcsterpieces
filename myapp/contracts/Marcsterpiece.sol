// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; // Import Ownable

contract Marcsterpiece is
    ERC721URIStorage,
    ReentrancyGuard,
    Ownable // Inherit Ownable
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(string => uint8) private _uris;
    uint256 public constant mintPrice = 0.01 ether;

    constructor() ERC721("Marcsterpiece", "MART") {}

    function isUriOwned(string memory uri) public view returns (bool) {
        return _uris[uri] == 1;
    }

    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public payable nonReentrant {
        require(msg.value >= mintPrice, "Not enough Ether sent.");
        require(!isUriOwned(tokenURI), "URI is already owned.");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // Mark URI as owned
        _uris[tokenURI] = 1;
    }

    // Withdraw function to transfer Ether from the contract to the owner
    function withdraw() public onlyOwner {
        // onlyOwner modifier now recognized
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
}
