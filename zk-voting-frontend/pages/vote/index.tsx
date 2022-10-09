import { Button, Card } from "antd"
import Meta from "antd/lib/card/Meta"
import styled from "styled-components"
import useConnectWallet from "../hooks/connectWallet"
import { DefaultTemplatePage } from "../template/DefaultTemplatePage"

export default function Vote() {
  const { walletAccount } = useConnectWallet()

  console.log('account', walletAccount)
  
  return (
      <DefaultTemplatePage>
        <Content>
          <CardContent
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
          }>
            <Meta
              title="Jairzinho"
            />
            <Button type="primary">Vote</Button>
        </CardContent>
        
        <CardContent
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
          }>
            <Meta
              title="Lulinha"
            />
            <Button type="primary">Vote</Button>
        </CardContent>
        
        <CardContent
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
          }>
            <Meta
              title="Cirinho"
            />
            <Button type="primary">Vote</Button>
        </CardContent>
        
        <CardContent
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
          }>
            <Meta
              title="Tabetinha"
            />
            <Button type="primary">Vote</Button>
          </CardContent>
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

