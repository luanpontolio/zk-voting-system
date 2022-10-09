const { ethers } = require("ethers");

async function main() {

  const circuitId = "credentialAtomicQuerySig";
  const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";

  const ageQuery = {
    schema: ethers.BigNumber.from("210459579859058135404770043788028292398"),
    slotIndex: 2,
    operator: 2,
    value: [20000101, ...new Array(63).fill(0).map(i => 0)],
    circuitId,
  };

  // add the address of the contract just deployed
  const GovVerifierAddress = "0xB57CF2D5fc9DbF37B4aa9664793C236008895a64"

  let govVerifier = await hre.ethers.getContractAt("GovVerifier", GovVerifierAddress)

  const requestId = await govVerifier.TRANSFER_REQUEST_ID();

  try {
    await govVerifier.setZKPRequest(
      requestId,
      validatorAddress,
      ageQuery
    );
    console.log("Request set");
  } catch (e) {
    console.log("error: ", e);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
