import Head from 'next/head'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useState, useEffect } from 'react'
import { providers } from 'ethers'
import { QRCode } from 'react-qr-svg'
import styled from 'styled-components'
import { DefaultTemplatePage } from '../template/DefaultTemplatePage'
import { Alert, Card, Button } from 'antd'
import usePushNotification from '../../src/hooks/usePushNotification'

export default function Validate() {
  const [account, setAccount] = useState<any>('')
  const [web3provider, setProvider] = useState<any>();
  const { sendNotification } = usePushNotification()

  const data = [
    { name: 'Dog', value: '0x446f670000000000000000000000000000000000000000000000000000000000'},
    { name: 'Cat', value: '0x4361740000000000000000000000000000000000000000000000000000000000'},
    { name: 'Bird', value: '0x4269726400000000000000000000000000000000000000000000000000000000'},
    { name: 'Chameleon', value: '0x4368616d656c656f6e0000000000000000000000000000000000000000000000'}
  ];

  const connectWallet = async () => {
    try {
      const provider = new WalletConnectProvider({
        bridge: 'https://bridge.walletconnect.org',
        qrcode: true,
        rpc: {
          80001: 'https://tame-silent-mountain.matic-testnet.discover.quiknode.pro/4d91e902b03344e82cce2bef04a0df4d65a70eaf'
        },
        pollingInterval: 3000
      })
      await provider.enable()
      const web3Provider = new providers.Web3Provider(provider)
      const wallet = await provider.accounts
      setAccount(wallet[0])
      setProvider(web3Provider)
    } catch (error) {
      console.error(`error: walletConnect`, error)
    }
  }

  useEffect(() => {
    if (account) return;

    connectWallet()
  }, [])

  useEffect(() => {
    if (!web3provider?.on) return;

    web3provider.on('accountsChanged', (accounts: string[]) => {
      if (accounts[0]) {
        setAccount(accounts[0])
        setProvider(web3provider)
      } else (
        setAccount('')
      )
    })
    web3provider.on('disconnect', () => setAccount(''))

    if (account) {
      sendNotification(account);
    }
  }, [web3provider, account])


  const qrProofRequestJson = {
    id: "c811849d-6bfb-4d85-936e-3d9759c7f105",
    typ: "application/iden3comm-plain-json",
    type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
    body: {
      transaction_data: {
        contract_address: '0x8937d0ec316Df09998f5BF9a724D8acf72c2BcB1',
        method_id: "b68967e2",
        chain_id: 80001,
        network: "polygon-mumbai"
      },
      reason: "airdrop participation",
      scope: [
        {
          id: 1,
          circuit_id: "credentialAtomicQuerySig",
          rules: {
            query: {
              allowed_issuers: ["119KRLZpzGDaAvShfZUBFZr41EC9tERjDRQiunpEzV"],
              req: {
                Date: {
                  $lt: 20000101
                }
              },
              schema: {
                url: "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/38bb428c-cc3a-4316-a169-ff092aa0d4e3.json-ld",
                type: "KYCAgeCredential"
              }
            }
          }
        }
      ]
    }
  };

  return (
    <>
      <Head>
        <title>Zk Vote</title>
      </Head>
      <DefaultTemplatePage >
        <Container>
          {!account ? (<Button onClick={connectWallet}>connect wallet</Button>) : (
            <>
              <Alert
                description="Please only scan this QR code with the Polygon ID Wallet mobile app (other wallets are not supported)"
                type="info"
                showIcon
              />
              <h2>Connect Polygon ID</h2>
              <p><a href={`iden3comm://?i_m=${btoa(JSON.stringify(qrProofRequestJson))}`}>CLICK HERE</a>{` `} or Scan QR code bellow</p>
              <br/>
              <Card>
                <QRCode
                  bgColor="#FFFFFF"
                  fgColor="#7f56d9"
                  level="Q"
                  style={{ width: 300 }}
                  value={JSON.stringify(qrProofRequestJson)}
                />
            </Card>
            </>
          )}
          </Container>
      </DefaultTemplatePage>
    </>
  )
}

const { Container } = {
  Container: styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 26px;
    h2 {
      color: #7f56d9;
      text-transform: uppercase;
      font-size: 20px;
    }
  `,
}