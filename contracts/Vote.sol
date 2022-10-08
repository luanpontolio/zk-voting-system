//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Vote is Ownable {
  mapping (bytes32 => uint) public votesReceived;
  mapping (bytes32 => bool) public registerVote;

  bytes32[] private candidateList = [bytes32("Dog"), bytes32("Cat"), bytes32("Bird")];

  function vote(bytes32 _hash, bytes32 _candidate) public {
    require(isValidCandidate(_candidate), "Is not a valid candidate");
    require(!registerVote[_hash], "You already vote!");
    registerVote[_hash] = true;
    votesReceived[_candidate] += 1;

    emit Voted(address(msg.sender));
  }

  function isValidCandidate(bytes32 _candidate) public view returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == _candidate) {
        return true;
      }
    }

    return false;
  }

  function getCandidates() public view returns (bytes32[] memory) {
    return candidateList;
  }

  event Voted(address sender);
}
