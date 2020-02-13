import Timer from 'easytimer.js';
import { formatMs } from './util.js';

export default class ClockTimer {
    constructor(callback) {
        this.callback = callback;
        this._createTimer();
    }

    _createTimer(seconds = 0) {
        this.timer = new Timer({
            startValues : {
                seconds : seconds
            }
        });

        this.timer.addEventListener('secondsUpdated', () => {
            let t = this.timer.getTotalTimeValues();
            let time = formatMs(t.seconds);
            this.callback(time);
        });
    }

    start() {
        this.timer.start();
    }

    updateSeconds(seconds) {
        // We actually make a completely new timer here, because
        // easyTimer doesn't allow for changing values
        this._createTimer(seconds);
        this.start();
    }
};