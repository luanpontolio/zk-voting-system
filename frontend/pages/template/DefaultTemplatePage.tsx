import Layout, { Content, Header } from "antd/lib/layout/layout"
import styled from 'styled-components'
import Head from "next/head"
import { ReactNode } from "react"
import Logo from '../../public/zk-vote.png'
import 'antd/dist/antd.css';


interface DefaultPageTemplateProps {
  children: ReactNode
}
export function DefaultTemplatePage({children}: DefaultPageTemplateProps) {
  return (
    <>
      <Head>
        <title>Zk vote</title>
        <meta property='title' content='Zk vote' />
         <meta property='og:title' content='Zk-Vote' />
      </Head>
      <Layout style={{ minHeight: '100vh', maxWidth: '1200px', margin: '0 auto', background: '#FFF', color: '#000' }}>
        <ContentHeader>
          <ImageLogo src={Logo.src} />
        </ContentHeader>
        <Main>{children}</Main>
      </Layout>
    </>
  )
}

const { Main, ImageLogo, ContentHeader } = {
  Main: styled(Content)`
    padding: 16px 24px;
    min-height: calc(100vh - 128px);
    max-width: calc(var(--screen-xl) - 48px);
    margin: 0 auto;
    width: 100%;
  `,
  ImageLogo: styled.img`
    width: auto;
    height: 60px;
  `,
  ContentHeader: styled.div`
    max-height: 65px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    gap: 26px;
    margin-bottom: 20px;

     button {
    width: 180px;
    margin-top: 26px;
    background: #7f56d9;
    border: none;
    &:hover, &:active, &:focus {
      background: #8754f5;
    }
   }
  `
}