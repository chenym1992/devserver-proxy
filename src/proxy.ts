import { workspace } from "vscode";
import { DEFAULT_PORT } from "./server";
import type { Filter, Options } from "http-proxy-middleware";
const serveIndex = require("serve-index");
const express = require("express");
const compress = require("compression");
const { createProxyMiddleware } = require("http-proxy-middleware");
const killable = require("killable");

export default function (setting: {
  proxy?: { [x: string]: Filter | Options };
  port: any;
}) {
  const app = express();

  // const contentBase = process.cwd();
  const contentBase =
    workspace.workspaceFolders && workspace.workspaceFolders[0].uri.fsPath;

  app.get("*", express.static(contentBase));
  app.get("*", serveIndex(contentBase));
  if (setting.proxy) {
    Object.keys(setting.proxy).map((path) => {
      console.log('path: ', path);
      if (setting.proxy?.[path]) {
        const exampleProxy = createProxyMiddleware(setting.proxy[path]);
        app.use(path, exampleProxy);
      }
    });
  }

  app.use(compress());
  // listeningApp = http.createServer(app);
  return killable(app.listen(setting.port || DEFAULT_PORT));
}
