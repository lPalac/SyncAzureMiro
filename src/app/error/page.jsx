import React from "react";

export default function ErrorPage({ searchParams }) {
  const message = searchParams?.message || "unknown_error";
  const details = searchParams?.details || "";

  const getErrorMessage = (errorType) => {
    switch (errorType) {
      case "no_code":
        return "No authorization code was received from Miro. Please try the login process again.";
      case "oauth_error":
        return "There was an error during the OAuth process with Miro.";
      case "auth_url_error":
        return "Failed to generate the Miro authorization URL.";
      case "env_config_error":
        return "Environment configuration is incomplete. Please check your .env.local file.";
      default:
        return "An unexpected error occurred.";
    }
  };

  const getFixInstructions = (errorType) => {
    switch (errorType) {
      case "env_config_error":
        return (
          <div
            style={{
              backgroundColor: "#fff3cd",
              padding: "15px",
              borderRadius: "4px",
              marginTop: "15px",
              border: "1px solid #ffeaa7",
            }}
          >
            <h4>To fix this configuration error:</h4>
            <ol style={{ marginLeft: "20px" }}>
              <li>
                Create a <code>.env.local</code> file in your project root
              </li>
              <li>
                Add the missing environment variables:
                <pre
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "10px",
                    borderRadius: "4px",
                    marginTop: "10px",
                    fontSize: "12px",
                  }}
                >
                  {`MIRO_CLIENT_ID=your_miro_client_id_here
MIRO_CLIENT_SECRET=your_miro_client_secret_here
MIRO_REDIRECT_URI=http://localhost:3000/api/auth/miro/callback`}
                </pre>
              </li>
              <li>
                Update your Miro app redirect URI in the{" "}
                <a
                  href="https://developers.miro.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Miro Developer Console
                </a>
              </li>
              <li>Restart your development server</li>
            </ol>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h3>Authentication Error</h3>
      <p className="p-small" style={{ color: "red" }}>
        {getErrorMessage(message)}
      </p>

      {details && (
        <div
          style={{
            backgroundColor: "#f8f8f8",
            padding: "10px",
            borderRadius: "4px",
            marginTop: "10px",
            fontSize: "12px",
            color: "#666",
          }}
        >
          <strong>Details:</strong> {decodeURIComponent(details)}
        </div>
      )}

      {getFixInstructions(message)}

      <div style={{ marginTop: "20px" }}>
        <a className="button button-primary" href="/">
          Back to Home
        </a>
        {message !== "env_config_error" && (
          <>
            <span style={{ margin: "0 10px" }}>or</span>
            <a className="button button-secondary" href="/api/auth/miro/signin">
              Try Again
            </a>
          </>
        )}
      </div>
    </div>
  );
}
