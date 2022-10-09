import NodeWalletConnect from "@walletconnect/node";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import { useState } from 'react'
import {message} from 'antd'

export default function useConnectWallet() {
  const [account, setAccount] = useState<string>('')

  const walletConnector = new NodeWalletConnect(
  {
    bridge: "https://bridge.walletconnect.org",
  },
  {
    clientMeta: {
      description: "Zk vote",
      url: "https://nodejs.org/en/",
      icons: ["https://nodejs.org/static/images/logo.svg"],
      name: "Zk Vote",
    },
  }
);

if (!walletConnector.connected) {
  walletConnector.createSession().then(() => {
    const uri = walletConnector.uri;
    WalletConnectQRCodeModal.open(
      uri,
      () => {
         message.success('successfully connected wallet', 5);
      },
    );
  });
}

WalletConnectQRCodeModal.close();

walletConnector.on("connect", (error, payload) => {
  if (error) {
    throw error;
  }

  WalletConnectQRCodeModal.close();

  const { accounts, chainId } = payload.params[0];
  setAccount(accounts[0])
});

walletConnector.on("session_update", (error, payload) => {
  if (error) {
    throw error;
  }
  WalletConnectQRCodeModal.close();

  const { accounts, chainId } = payload.params[0];
  setAccount(accounts[0])
});


return {
  provider: walletConnector,
  walletAccount: account
}

}