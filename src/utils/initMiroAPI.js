import { Miro } from "@mirohq/miro-api";
import { cookies } from "next/headers";

const MIRO_SESSION_COOKIE = "miro_session";
const MIRO_TOKENS_COOKIE = "miro_tokens";

export default function initMiroAPI() {
  let cookieInstance;
  let sessionId = null;

  try {
    cookieInstance = cookies();
    // Get existing session ID (don't create one here)
    sessionId = cookieInstance.get(MIRO_SESSION_COOKIE)?.value || null;
  } catch (error) {
    console.warn(
      "Unable to access cookies during initialization:",
      error.message
    );
    cookieInstance = null;
  }

  // Storage interface for the Miro SDK
  const storage = {
    get: (userId) => {
      if (!cookieInstance) return null;

      try {
        const allTokens = JSON.parse(
          cookieInstance.get(MIRO_TOKENS_COOKIE)?.value || "{}"
        );
        return allTokens[userId] || null;
      } catch (err) {
        console.error("Error parsing miro tokens cookie:", err);
        return null;
      }
    },
    set: (userId, tokenData) => {
      if (!cookieInstance) {
        console.warn("Cannot set tokens: cookie instance not available");
        return;
      }

      // This will only be called from the OAuth callback route handler
      try {
        const allTokens = JSON.parse(
          cookieInstance.get(MIRO_TOKENS_COOKIE)?.value || "{}"
        );
        allTokens[userId] = tokenData;

        cookieInstance.set(MIRO_TOKENS_COOKIE, JSON.stringify(allTokens), {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
      } catch (err) {
        console.error("Error setting miro tokens cookie:", err);
      }
    },
  };

  // Initialize Miro SDK with proper configuration
  const miro = new Miro({
    clientId: process.env.MIRO_CLIENT_ID,
    clientSecret: process.env.MIRO_CLIENT_SECRET,
    redirectUrl: process.env.MIRO_REDIRECT_URI,
    storage,
  });

  return {
    miro,
    sessionId,
    userId: sessionId, // Use sessionId as userId for Miro API calls
  };
}
