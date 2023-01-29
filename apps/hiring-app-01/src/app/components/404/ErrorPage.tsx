import { Button } from "@mantine/core";
import { useHistory } from "react-router-dom";

/** It might not be pretty - yet, but it's effective! */
const ErrorPage = () => {
  const history = useHistory();

  const backToDashboard = () => {
    history.push(`/`);
  };
  return (
    <div>
      <div>Whoops! Looks like something went wrong.</div>
      <Button onClick={backToDashboard}>Back to Dashboard</Button>
    </div>
  );
};

export default ErrorPage;
