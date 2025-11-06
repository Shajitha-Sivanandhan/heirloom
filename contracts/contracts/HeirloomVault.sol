// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title HeirloomVault
 * @dev Core logic for registering heirs and simulating proof-of-life.
 *      MVP skeleton — we’ll expand later with automation and NFT logic.
 */
contract HeirloomVault is Ownable {
    struct Heir {
        address wallet;
        uint256 share; // percentage basis points (10000 = 100%)
    }

    struct Vault {
        address owner;
        Heir[] heirs;
        uint256 lastProofOfLife;
        bool executed;
    }

    mapping(address => Vault) public vaults;

    event VaultRegistered(address indexed owner);
    event ProofOfLifeSubmitted(address indexed owner, uint256 timestamp);
    event InheritanceExecuted(address indexed owner);

    // 👇 NEW: Constructor added to call Ownable constructor
    constructor() Ownable(msg.sender) {}

    /// @notice register or update a vault with heir info
    function registerVault(address[] calldata heirs, uint256[] calldata shares) external {
        require(heirs.length == shares.length, "length mismatch");
        require(heirs.length > 0, "no heirs");
        Vault storage v = vaults[msg.sender];
        delete v.heirs;
        for (uint256 i = 0; i < heirs.length; i++) {
            v.heirs.push(Heir({wallet: heirs[i], share: shares[i]}));
        }
        v.owner = msg.sender;
        v.lastProofOfLife = block.timestamp;
        v.executed = false;
        emit VaultRegistered(msg.sender);
    }

    /// @notice update proof-of-life timestamp
    function submitProofOfLife() external {
        Vault storage v = vaults[msg.sender];
        require(v.owner != address(0), "vault not found");
        v.lastProofOfLife = block.timestamp;
        emit ProofOfLifeSubmitted(msg.sender, block.timestamp);
    }

    /// @notice simple inactivity check
    function isInactive(address owner, uint256 inactivityWindow) public view returns (bool) {
        Vault storage v = vaults[owner];
        return (block.timestamp - v.lastProofOfLife) > inactivityWindow;
    }

    /// @notice mark vault executed (placeholder for token/NFT transfers)
    function executeInheritance(address owner) external onlyOwner {
        Vault storage v = vaults[owner];
        require(!v.executed, "already executed");
        v.executed = true;
        emit InheritanceExecuted(owner);
    }

    function getHeirs(address _owner)
    external
    view
    returns (Heir[] memory)
    {
    return vaults[_owner].heirs;
    }
}
