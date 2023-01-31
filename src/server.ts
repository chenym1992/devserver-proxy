import { setBasePort, getPort } from "portfinder";
import { workspace } from "vscode";
import proxy from "./proxy";
export let DEFAULT_PORT: number | string = 8778;
let server: { kill: () => void };

function findPort() {
  return new Promise<number | string>((resolve, reject) => {
    setBasePort(+DEFAULT_PORT);
    getPort((error, port) => {
      if (error) {
        return reject(error);
      }
      return resolve(port);
    });
  });
}
export function startServer() {
  console.log("proxy start");
  return new Promise<{ server: any; port: any; open: boolean }>((resolve) => {
    workspace.findFiles("**/.proxyrc.js").then(async (files) => {
      if (files && files.length) {
        delete require.cache[require.resolve(files[0].path)];
        let proxyrc = require(files[0].path) || {};
        if (proxyrc.port) {
          DEFAULT_PORT = proxyrc.port;
        }
        return findPort().then((port) => {
          proxyrc.port = port;
          server = proxy(proxyrc);
          return resolve({ server, port, ...proxyrc });
        });
      }
    });
  });
}

export function stopServer() {
  console.log("proxy stop");
  return new Promise((resolve) => {
    server.kill();
    return resolve(true);
  });
}
