import { ethers } from 'ethers'
import abi from './contractAbi'

interface VerifierContract {
  getCandidate(): Promise<string>
}

const verifierContract = (signerProvider: ethers.providers.Web3Provider): VerifierContract => {
  const signer: ethers.Signer = signerProvider.getSigner()

  return {
    getCandidate: async () => {
      const contract: ethers.Contract = new ethers.Contract('0xB57CF2D5fc9DbF37B4aa9664793C236008895a64' , abi, signer)
      const candidates: ethers.Transaction = await contract.getCandidates()
      return ''
    }
  }
}

export default verifierContract
