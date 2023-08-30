import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import Highlight from "../components/Highlight";
import { useRownd } from "@rownd/react";
import { getConfig } from "../config";
import Loading from "../components/Loading";

export const ExternalApiComponent = () => {
  const { apiOrigin = "http://localhost:3001" } = getConfig();
  const { is_initializing, is_authenticated } = useRownd();

  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
  });

  const {
    getAccessToken,
    requestSignIn,
  } = useRownd();

  const callApi = async () => {
    if (!is_authenticated) {
      requestSignIn();
      return;
    }

    try {
      const token = await getAccessToken();

      const response = await fetch(`${apiOrigin}/api/external`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  if (is_initializing) {
    return <Loading />;
  }

  return (
    <>
      <div className="mb-5">
        <h1>External API</h1>
        <p className="lead">
          Ping an external API by clicking the button below.
        </p>

        <p>
          This will call a local API on port 3001 that would have been started
          if you run <code>npm run dev</code>. An access token is sent as part
          of the request's `Authorization` header and the API will validate it
          using the API's audience value.
        </p>

        <Button
          color="primary"
          className="mt-5"
          onClick={callApi}
        >
          Ping API
        </Button>
      </div>

      <div className="result-block-container">
        {state.showResult && (
          <div className="result-block" data-testid="api-result">
            <h6 className="muted">Result</h6>
            <Highlight>
              <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
            </Highlight>
          </div>
        )}
      </div>
    </>
  );
};

export default ExternalApiComponent;
