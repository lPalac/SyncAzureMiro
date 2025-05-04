export default function handler(req, res) {
  console.log("ovo je prošlo");
  res.redirect(
    "https://miro.com/oauth/authorize?response_type=code&client_id=" +
      process.env.clientID +
      "&redirect_uri=" +
      process.env.redirectURL
  );
}
