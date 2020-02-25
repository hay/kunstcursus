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
                messages : model.getMessages(),
                muted : false,
                screen : null,
                skipIntro : false,
                soundPlaying : null,
                stepIndex : null,
                userName : null
            };
        }

        this.store = new Vuex.Store({
            state : getInitialState(),

            getters : {
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
                courseIndex(state, courseIndex) {
                    state.stepIndex = 0;
                    state.courseIndex = courseIndex;
                },

                muted(state) {
                    state.muted = true;
                },

                playSound(state, sound) {
                    state.soundPlaying = sound;
                },

                screen(state, id) {
                    state.soundPlaying = null;
                    state.screen = id;
                },

                skipIntro(state) {
                    state.skipIntro = true;
                },

                // Purely a debug thing
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
                nextStep({ state, getters }) {
                    if (!getters.courseDone) {
                        state.stepIndex = state.stepIndex + 1;
                    }
                },

                previousStep({ state }) {
                    if (state.stepIndex > 0) {
                        state.stepIndex = state.stepIndex - 1;
                    }
                }
            }
        });
    }

    getStore() {
        return this.store;
    }
}