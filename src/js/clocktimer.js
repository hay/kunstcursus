import Timer from 'easytimer.js';
import { formatMs } from './util.js';

export default class ClockTimer {
    constructor(opts) {
        this.callback = opts.callback;

        // We transform targets into a map so we can do one-time events
        // when targets are reached
        this.targets = new Map();

        opts.targets.forEach((seconds) => {
            this.targets.set(seconds, false);
        });

        this.timer = null;
        this._createTimer();
    }

    _callback(type, data) {
        this.callback({ type, data });
    }

    _createTimer(seconds = 0) {
        this.timer = new Timer({
            startValues : {
                seconds : seconds
            }
        });

        this.timer.on('secondsUpdated', () => {
            let t = this.timer.getTotalTimeValues();
            let time = formatMs(t.seconds);
            this._callback('update', time);

            // If seconds is in targets, also fire event
            if (this.targets.has(t.seconds) && this.targets.get(t.seconds) === false) {
                this._callback('target', t.seconds);
                this.targets.set(t.seconds, true);
            }
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