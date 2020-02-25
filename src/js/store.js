import { map, max } from 'lodash';
import Vue from 'vue'
import Vuex from 'vuex'
import { Model } from './model.js';

Vue.use(Vuex);

export class Store {
    constructor() {
        const model = new Model();

        function getInitialState() {
            return {
                courseIndex: null,
                courses : model.getCourses(),
                lastCourse : 0,
                messages : model.getMessages(),
                muted : false,
                screen : null,
                skipIntro : false,
                stepIndex : null,
                userName : null
            };
        }

        this.store = new Vuex.Store({
            state : getInitialState(),

            getters : {
                allDone(state) {
                    return state.lastCourse >= state.courses.length;
                },

                artwork(state, getters) {
                    if (getters.step && getters.step.action === 'judge') {
                        return getters.step.meta;
                    } else {
                        return getters.course.artwork;
                    }
                },

                course(state) {
                    return state.courses[state.courseIndex];
                },

                courseData(state, getters) {
                    return getters.course.data;
                },

                courseDone(state, getters) {
                    return state.stepIndex === (getters.courseData.length);
                },

                maxStep(state, getters) {
                    return max(getters.courseData.map(d => parseInt(d.step)));
                },

                message(state, getters) {
                    return function(id, data) {
                        return state.messages[id];
                    }
                },

                step(state, getters) {
                    const step = getters.courseData[state.stepIndex];
                    return step === undefined ? 0 : step;
                }
            },

            mutations : {
                courseDone(state) {
                    state.lastCourse = state.lastCourse + 1;
                },

                courseIndex(state, courseIndex) {
                    state.stepIndex = 0;
                    state.courseIndex = courseIndex;
                },

                // Another debug thing
                lastCourse(state, course) {
                    state.lastCourse = course;
                },

                muted(state) {
                    state.muted = true;
                },

                screen(state, id) {
                    state.screen = id;
                },

                skipIntro(state) {
                    state.skipIntro = true;
                },

                stepIndex(state, index) {
                    state.stepIndex = parseInt(index);
                },

                toggleMute(state) {
                    state.muted = !state.muted;
                },

                userName(state, name) {
                    state.userName = name;
                }
            },

            actions : {
                nextStep({ state, getters, commit }) {
                    if (!getters.courseDone) {
                        commit('stepIndex', state.stepIndex + 1);
                    }
                },

                previousStep({ state }) {
                    if (state.stepIndex > 0) {
                        commit('stepIndex', state.stepIndex - 1);
                    }
                }
            }
        });
    }

    getStore() {
        return this.store;
    }
}