export default class Timer {
    constructor(callback) {
        this.running = false;
        this.seconds = 0;
        this.startTime = 0;
        this.time = {};
        this.timer = null;
        this.callback = callback;
    }

    get time() {
        let date = new Date(null);
        date.setSeconds(this.seconds);
        let time = date.toISOString().substr(14, 5);

        return {
            formatted : time,
            seconds : this.seconds
        }
    }

    set time(seconds) {
        console.log(seconds);
        this.seconds = seconds;
    }

    _update() {
        const diff = Date.now() - this.startTime;
        const seconds = Math.round(diff / 1000);
        this.time = seconds;
        this.callback(this.time);

        if (this.running) {
            this.timer = window.setTimeout(this._update.bind(this), 300);
        }
    }

    pause() {
        window.clearTimeout(this.timer);
        this.running = false;
    }

    play() {
        this.running = true;
        this._update();
    }

    reset() {
        this.startTime = Date.now();
        this.play();
        this._update();
    }

    updateSeconds(seconds) {
        this.pause();
        this.time = seconds;
        this.play();
    }
};