import axios from "axios";
import { serialize } from "cookie";

export default function handler(req, res) {
  let access_token;
  let refresh_token;

  if (req.query.code) {
    let url = `https://api.miro.com/v2/oauth/token?grant_type=authorization_code&client_id=${process.env.clientID}&client_secret=${process.env.clientSecret}&redirect_uri=${process.env.redirectURL}&code=${req.query.code}`;
    //V1 je na tutorialu, V2 je tu
    async function grabToken() {
      try {
        let oAuthRespones = await axios.post(url);
        console.log("Ovo je oAuth respons", oAuthRespones);
        access_token = oAuthRespones.data.access_token;
        refresh_token = oAuthRespones.data.refresh_token;

        if (access_token) {
          console.log("Ušao i primio ");
          console.log("access_token = " + access_token);
          console.log("refresh_token = " + refresh_token);

          res
            .setHeader("Set-Cookie", [
              serialize("LPmiro_access_token", access_token, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 60 * 60 * 24 * 30,
              }), // 30 days
              serialize("LPmiro_refresh_token", refresh_token, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
              }), // 30 days
            ])
            .redirect("/");
        }
      } catch (error) {
        // Handle error in fetching tokens
        console.error(" LPLP Error exchanging code for tokens:", error);
        res.status(500).send("Internal Server Error");
        res.redirect("/error");
      }
    }
    return grabToken();
  }
}
