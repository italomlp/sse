import { FunctionComponent, useState } from "react";

type Props = {
  notificationsCreateEndpoint: string;
};

const SendNotification: FunctionComponent<Props> = ({
  notificationsCreateEndpoint,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && !isLoading && <p>Notification sent with success!</p>}
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setIsSuccess(false);
          setIsLoading(true);
          const formData = new FormData(event.currentTarget);
          const data = Object.fromEntries(formData);
          const response = await fetch(notificationsCreateEndpoint, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
          });
          if (response.ok) {
            setIsSuccess(true);
          }
          setIsLoading(false);
        }}
      >
        <div>
          <input
            type="text"
            name="title"
            placeholder="title"
            disabled={isLoading}
          />
        </div>
        <div>
          <input
            type="text"
            name="body"
            placeholder="body"
            disabled={isLoading}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default SendNotification;
