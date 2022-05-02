import { NextPage } from "next";
import SendNotification from "../components/SendNotification";
import { serverUrl } from "../lib/constants";

const SendNotificationV1: NextPage = () => {
  return (
    <SendNotification
      notificationsCreateEndpoint={`${serverUrl}/v1/notifications`}
    />
  );
};

export default SendNotificationV1;
