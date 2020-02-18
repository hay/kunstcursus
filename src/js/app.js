import 'regenerator-runtime/runtime';
import Vue from 'vue';
import App from './components/app.vue';
import { AUDIO_FILES } from './const.js';
import { parseHash } from './router.js';
import { SoundManager } from './sound-manager.js';
import { Store } from './store.js';

(async function() {
    const store = new Store();
    let soundManager;

    new Vue({
        el : "main",

        components : { App },

        computed : {
            soundPlaying() {
                return this.$store.state.soundPlaying;
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
                let soundFiles = {};

                AUDIO_FILES.forEach((id) => {
                    soundFiles[id] = `audio/${id}.mp3`;
                });

                soundManager = new SoundManager({
                    loop : false,
                    muted : this.$store.state.muted,
                    players : soundFiles,
                    playFromStart : true,
                    single : true
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
            soundPlaying(newSound) {
                console.log("SOUND", newSound);

                if (newSound === null) {
                    soundManager.pause();
                } else {
                    if (soundManager.hasPlayer(newSound)) {
                        soundManager.play(newSound);
                    } else {
                        console.log('Sound does not exist', newSound);
                    }
                }
            }
        }
    });
})();