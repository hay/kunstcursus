import 'regenerator-runtime/runtime';
import Vue from 'vue';
import App from './components/app.vue';
import { parseHash } from './router.js';
import { Store } from './store.js';

(async function() {
    const store = new Store();

    new Vue({
        el : "main",

        components : { App },

        created() {
            Vue.prototype.$msg = function(id, data = {}) {
                return this.$store.getters.message(id, data);
            };
        },

        methods : {
            parseHash : parseHash
        },

        mounted() {
            window.addEventListener('hashchance', this.parseHash.bind(this));
            this.parseHash();
        },

        render: h => h( App ),

        store : store.getStore()
    });
})();