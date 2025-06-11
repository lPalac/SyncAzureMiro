"use client";

import { useState } from "react";

async function addSticky() {
  const stickyNote = await miro.board.createStickyNote({
    content: "Hello, World!",
  });
  await miro.board.viewport.zoomTo(stickyNote);
}

async function getBoards() {
  const boards = await miro.board.getAllBoards();
  return boards;
}

export const SDKCreateSticyNote = () => {
  const [boards, setBoards] = useState([]);
  const getBoardHandler = async () => {
    const boards = await getBoards();
    console.log("boards", boards);
    setBoards(boards);
  };

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDataHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      console.log("Fetched data:", result);
      setData(result);
    } catch (err) {
      console.log("Error fetching data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>SDK Create Sticy Note</h3>
      <p className="p-small">SDK doesnt need to be authenticated.</p>
      <p>
        <a href="https://developers.miro.com/docs/build-your-first-hello-world-app#step-2-try-out-your-app-in-miro">
          Miro board
        </a>
      </p>
      {boards.map((board) => (
        <div key={board.id}>{board.name}</div>
      ))}
      <button
        type="button"
        onClick={addSticky}
        className="button button-primary"
      >
        Add sticky note
      </button>
      <button onClick={getBoardHandler}>Get Boards</button>
      <button onClick={fetchDataHandler}>Fetch Data</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <p>Data: {JSON.stringify(data)}</p>}
    </div>
  );
};
