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
                userName : null
            };
        }

        this.store = new Vuex.Store({
            state : getInitialState(),

            getters : {
                course(state) {
                    return state.courses[state.courseIndex];
                },

                message(state, getters) {
                    return function(id, data) {
                        return state.messages[id];
                    }
                }
            },

            mutations : {
                courseIndex(state, courseIndex) {
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

                userName(state, name) {
                    state.userName = name;
                }
            }
        });
    }

    getStore() {
        return this.store;
    }
}