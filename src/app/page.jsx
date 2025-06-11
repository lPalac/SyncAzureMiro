import React from "react";
import initMiroAPI from "../utils/initMiroAPI";
import { redirect } from "next/dist/server/api-utils";

const getBoards = async () => {
  const { miro, userId } = initMiroAPI();

  // redirect to auth url if user has not authorized the app
  if (!userId || !(await miro.isAuthorized(userId))) {
    return {
      authUrl: miro.getAuthUrl(),
    };
  }

  const api = miro.as(userId);

  const boards = [];
  for await (const board of api.getAllBoards()) {
    boards.push(board);
  }

  return {
    boards,
  };
};
const getPBIs = async () => {
  const PBIsID = [8230, 8236];

  const response = await fetch(
    `https://dev.azure.com/lilcodelab/7interactive-DiVerso/_apis/wit/workitems?ids=${PBIsID.join(
      ","
    )}&api-version=7.1`,
    {
      headers: {
        Authorization: `Basic ${process.env.AZURE_ACCESS_TOKEN}`,
      },
    }
  ).then((res) => res.json());
  //console.log("response ", response);
  //console.log("response ", response.value[0].fields["System.Title"]);
  //console.log("response ", response.value[0].fields["System.State"]);
  //console.log("response ", response.value[0].fields["system.assignedTo"]);
  //console.log("authUrl ", authUrl);

  return response.value.map((item) => ({
    id: item.id,
    title: item.fields["System.Title"],
    state: item.fields["System.State"],
    description: item.fields["System.Description"],
    assignedTo: item.fields["System.AssignedTo"]?.displayName || "Unassigned",
  }));
};

export default async function Page() {
  const PBIs = await getPBIs();
  const { boards, authUrl } = await getBoards();
  console.log("PBIs ", PBIs);
  return (
    <div>
      <a className="button button-primary" href={""}>
        get PBIs
      </a>
      <div>
        {PBIs.map((pbi) => (
          <div key={pbi.id}>
            <h3>Title:{pbi.title}</h3>
            <p>
              <strong>State:</strong> {pbi.state}
            </p>
            <p>
              <strong>Assigned To:</strong> {pbi.assignedTo}
            </p>
            <div dangerouslySetInnerHTML={{ __html: pbi.description }}></div>
          </div>
        ))}
      </div>
      <p className="p-small">API Calls need to be authenticated</p>

      {authUrl ? (
        <a className="button button-primary" href={authUrl} target="_blank">
          Login
        </a>
      ) : (
        <>
          <p>This is a list of all the boards that your user has access to:</p>

          <ul>
            {boards?.map((board) => (
              <li key={board.name}>{board.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
