async function main() {
  const verifierContract = "PresidentElection";
  const PresidentElection = await ethers.getContractFactory(verifierContract);
  const presidentElectionContract = await PresidentElection.deploy();

  await presidentElectionContract.deployed();
  console.log(verifierName, " tx hash:", presidentElectionContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
