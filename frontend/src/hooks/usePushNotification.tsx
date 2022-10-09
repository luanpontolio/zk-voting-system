import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

export default function usePushNotification () {
  const PK = 'word inch differ stable hello churn member six category ready decrease refuse'; // channel private key
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);

    const sendNotification = async() => {
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
            title: `[sdk-test] payload title`,
            body: `sample msg body`,
            cta: '',
            img: ''
          },
          recipients: 'eip155:5:0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1',
          channel: 'eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681',
          env: 'staging'
        });
        
        console.log('API repsonse: ', apiResponse);
      } catch (err) {
        console.error('Error: ', err);
      }
    }

    return { sendNotification }
}