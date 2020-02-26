import { LOG_API } from './const.js';

export class Logger {
    constructor() {

    }

    async log(msg) {
        const url = `${LOG_API}?msg=${window.encodeURIComponent(msg)}`;
        window.fetch(url);
    }
}