// project-cards.js
import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";

// initialize Supabase (Service Role key so we can JOIN into auth)
const supabase = createClient(
  process.env.VITE_DATABASE_URL,
  process.env.VITE_DATABASE_SERVICE_ROLE_KEY
);

exports.handler = async function (event) {
  // 1) Validate & parse payload
  if (!event.body) {
    return { statusCode: 400, body: "Missing request body" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  // Only handle work-item updates
  if (payload.eventType !== "workitem.updated") {
    return { statusCode: 200, body: "Ignored event type" };
  }

  const resource = payload.resource;
  const fields = resource.fields || {};

  // 2) Extract the PBI number & new state
  const azurePBINumber = fields["System.Id"];
  const azureState = fields["System.State"];

  if (!azurePBINumber || !azureState) {
    return {
      statusCode: 422,
      body: "Payload missing System.Id or System.State",
    };
  }

  // 3) Map Azure state -> Miro card color
  const getStateColor = (state) => {
    switch (state) {
      case "New":
        return "#E53935";
      case "Active":
        return "#FFB300";
      case "Resolved":
      case "Closed":
        return "#7CB342";
      default:
        return "#C3C4C3";
    }
  };
  const color = getStateColor(azureState);

  // 4) Look up your mapping row in Supabase
  const { data: mappings, error: dbError } = await supabase
    .from("card-mapping")
    .select(
      `
      miroAppCardId,
      miroBoardId,
      auth ( access_token )
    `
    )
    .eq("azurePBINumber", azurePBINumber)
    .limit(1);

  if (dbError) {
    console.error("Supabase error:", dbError);
    return { statusCode: 500, body: "DB lookup failure" };
  }
  if (!mappings?.length) {
    return {
      statusCode: 404,
      body: `No card-mapping found for Azure PBI #${azurePBINumber}`,
    };
  }

  const { miroAppCardId, miroBoardId, auth } = mappings[0];
  const accessToken = auth.access_token;

  // 5) PATCH the Miro app-card's theme
  const miroUrl = `https://api.miro.com/v2/boards/${miroBoardId}/app_cards/${miroAppCardId}`;
  const resp = await fetch(miroUrl, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      style: {
        cardTheme: color,
      },
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    console.error("Miro API error:", errText);
    return { statusCode: resp.status, body: errText };
  }

  // 6) All done
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Card theme set to '${azureState}' (${color})`,
    }),
  };
};
