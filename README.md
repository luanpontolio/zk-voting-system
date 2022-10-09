# ZK-Voting-system

Privacy voting system using Zero-Knowledge Proofs via Polygon ID to ensure user anonymity and uniqueness of the vote.


Blockchain-based election systems often experience two problems: user anonymity or uniqueness of voting. Traditional sybil resistance solutions often rely on multi-verification wallets, damaging the anonymity.

This project allows a voting system where the user authenticates their ability to vote using verifiable private credentials through ZKPs. 
For this, the user must receive this credential in advance from a trusted issuer, so that this credential is verified at the time of voting. In this way, the user is able to vote even using a newly created wallet, without revealing their personal data, but still ensuring that their vote is computed only once. 
For the issuer, we simulate the government's role in issuing credentials that guarantee sufficient age to vote, nationality and a unique citizen identifier. The verification body (Electoral Justice) must request the ZKP corresponding to these credentials before authorizing the voter to vote.

## Tech Stacks

Our project uses Polygon ID to issue and verify verifiable private credentials that allow the user to generate a ZKP that their personal data entitles them to vote, but without revealing that data. By connecting your wallet to our frontend, the system will check if the user has already voted and if they haven't, it will be necessary to verify the credentials in the Polygon ID to allow the wallet to perform their vote. 
Using WalletConnect we guarantee a great experience for multiple wallets both via desktop and mobile platforms. 
Our contracts were deployed on testnet mumbai.
The frontend was developed using NextJS.
 We also implemented the PUSH Protocol technology to notify the user that their vote was successfully registered on the blockchain.

## ETHBogota

This project was developed during ETHBogota 2022 and applyed to Polygon, WalletConnect, Pokt Network and PUSH Protocol.

### Polygon:
For best use of Polygon ID: We are using the Polygon ID infrastructure to verify ZKPs for solving privacy issues in the voting process. The smart contracts are deployed on  Mumbai Testnet.
For best local LATAM public goods: We believe the vote system can be used for governments, DAO and society in general for improving direct democratic process.

### WalletConnect

We used the WalletConnect V1 to ensure a great experience for both desktop and mobile users. That way, the entire voting process can easily be made only on a mobile device.


### Pokt Connect

We deployed our contracts on Mumbai TestNet using Pokts endpoints
Ballot - 0x633Bfaf7DA342401F2A82F808008A3DdF0943A4c
Gov Verifier - 0x8937d0ec316Df09998f5BF9a724D8acf72c2BcB1

### PUSH Protocol

We are using the Push Protocol on our voting system in order to notify the users after their votes are registered in the blockchain successfully.
