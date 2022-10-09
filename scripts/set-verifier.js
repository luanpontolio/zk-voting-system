const { ethers } = require("ethers");

function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
      bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

function fromLittleEndian(bytes) {
  const n256 = BigInt(256);
  let result = BigInt(0);
  let base = BigInt(1);
  bytes.forEach((byte) => {
    result += base * BigInt(byte);
    base = base * n256;
  });
  return result;
}

async function main() {

  const circuitId = "credentialAtomicQuerySig";
  const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";

  const schemaEnd = fromLittleEndian(hexToBytes("944a216396c1befe1f0ed57329eeda05"))
  console.log(schemaEnd);

  const ageQuery = {
    schema: ethers.BigNumber.from(schemaEnd),
    slotIndex: 2,
    operator: 2,
    value: [20000101, ...new Array(63).fill(0).map(i => 0)],
    circuitId,
  };

  // add the address of the contract just deployed
  const GovVerifierAddress = "0x8937d0ec316Df09998f5BF9a724D8acf72c2BcB1"

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
