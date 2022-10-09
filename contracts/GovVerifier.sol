// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./lib/GenesisUtils.sol";
import "./interfaces/ICircuitValidator.sol";
import "./verifiers/ZKPVerifier.sol";
import "./PresidentElection.sol";

contract GovVerifier is PresidentElection, ZKPVerifier {
  uint64 public constant TRANSFER_REQUEST_ID = 1;

  function _beforeProofSubmit(
    uint64, /* requestId */
    uint256[] memory inputs,
    ICircuitValidator validator) internal override {
    // check that challenge input of the proof is equal to the msg.sender
    address addr = GenesisUtils.int256ToAddress(
        inputs[validator.getChallengeInputIndex()]
    );

    require(
        _msgSender() == addr,
        "address in proof is not a sender address"
    );
  }

  function _afterProofSubmit(
    uint64 requestId,
    uint256[] memory inputs,
    ICircuitValidator validator
  ) internal override {
    address account = GenesisUtils.int256ToAddress(
      inputs[validator.getUserIdInputIndex()]
    );

    require(requestId == TRANSFER_REQUEST_ID && !allowedList[account]);
    allowedList[account] = true;
  }
}
