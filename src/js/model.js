import { fromPairs, range, sample } from 'lodash';
import data from '../static/data/data.json';

export class Model {
    constructor() {
    }

    getCourses() {
        return this.courses;
    }

    getMessages() {
        return fromPairs(this.messages.map(m => [m.key, m.value]));
    }

    load() {
        this.courses = data.courses;
        this.messages = data.messages;
    }
}