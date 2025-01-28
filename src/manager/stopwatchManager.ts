import * as vscode from 'vscode';
import * as constants from '../utils/constants';
import { StopwatchViewProvider } from '../provider/stopwatchViewProvider';

export class StopwatchManager {
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
