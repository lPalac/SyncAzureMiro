import initMiro from "../../../utils/initMiroAPI";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { miro } = initMiro(req, res);
  if (typeof req.query.code != "string") {
    res.status(400);
    res.send("missing code in the query");
    return;
  }
  console.log("OAuth 2.0 flow kicked off on the BE, code: " + req.query.code);
  await miro.exchangeCodeForAccessToken("", req.query.code);
  res.redirect("/");
}
