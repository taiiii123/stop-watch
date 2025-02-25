// Description: Constants used in the application.

/** Defines the priority for displaying elements in the status bar (higher value means higher priority). */
export const STATUS_BAR_PRIORITY = 80;

/** Default time format used in the stopwatch display. */
export const DEFAULT_TIME = '00:00:00';

/** Default font used for the stopwatch display and other textual elements in the application. */
export const DEFAULT_FONT = 'Arial, sans-serif';

/** Enum representing the possible states of the stopwatch. */
export enum StopwatchState {
    START = 'start',
    STOP = 'stop',
    RESET = 'reset',
}

/** Enum representing global keys used for application-wide settings or state management. */
export enum GlobalKeys {
    ELAPSED_TIME = 'stopwatch.elapsedTime',
    STATE = 'stopwatch.state',
    TIME = 'stopwatch.time',
}

/** Enum for specifying the position of the status bar display. */
export enum StatusBarDisplayPosition  {
    LEFT = 'Left',
    RIGHT = 'Right'
}
