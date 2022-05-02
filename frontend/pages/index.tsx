import { NextPage } from "next";
import { useEffect, useState } from "react";
import { serverUrl } from "../lib/constants";
import INotification from "../lib/models/notification";

const MESSAGE_TYPES = {
  INITIAL_LOAD: "INITIAL_LOAD",
  NEW_NOTIFICATION: "NEW_NOTIFICATION",
  NEW_CLIENT_CONNECTED: "NEW_CLIENT_CONNECTED",
  CLIENT_DISCONNECTED: "CLIENT_DISCONNECTED",
};

const HomeV2: NextPage = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [numberOfClientsConnected, setNumberOfClientsConnected] = useState(0);

  useEffect(() => {
    const eventStream = new EventSource(`${serverUrl}/v2/notifications`);

    eventStream.onmessage = (event) => {
      console.log("event received", event);
      const message = JSON.parse(event.data);

      if (message.type === MESSAGE_TYPES.INITIAL_LOAD) {
        setNumberOfClientsConnected(message.content.numberOfClients);
        return setNotifications((prev) => [
          ...prev,
          ...message.content.notifications,
        ]);
      }
      if (message.type === MESSAGE_TYPES.NEW_NOTIFICATION) {
        return setNotifications((prev) => [...prev, message.content]);
      }
      if (message.type === MESSAGE_TYPES.CLIENT_DISCONNECTED) {
        return setNumberOfClientsConnected((prev) => prev - 1);
      }
      if (message.type === MESSAGE_TYPES.NEW_CLIENT_CONNECTED) {
        return setNumberOfClientsConnected((prev) => prev + 1);
      }
    };

    eventStream.onerror = (error) => {
      console.log("error", error);
      setIsConnected(false);
      eventStream.close();
    };

    eventStream.onopen = () => {
      console.log("event stream opened");
      setIsConnected(true);
    };

    return () => {
      setIsConnected(false);
      eventStream.close();
    };
  }, []);

  return (
    <div>
      <p>Event source connected: {isConnected ? "Yes" : "No"}</p>
      <p>Number of clients connected: {numberOfClientsConnected}</p>
      <hr></hr>
      <div>Notifications:</div>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, i) => (
            <tr key={i}>
              <td>{notification.title}</td>
              <td>{notification.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeV2;
