import { StatusBarAlignment, window } from "vscode";
import { DEFAULT_PORT } from "./server";

let statusbar = window.createStatusBarItem(StatusBarAlignment.Right, 100);
statusbar.show();

export function init() {
  console.log("exec Init");
  working("loading...");
  setTimeout(function () {
    live();
  }, 1000);
}

export function working(workingMsg?: string) {
  workingMsg = workingMsg || "Working on it...";
  statusbar.text = `$(pulse)${workingMsg}`;
  statusbar.tooltip =
    "In case if it takes long time, try to close all window and restart.";
  statusbar.command = undefined;
}

export function live() {
  statusbar.text = "$(flame) DevserverProxy";
  statusbar.command = "devserver-proxy.start";
  statusbar.tooltip = "Click to start devserver proxy";
}

export function offline(port = DEFAULT_PORT) {
  statusbar.text = `$(circle-slash) Port : ${port}`;
  statusbar.command = "devserver-proxy.stop";
  statusbar.tooltip = "Click to stop devserver proxy";
}
