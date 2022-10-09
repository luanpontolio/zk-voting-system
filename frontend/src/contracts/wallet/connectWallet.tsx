import WalletConnectProvider from '@walletconnect/web3-provider'
import { Button, Row } from 'antd'
import { providers } from 'ethers'
import { useEffect, useCallback, useState } from 'react'

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
      })
      await provider.enable()
      const web3Provider = new providers.Web3Provider(provider)

      const wallet = await provider.getWalletConnector()
      console.log(wallet.accounts)
      setAccount(wallet.accounts[0])
      setProvider(web3Provider)
      setChainId(wallet.chainId)
    } catch (error) {
      console.error(`error: walletConnect`, error)
    }
  }

  useEffect(() => {
    if (account) return;
    connectWallet()
  }, [])

  useEffect(() => {
    if (!provider?.on) return;

    provider.on('accountsChanged', (accounts: string[]) => {
      if (accounts[0]) {
        setAccount(accounts[0])
        setProvider(provider)
      } else {
        setAccount('')
      }
    })

    // Subscribe to chainId change
    provider.on('chainChanged', (chainId: number) => {
      setChainId(chainId)
    })
  }, [provider])

  return (
    <Row gutter={8} align='middle' justify='end'>
        <>
          {account && <Button>{account.slice(0, 6)}</Button>}
          {!account && <Button onClick={connectWallet}>connect wallet</Button>}
        </>
    </Row>
  )
}

export default WalletButton
