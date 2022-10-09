import WalletConnectProvider from '@walletconnect/web3-provider'
import { Button, Row } from 'antd'
import { providers } from 'ethers'
import { useEffect, useState } from 'react'

function WalletButton() {
  const [account, setAccount] = useState<string>('')
  const [provider, setProvider] = useState<any>()
  const [chainId, setChainId] = useState<number>()

  const connectWallet = async () => {
    try {
      const provider = new WalletConnectProvider({
        rpc: {
          80001: 'https://tame-silent-mountain.matic-testnet.discover.quiknode.pro/4d91e902b03344e82cce2bef04a0df4d65a70eaf'
        },
        bridge: "https://bridge.walletconnect.org",
      })
      await provider.enable()
      const web3Provider = new providers.Web3Provider(provider)

      const wallet = await provider.getWalletConnector()
      setAccount(wallet.accounts[0])
      setProvider(web3Provider)
      setChainId(wallet.chainId)

      provider.on('accountsChanged', (accounts: string[]) => {
        if (accounts[0]) {
          setAccount(accounts[0])
          setProvider(web3Provider)
        } else {
          setAccount('')
        }
      })

      // Subscribe to chainId change
      provider.on('chainChanged', (chainId: number) => {
        setChainId(chainId)
      })
    } catch (error) {
      console.error(`error: walletConnect`, error)
    }
  }

  useEffect(() => {
    connectWallet()
  }, [])


  return (
    <Row gutter={8} align='middle' justify='end'>
        <>
          {account && <Button onClick={connectWallet}>{account.slice(0, 6)}</Button>}
          {!account && <Button onClick={connectWallet}>connect wallet</Button>}
        </>
    </Row>
  )
}

export default WalletButton
