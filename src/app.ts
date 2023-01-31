import { window } from "vscode";
import { startServer, stopServer } from "./server";
import { init, live, offline, working } from "./statusbar";
const open = require("open");
init();
let isStaging = false,
  isServerRunning = false,
  runningPort: any;

function toggleStatusBar() {
  isStaging = false;
  if (!isServerRunning) {
    offline(runningPort);
  } else {
    live();
  }
  isServerRunning = !isServerRunning;
}

export function start() {
  isStaging = true;
  console.log("devserver-proxy start...");
  startServer().then(({ port, open }) => {
    runningPort = port;
    if (open) {
      openBrowser(runningPort, "");
    }
    toggleStatusBar();
  });
  working("Starting...");
}

export function stop(this: any) {
  if (isStaging) {
    return;
  }
  if (!isServerRunning) {
    showPopUpMsg(`Devserver proxy is not already running`);
    return;
  }

  console.log("exec devserver-proxy stop");
  stopServer().then(() => {
    toggleStatusBar();
  });
  showPopUpMsg("Devserver proxy is now stopped.");
  working("Disposing...");
}
function showPopUpMsg(msg: string, isErrorMsg?: boolean, isWarning?: boolean) {
  if (isErrorMsg) {
    window.showErrorMessage(msg);
  } else if (isWarning) {
    window.showWarningMessage(msg);
  } else {
    window.showInformationMessage(msg);
  }
}

function openBrowser(port: number, path: string) {
  const host = "localhost";
  const protocol = "http";
  if (path.startsWith("\\") || path.startsWith("/")) {
    path = path.substring(1, path.length);
  }
  path = path.replace(/\\/gi, "/");
  try {
    open(`${protocol}://${host}:${port}/${path}`);
  } catch (error) {
    showPopUpMsg(
      `Server is started at ${runningPort} but failed to open browser. Try to change the CustomBrowser settings.`,
      true
    );
    console.log("\n\nError Log to open Browser : ", error);
    console.log("\n\n");
  }
}
