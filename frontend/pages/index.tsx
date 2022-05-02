import { NextPage } from "next";
import { useEffect, useState } from "react";
import { serverUrl } from "../lib/constants";
import INotification from "../lib/models/notification";

const Home: NextPage = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventStream = new EventSource(`${serverUrl}/v1/notifications`);

    eventStream.onmessage = (event) => {
      console.log("event received", event);
      const message = JSON.parse(event.data);

      if (message.length) {
        return setNotifications((prev) => [...prev, ...message]);
      }
      return setNotifications((prev) => [...prev, message]);
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

export default Home;
