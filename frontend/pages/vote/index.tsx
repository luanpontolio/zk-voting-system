import { Button, Card } from "antd"
import Meta from "antd/lib/card/Meta"
import styled from "styled-components"
import WalletButton from "../../src/contracts/wallet/connectWallet"
import { DefaultTemplatePage } from "../template/DefaultTemplatePage"

export default function Vote() {
  const data = [
    { name: 'Dog', value: '0x446f670000000000000000000000000000000000000000000000000000000000'},
    { name: 'Cat', value: '0x4361740000000000000000000000000000000000000000000000000000000000'},
    { name: 'Bird', value: '0x4269726400000000000000000000000000000000000000000000000000000000'},
    { name: 'Chameleon', value: '0x4368616d656c656f6e0000000000000000000000000000000000000000000000'}
  ];

  

  return (
      <DefaultTemplatePage>
        <WalletButton />
        <Content>
          {data.map((d) => (
            <CardContent
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }>
              <Meta
                title={d.name}
              />
              <Button type="primary">Vote</Button>
          </CardContent>
          ))}
        </Content>
      </DefaultTemplatePage>
  )
}

const { Content, CardContent } = {
  Content: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 26px;
  `,
  CardContent: styled(Card)`
   width: 280px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   text-align: center;
   gap: 26px;
   button {
    width: 100%;
    margin-top: 26px;
    background: #7f56d9;
    border: none;
    &:hover, &:active, &:focus {
      background: #8754f5;
    }
   }
  `
}

