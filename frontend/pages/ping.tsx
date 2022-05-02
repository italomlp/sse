import { NextPage } from "next";
import { useEffect, useState } from "react";
import { serverUrl } from "../lib/constants";

const Home: NextPage = () => {
  const [rows, setRows] = useState<Object[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventStream = new EventSource(`${serverUrl}/v1/ping`);

    eventStream.onmessage = (event) => {
      console.log("event received", event);

      setRows((prev) => [...prev, JSON.parse(event.data)]);
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
      <div>Ping data:</div>
      <pre>{rows.map((row, i) => JSON.stringify(row, null, 2) + "\n")}</pre>
    </div>
  );
};

export default Home;
