import { NextPage } from "next";
import SendNotification from "../components/SendNotification";
import { serverUrl } from "../lib/constants";

const SendNotificationV2: NextPage = () => {
  return (
    <SendNotification
      notificationsCreateEndpoint={`${serverUrl}/v2/notifications`}
    />
  );
};

export default SendNotificationV2;
