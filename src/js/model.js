import { filter, fromPairs, range, sample } from 'lodash';
import data from '../static/data/data.json';

export class Model {
    getCourses() {
        return data.courses.map((course) => {
            const id = course.datasheet;

            if (id in data) {
                course.data = data[id];
            }

            course.comments = filter(data.comments, ['course', id]);

            return course;
        });
    }

    getMessages() {
        return fromPairs(data.messages.map(m => [m.key, m.value]));
    }
}