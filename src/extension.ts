import * as vscode from 'vscode';
import * as constants from './utils/constants';
import { StopwatchManager } from './manager/stopwatchManager';
import { StopwatchViewProvider } from './provider/stopwatchViewProvider';

export function activate(context: vscode.ExtensionContext) {

    const stopwatchManager = new StopwatchManager(context);
    const provider = new StopwatchViewProvider(context, context.extensionUri, stopwatchManager);

    stopwatchManager.setViewProvider(provider);

    // Register WebviewViewProvider for the stopwatch view
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(StopwatchViewProvider.viewType, provider)
    );

    // Set the position of the status bar based on user settings
    const configuration = vscode.workspace.getConfiguration('stopwatch');
    const position = configuration.get<string>('setStatusBarPosition') || constants.StatusBarDisplayPosition.RIGHT;

    let alignment: vscode.StatusBarAlignment;
    if (position === constants.StatusBarDisplayPosition.LEFT) {
        alignment = vscode.StatusBarAlignment.Left;
    } else {
        alignment = vscode.StatusBarAlignment.Right;
    }

    // Create and display the status bar
    const statusBar = vscode.window.createStatusBarItem(alignment, constants.STATUS_BAR_PRIORITY);
    const time = context.globalState.get<string>(constants.GlobalKeys.TIME, constants.DEFAULT_TIME);
    statusBar.text = `$(watch) ${time}`;
    statusBar.tooltip = "Stop Watch";
    statusBar.show();

    context.subscriptions.push(statusBar);

    // Update the status bar when the stopwatch time changes
    stopwatchManager.onUpdate((time) => {
        statusBar.text = `$(watch) ${time}`;
    });
}