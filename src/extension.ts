import * as vscode from 'vscode';
import * as constants from './utils/constants';


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

class StopwatchManager {
    private _viewProvider?: StopwatchViewProvider;
    private _startTime?: number;
    private _elapsedTime = 0;
    private _intervalId?: NodeJS.Timeout;
    private _state = constants.StopwatchState.STOP;
    private _updateListeners: ((time: string) => void)[] = [];

    constructor(private readonly context: vscode.ExtensionContext) {
        // Restore the saved state
        this._elapsedTime = context.globalState.get<number>(constants.GlobalKeys.ELAPSED_TIME, 0);
        this._state = context.globalState.get<constants.StopwatchState>(constants.GlobalKeys.STATE, constants.StopwatchState.STOP);
    }

    public setViewProvider(viewProvider: StopwatchViewProvider) {
        this._viewProvider = viewProvider;
    }

    private _isTimeFormatValid(input: string): boolean {
        const regex = /^\d{2}:\d{2}:\d{2}$/;
        if (!regex.test(input)) {
            return false;
        };
        const [hours, minutes, seconds] = input.split(":").map(Number);
        return hours < 100 && minutes < 60 && seconds < 60;
    }

    public start() {
        try {
            if (!this._startTime) {
                this._startTime = Date.now() - this._elapsedTime;
            }
            this._state = constants.StopwatchState.START;
            
            const intervalMs = 100;
            if (!this._intervalId) {
                this._intervalId = setInterval(() => {
                    this._elapsedTime = Date.now() - (this._startTime || 0);
                    this._notifyUpdate();

                    const elapsedTimeStr = this.getElapsedTime();
                    const validTime = this._isTimeFormatValid(elapsedTimeStr) ? elapsedTimeStr : constants.DEFAULT_TIME;
                    this.context.globalState.update(constants.GlobalKeys.TIME, validTime);
                    this.context.globalState.update(constants.GlobalKeys.ELAPSED_TIME, this._elapsedTime);
                }, intervalMs);
            }

            this.context.globalState.update(constants.GlobalKeys.STATE, this._state);
        } catch (error) {
            console.error('Error starting the stopwatch:', error);
        }
    }

    public stop() {
        if (this._intervalId !== undefined) {
            clearInterval(this._intervalId);
            this._intervalId = undefined;
        }
        this._startTime = undefined;
        this._state = constants.StopwatchState.STOP;
        this._notifyUpdate();
        this.saveState();
    }

    public reset() {
        if (this._intervalId !== undefined) {
            clearInterval(this._intervalId);
            this._intervalId = undefined;
        }
        this._elapsedTime = 0;
        this._startTime = undefined;
        this._state = constants.StopwatchState.RESET;
        this._notifyUpdate();
        this.saveState();
        this.context.globalState.update(constants.GlobalKeys.TIME, constants.DEFAULT_TIME);
    }
    
    private _padZero(value: number): string {
        return value.toString().padStart(2, '0');
    }

    // Get the formatted elapsed time (HH:MM:SS)
    public getElapsedTime(): string {
        const totalMilliseconds = this._elapsedTime;
        const hours = Math.floor(totalMilliseconds / 3600000);
        const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
        const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        return `${this._padZero(hours)}:${this._padZero(minutes)}:${this._padZero(seconds)}`;
    }

    public getState(): constants.StopwatchState {
        return this._state;
    }

    public onUpdate(listener: (time: string) => void) {
        this._updateListeners.push(listener);
    }

    // Notify listeners of time updates
    private _notifyUpdate() {
        const time = this.getElapsedTime();
        this._updateListeners.forEach((listener) => {
            listener(this._isTimeFormatValid(time) ? time : constants.DEFAULT_TIME);
        });

        if (this._viewProvider) {
            this._viewProvider.notifyUpdate();
        }
    }

    // Save the current state of the stopwatch
    public saveState() {
        this.context.globalState.update(constants.GlobalKeys.ELAPSED_TIME, this._elapsedTime);
        this.context.globalState.update(constants.GlobalKeys.STATE, this._state);
    }
}


class StopwatchViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'stopwatch.stopwatchView';
    private _view?: vscode.WebviewView;

    constructor(private readonly context: vscode.ExtensionContext, private readonly _extensionUri: vscode.Uri, private readonly stopwatchManager: StopwatchManager) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        _context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;
        let watchState = '';

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        
        // Set the HTML content for the webview
        if (this._view) {
            webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        }

        webviewView.onDidChangeVisibility(() => {
            if (webviewView.visible && this._view) {
                let time = this.context.globalState.get<string>(constants.GlobalKeys.TIME, constants.DEFAULT_TIME);
                if(watchState === constants.StopwatchState.RESET) {
                    time = constants.DEFAULT_TIME;
                }
                
                this._view.webview.postMessage({
                    command: 'updateTime',
                    time: time,
                    state: constants.StopwatchState.STOP,
                });
            }
        });

        // Handle incoming messages from the webview
        webviewView.webview.onDidReceiveMessage((message) => {
            switch (message.command) {
                case constants.StopwatchState.START:
                    watchState = constants.StopwatchState.START;
                    this.stopwatchManager.start();
                    break;
                case constants.StopwatchState.STOP:
                    watchState = constants.StopwatchState.STOP;
                    this.stopwatchManager.stop();
                    break;
                case constants.StopwatchState.RESET:
                    watchState = constants.StopwatchState.RESET;
                    this.stopwatchManager.reset();
                    break;
            }
        });

        // Clean up when the webview is disposed
        webviewView.onDidDispose(() => {
            this._view = undefined;
            webviewView.webview.onDidReceiveMessage(() => {});
        });
    }

    private _updateTime() {
        if (this._view) {
            this.stopwatchManager.saveState();
            this._view.webview.postMessage({
                command: 'updateTime',
                time: this.stopwatchManager.getElapsedTime(),
                state: this.stopwatchManager.getState(),
            });
        }
    }

    public notifyUpdate() {
        this._updateTime();
    }

    // Generate HTML content for the webview
	private _getHtmlForWebview(webview: vscode.Webview) {
		const cspSource = webview.cspSource;
        
        const svgPath = vscode.Uri.joinPath(this._extensionUri, 'assets', 'ei-stopwatch.svg');
        const svgSrc = webview.asWebviewUri(svgPath);

        const configuration = vscode.workspace.getConfiguration('stopwatch');
        let font = configuration.get<string>('switchFont') || constants.DEFAULT_FONT;

        // Change it for proper application to font-family.
        if (font === '851Gkktt') {
            font = '_851Gkktt';
        }
        
        // FUTURE: Custom Font
        // let customFontPath = configuration.get<string>('customFontPath');
        // if (font === 'CustomFont' && !(customFontPath && fs.existsSync(customFontPath))) {
        //     font = constants.DEFAULT_FONT;
        //     customFontPath = "";
        // }

		return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${cspSource} 'unsafe-inline' file:; font-src ${cspSource}; img-src ${cspSource}; script-src 'unsafe-eval' 'unsafe-inline';">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Stopwatch</title>
                <style type="text/css">
                    /* Font "DSEG" by けしかん (http://www.keshikan.net/fonts.html) */
                    @font-face {
                        font-family: 'DSEG-Regular';
                        src: url('${webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", 'font', "DSEG7ClassicMini-Regular.ttf"))}') format('truetype');
                    }
                    @font-face {
                        font-family: 'DSEG-Bold';
                        src: url('${webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", 'font', "DSEG7ClassicMini-Bold.ttf"))}') format('truetype');
                    }
                    @font-face {
                        font-family: 'Orbitron';
                        src: url('${webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", 'font', "Orbitron-VariableFont_wght.ttf"))}') format('truetype');
                    }
                    @font-face {
                        font-family: 'RampartOne';
                        src: url('${webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", 'font', "RampartOne-Regular.ttf"))}') format('truetype');
                    }
                    @font-face {
                        font-family: '瀞ノグリッチ';
                        src: url('${webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", 'font', "瀞ノグリッチゴシックH1.ttf"))}') format('truetype');
                    }
                    @font-face {
                        font-family: '_851Gkktt';
                        src: url('${webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", 'font', "851Gkktt.ttf"))}') format('truetype');
                    }
                    @font-face {
                        font-family: 'rycsminStencily';
                        src: url('${webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", 'font', "rycsminStencily.ttf"))}') format('truetype');
                    }
                    @font-face {
                        font-family: 'Isego';
                        src: url('${webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", 'font', "Isego.otf"))}') format('truetype');
                    }
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-color: #f0f0f0;
                        color: #000;
                        transition: background-color 0.3s, color 0.3s;
                    }
                    .stopwatch {
                        text-align: center;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    }
                    #header {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2em;
                        font-family: serif;
                        margin-bottom: 10px;
                    }
                    #icon {
                        width: 35px;
                        height: auto;
                        margin-left: 5px;
                    }
                    #time {
                        font-size: 3em;
                        margin: 20px 0;
                        font-family: ${font};
                    }
                    .button-container {
                        display: flex;
                        justify-content: space-around;
                    }
                    button {
                        padding: 10px 20px;
                        font-size: 1em;
                        margin: 5px;
                        cursor: pointer;
                        border: none;
                        border-radius: 5px;
                        transition: background-color 0.3s, color 0.3s, transform 0.2s ease;
                    }
                    button:not(.theme-toggle):hover {
                        transform: scale(1.05);
                    }
                    button.start {
                        background-color: #4CAF50;
                        color: white;
                    }
                    button.stop {
                        background-color: #f44336;
                        color: white;
                    }
                    button.reset {
                        background-color: #2196F3;
                        color: white;
                    }
                    button:disabled {
                        background-color: #cccccc;
                        color: #666666;
                        cursor: not-allowed;
                    }
                    .theme-toggle {
                        position: fixed;
                        top: 10px;
                        right: 10px;
                        font-size: 1.2em;
                        background: none;
                        border: none;
                        cursor: pointer;
                        color: inherit;
                    }
                    .dark-mode {
                        background-color: #121212;
                        color: #fff;
                    }
                    .dark-mode .stopwatch {
                        background-color: #1e1e1e;
                        box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
                    }
                    .dark-mode button {
                        color: #fff;
                    }
                    .dark-mode #icon {
                        filter: invert(1) brightness(1.2);
                    }
                </style>
            </head>
            <body>
                <div class="stopwatch">
                    <div id="header">
                        Stop Watch
                        <img src="${svgSrc}" alt="SVG Icon" id="icon" />
                    </div>
                    <div id="time">${this.context.globalState.get<string>(constants.GlobalKeys.TIME, constants.DEFAULT_TIME)}</div>
                    <div class="button-container">
                        <button class="start" id="startButton">Start</button>
                        <button class="stop" id="stopButton" disabled>Stop</button>
                        <button class="reset" id="resetButton">Reset</button>
                    </div>
                </div>
                <button class="theme-toggle" id="themeToggle">🌙</button>
                <script type="text/javascript">
                    const vscode = acquireVsCodeApi();

                    const startButton = document.getElementById("startButton");
                    const stopButton = document.getElementById("stopButton");
                    const resetButton = document.getElementById("resetButton");
                    const timeDisplay = document.getElementById("time");

                    const THEMES = Object.freeze({
                        DARK: 'dark',
                        LIGHT: 'light'
                    });

                    const ICONS = Object.freeze({
                        SUN: '🌞',
                        MOON: '🌙'
                    });

                    // Restore the state from localStorage
                    const savedTheme = localStorage.getItem('theme') || THEMES.DARK;

                    const themeToggle = document.getElementById("themeToggle");
                    const body = document.body;

                    if (savedTheme === THEMES.DARK) {
                        body.classList.add('dark-mode');
                        themeToggle.textContent = ICONS.SUN;
                    } else {
                        themeToggle.textContent = ICONS.MOON;
                    }

                    // Toggle dark mode
                    themeToggle.addEventListener("click", () => {
                        const isDark = body.classList.toggle("dark-mode");
                        themeToggle.textContent = isDark ? ICONS.SUN : ICONS.MOON;

                        // Save the theme state to localStorage
                        localStorage.setItem('theme', isDark ? THEMES.DARK : THEMES.LIGHT);

                    });

                    // Start button click event
                    startButton.addEventListener("click", () => {
                        vscode.postMessage({ command: 'start' });
                    });

                    // Stop button click event
                    stopButton.addEventListener("click", () => {
                        vscode.postMessage({ command: 'stop' });
                    });

                    // Reset button click event
                    resetButton.addEventListener("click", () => {
                        vscode.postMessage({ command: 'reset' });
                    });

                    // Update button states based on the stopwatch state
                    function updateButtonStates(state) {
                        if (state === "start") {
                            startButton.disabled = true;
                            stopButton.disabled = false;
                        } else if (state === "stop" || state === "reset") {
                            startButton.disabled = false;
                            stopButton.disabled = true;
                        }
                    }

                    // Handling messages from VSCode
                    window.addEventListener("message", (event) => {
                        const message = event.data;
                        if (message.command === "updateTime") {
                            timeDisplay.textContent = message.time;

                            // Update buttons based on the state
                            updateButtonStates(message.state);
                        }
                    });
                </script>
            </body>
        </html>`;
	}

}