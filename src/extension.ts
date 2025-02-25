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
    const timeStatusBar = vscode.window.createStatusBarItem(alignment, constants.STATUS_BAR_PRIORITY);
    const startStopStatusBar = vscode.window.createStatusBarItem(alignment, constants.STATUS_BAR_PRIORITY - 1);
    const resetStatusBar = vscode.window.createStatusBarItem(alignment, constants.STATUS_BAR_PRIORITY - 2);

    // Status Bar Settings for Time Display
    const time = context.globalState.get<string>(constants.GlobalKeys.TIME, constants.DEFAULT_TIME);
    timeStatusBar.text = `$(watch) ${time}`;
    timeStatusBar.tooltip = "Stop Watch";
    timeStatusBar.show();

    // Start/Stop Button Settings
    const updateStartStopButton = () => {
        if (stopwatchManager.getState() === constants.StopwatchState.START) {
            startStopStatusBar.text = "$(debug-pause)";
            startStopStatusBar.tooltip = "Stop Stopwatch";
        } else {
            startStopStatusBar.text = "$(play)";
            startStopStatusBar.tooltip = "Start Stopwatch";
        }
    };
    updateStartStopButton();
    startStopStatusBar.command = 'stopwatch.startStop';
    startStopStatusBar.show();

    // Reset Button Setting
    resetStatusBar.text = "$(debug-restart)";
    resetStatusBar.tooltip = "Reset Stopwatch";
    resetStatusBar.command = 'stopwatch.reset';
    resetStatusBar.show();

    // Command Registration
    context.subscriptions.push(
        vscode.commands.registerCommand('stopwatch.startStop', () => {
            if (stopwatchManager.getState() === constants.StopwatchState.START) {
                stopwatchManager.stop();
            } else {
                stopwatchManager.start();
            }
            updateStartStopButton();
        }),
        vscode.commands.registerCommand('stopwatch.reset', () => {
            stopwatchManager.reset();
            updateStartStopButton();
        })
    );

    // Status Bar Item Registration
    context.subscriptions.push(timeStatusBar, startStopStatusBar, resetStatusBar);

    // Status Bar Update on Time Refresh
    stopwatchManager.onUpdate((time) => {
        timeStatusBar.text = `$(watch) ${time}`;
    });

    // 設定変更の監視
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(async (e) => {
            if (e.affectsConfiguration('stopwatch.switchFont') ||
                e.affectsConfiguration('stopwatch.setStatusBarPosition')) {

                const answer = await vscode.window.showInformationMessage(
                    'StopWatch: Reload window to apply changes?',
                    'Yes',
                    'No'
                );

                if (answer === 'Yes') {
                    vscode.commands.executeCommand('workbench.action.reloadWindow');
                }
            }
        })
    );
}
