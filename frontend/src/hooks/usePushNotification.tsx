import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

export default function usePushNotification () {
  const PK = 'word inch differ stable hello churn member six category ready decrease refuse'; // channel private key
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);

    const sendNotification = async(account: string) => {
      try {
        const apiResponse = await PushAPI.payloads.sendNotification({
          signer,
          type: 3,
          identityType: 2,
          notification: {
            title: `Congratulation`,
            body: `Your vote was registered successfully`
          },
          payload: {
            title: '',
            body: '',
            cta: '',
            img: ''
          },
          recipients: `eip155:80001:<${account}>`, // recipient address
          channel: 'eip155:80001:0x00bE08a2170113b0cacCA41BBd88f69f315b38F7',
          env: 'staging'
        });

        console.log('API repsonse: ', apiResponse);
      } catch (err) {
        console.error('Error: ', err);
      }
    }

    return { sendNotification }
}