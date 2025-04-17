Miro.board.ui.on("app_card:open", (event) => {
  console.log("Subscribed to app card open event", event);
  const { appCard } = event;

  const url = `https://my.app.example.com/modal.html?appCardId=${appCard.id}`;
  Miro.board.ui.openModal({
    url,
  });
});
