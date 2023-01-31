// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { start, stop } from "./app";
export function activate(context: vscode.ExtensionContext) {
  console.log("exec devserver-proxy activate");
  let startCommand = vscode.commands.registerCommand(
    "devserver-proxy.start",
    () => {
      start();
    }
  );
  context.subscriptions.push(startCommand);
  let stopCommand = vscode.commands.registerCommand(
    "devserver-proxy.stop",
    () => {
      stop();
    }
  );
  context.subscriptions.push(stopCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {
  stop();
}
