import 'regenerator-runtime/runtime';
import Vue from 'vue';

import App from './components/app.vue';
import ElButton from './components/el-button.vue';
import Sounds from './sounds.js';
import { parseHash } from './router.js';
import { Store } from './store.js';
import { Tracker } from './tracker.js';

Vue.prototype.$tracker = new Tracker({
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
            }
        },

        mounted() {
            window.addEventListener('hashchance', this.parseHash.bind(this));
            this.parseHash();
            this.setupSound();
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