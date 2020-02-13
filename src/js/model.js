import { fromPairs, range, sample } from 'lodash';
import data from '../static/data/data.json';

export class Model {
    getCourses() {
        return data.courses.map((course) => {
            if (course.id in data) {
                course.data = data[course.id];
            }

            return course;
        });
    }

    getMessages() {
        return fromPairs(data.messages.map(m => [m.key, m.value]));
    }
}