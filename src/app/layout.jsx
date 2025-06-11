import React from "react";
import Image from "next/image";
import Script from "next/script";

import SyncAzureLogo from "../assets/SyncAzureLogo.png";
import { SDKCreateSticyNote } from "../components/SDKUsageDemo";
import { MiroSDKInit } from "../components/SDKInit";
import "./globals.css";

export const metadata = {
  title: "Sync Azure PBIs",
  description: "Sync Azure DevOps Product Backlog Items with Miro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://miro.com/app/static/sdk/v2/miro.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <MiroSDKInit />
        <div id="root">
          <div className="grid">
            <div className="cs1 ce12">
              <Image src={SyncAzureLogo} alt="" width={100} />
              <h1>Sync Azure PBIs</h1>
            </div>
            <div className="cs1 ce12">
              <SDKCreateSticyNote />
            </div>
            <div className="cs1 ce12">
              <p>this is all PBIs in sync azure</p>
            </div>

            <hr className="cs1 ce12" />
            <div className="cs1 ce12">{children}</div>
            <hr className="cs1 ce12" />
            <div className="cs1 ce12">
              <p>Luka Palac</p>
              <a
                className="button button-secondary"
                target="_blank"
                href="https://miro.com/app/board/uXjVLnhyJg4=/?share_link_id=802269273452"
              >
                Vrati se na board
              </a>
              <a
                className="button button-secondary"
                target="_blank"
                href="https://developers.miro.com"
              >
                Pročitajte dokumentaciju
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
