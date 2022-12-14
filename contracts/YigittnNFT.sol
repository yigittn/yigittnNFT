// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YigittnNFT is ERC721, Ownable {

    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal BaseURI;
    address payable public withdrawAddress;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('YigittnNFT', 'YG') {
        mintPrice = 0.01 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 5;
        isPublicMintEnabled = false;
        withdrawAddress = payable(msg.sender);

        // Sets the mint price, total supply, max supply, max per wallet, public mint status and withdraw address
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;

        // Public mint is enabled
    }

    function setBaseURI(string calldata _BaseURI) external onlyOwner {
        BaseURI = _BaseURI;

        // Images are stored on IPFS
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "Nonexistent token");
        return string(abi.encodePacked(BaseURI, Strings.toString(_tokenId),".json"));
        // Opensea uses this function to get the image of the NFT
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawAddress.call{value: address(this).balance}("");
        require(success, "Withdraw failed");


        // Withdraws the contract balance to the withdraw address
    }

    function mint(uint256 _quantity) public payable{
        require(isPublicMintEnabled, "Public mint is not enabled");
        require(msg.value ==  _quantity * mintPrice, "Insufficient ETH sent");
        require(totalSupply + _quantity <= maxSupply, "Max supply has been reached");
        require(walletMints[msg.sender] + _quantity  <= maxPerWallet, "Max NFTs per wallet has been reached");

            for(uint256 i = 0; i < _quantity; i++){
                uint256 newTokenId = totalSupply + 1;
                totalSupply++;
                _safeMint(msg.sender, newTokenId);
            }
        

        
        walletMints[msg.sender]++;
        
        
    }


}