export default class Timer {
    constructor() {
        this.startTime = 0;
        this.callback = function() {};
    }

    _update() {
        const diff = Date.now() - this.startTime;
        const seconds = Math.round(diff / 1000);
        let date = new Date(null);
        date.setSeconds(seconds);
        let time = date.toISOString().substr(14, 5);
        this.callback(time);
        window.setTimeout(this._update.bind(this), 300);
    }

    onUpdate(cb) {
        this.callback = cb;
    }

    start() {
        this.startTime = Date.now();
        this._update();
    }
};