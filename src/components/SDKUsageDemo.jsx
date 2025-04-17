"use client";

async function addSticky() {
  const stickyNote = await miro.board.createStickyNote({
    content: "Hello, World!",
  });
  await miro.board.viewport.zoomTo(stickyNote);
}

export const SDKCreateSticyNote = () => {
  return (
    <div>
      <h3>SDK Create Sticy Note</h3>
      <p className="p-small">SDK doesnt need to be authenticated.</p>
      <p>
        <a href="https://developers.miro.com/docs/build-your-first-hello-world-app#step-2-try-out-your-app-in-miro">
          Miro board
        </a>
      </p>
      <button
        type="button"
        onClick={addSticky}
        className="button button-primary"
      >
        Add sticky note
      </button>
    </div>
  );
};
