//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./GovVerifier.sol";

contract Ballot is Ownable {
  mapping (bytes32 => uint) public votesReceived;
  mapping (address => bool) public allowedList;
  mapping (address => uint) public userVoted;

  GovVerifier public gov;

  bytes32[] private candidateList = [bytes32("Dog"), bytes32("Cat"), bytes32("Bird"), bytes32("Chameleon")];

  modifier onlyVerifier() {
    require(address(gov) == _msgSender());
    _;
  }

  function setVerifier(address gov_) public onlyOwner {
    gov = GovVerifier(gov_);
  }

  function execute(bytes32 _candidate) public {
    require(isValidCandidate(_candidate), "Is not a valid candidate");
    require(!allowedList[_msgSender()], "Is no allowed to vote again");
    require(userVoted[_msgSender()] == 1, "Voted computed");

    userVoted[_msgSender()] = 1;
    votesReceived[_candidate] += 1;

    emit Voted(_candidate, votesReceived[_candidate]);
  }

  function isValidCandidate(bytes32 _candidate) public view returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == _candidate) {
        return true;
      }
    }

    return false;
  }

  function setAllowedList(address account_) public onlyVerifier {
    allowedList[account_] = true;
  }

  function isComputed(address account_) public view returns (bool) {
    return userVoted[account_] == 1;
  }

  function getAllowed(address account_) public view returns (bool) {
    return allowedList[account_];
  }

  function getCandidates() public view returns (bytes32[] memory) {
    return candidateList;
  }

  function _beforeVoting(address to) internal virtual {}

  event Voted(bytes32 candidate, uint256 count);
}
