import 'regenerator-runtime/runtime';
import Vue from 'vue';

import { TRACK_TIME_INTERVAL } from './const.js';
import App from './components/app.vue';
import ElButton from './components/el-button.vue';
import Sounds from './sounds.js';
import { parseHash } from './router.js';
import { Store } from './store.js';
import { Tracker } from './tracker.js';

Vue.prototype.$track = new Tracker({
    log : window.location.href.includes('debug')
});

Vue.component('el-button', ElButton);

(async function() {
    const store = new Store();
    let soundManager;

    new Vue({
        el : "main",

        components : { App },

        computed : {
            muted() {
                return this.$store.state.muted;
            }
        },

        created() {
            Vue.prototype.$msg = function(id, data = {}) {
                return this.$store.getters.message(id, data);
            };
        },

        methods : {
            parseHash : parseHash,

            setupSound() {
                Vue.prototype.$sounds = new Sounds({
                    muted : this.$store.state.muted
                });
            },

            trackTime() {
                let start = Date.now();
                this.$track.track('heartbeat', 0);

                setInterval(() => {
                    let delta = Date.now() - start;
                    delta = Math.round(delta / 1000);
                    this.$track.track('heartbeat', delta);
                }, TRACK_TIME_INTERVAL);
            }
        },

        mounted() {
            window.addEventListener('hashchance', this.parseHash.bind(this));
            this.parseHash();
            this.setupSound();
            this.trackTime();
        },

        render: h => h( App ),

        store : store.getStore(),

        watch : {
            muted() {
                this.$sounds.setMuted(this.$store.state.muted);
            }
        }
    });
})();