import Vue from 'vue'
import Vuex from 'vuex'
import { Model } from './model.js';

Vue.use(Vuex);

export class Store {
    constructor() {
        const model = new Model();
        model.load();

        function getInitialState() {
            return {
                courses : model.getCourses(),
                messages : model.getMessages(),
                screen : null,
                userName : null
            };
        }

        this.store = new Vuex.Store({
            state : getInitialState(),

            getters : {
                message(state, getters) {
                    return function(id, data) {
                        return state.messages[id];
                    }
                }
            },

            mutations : {
                screen(state, id) {
                    state.screen = id;
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