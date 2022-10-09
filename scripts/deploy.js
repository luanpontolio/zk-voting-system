async function main() {
  const ballotContractName = "Ballot";
  const govVerifierContratName = "GovVerifier";

  const Ballot = await ethers.getContractFactory(ballotContractName);
  const ballotContract = await Ballot.deploy();
  await ballotContract.deployed();

  const GovVerifier = await ethers.getContractFactory(govVerifierContratName);
  const govVerifier = await GovVerifier.deploy(ballotContract.address);

  await ballotContract.setVerifier(govVerifier.address);

  console.log(ballotContractName, " tx hash:", ballotContract.address);
  console.log(govVerifierContratName, " tx hash:", govVerifier.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
