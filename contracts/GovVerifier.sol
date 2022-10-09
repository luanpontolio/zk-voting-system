// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./lib/GenesisUtils.sol";
import "./interfaces/ICircuitValidator.sol";
import "./verifiers/ZKPVerifier.sol";
import "./Ballot.sol";

contract GovVerifier is ZKPVerifier {
  uint64 public constant TRANSFER_REQUEST_ID = 1;

  Ballot public ballot;

  constructor(address contractElection_) {
    ballot = Ballot(contractElection_);
  }

  function _beforeProofSubmit(
    uint64 requestId,
    uint256[] memory inputs,
    ICircuitValidator validator) internal override {
    address addr = GenesisUtils.int256ToAddress(
      inputs[validator.getChallengeInputIndex()]
    );

    require(requestId == TRANSFER_REQUEST_ID && !ballot.getAllowed(addr));
    require(!ballot.isComputed(addr), "Is already voted");
  }

  function _afterProofSubmit(
    uint64,
    uint256[] memory inputs,
    ICircuitValidator validator
  ) internal override {
    address account = GenesisUtils.int256ToAddress(
      inputs[validator.getChallengeInputIndex()]
    );

    ballot.setAllowedList(account);
  }
}
