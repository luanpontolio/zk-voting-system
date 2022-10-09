import Head from 'next/head'
import { QRCode } from 'react-qr-svg'
import styled from 'styled-components'
import { DefaultTemplatePage } from '../template/DefaultTemplatePage'
import { Alert, Card } from 'antd'

export default function Validate() {

  const qrProofRequestJson = {
  id: "c811849d-6bfb-4d85-936e-3d9759c7f105",
  typ: "application/iden3comm-plain-json",
  type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
  body: {
    transaction_data: {
      contract_address: '0xecf178144ccec09417412d66e2ecc8a2841ee228',
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
                $lt: 20010101
              },
            },
            schema: {
              url:
                "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/38bb428c-cc3a-4316-a169-ff092aa0d4e3.json-ld",
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
           <Alert
              description="Please only scan this QR code with the Polygon ID Wallet mobile app (other wallets are not supported)"
              type="info"
              showIcon
            />
          <h2>Connect Polygon ID for QR or </h2>
          <Card>
             <QRCode
              bgColor="#FFFFFF"
              fgColor="#7f56d9"
              level="Q"
              style={{ width: 300 }}
              value={JSON.stringify(qrProofRequestJson)}
              />
          </Card>
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