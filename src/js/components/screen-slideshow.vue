<template>
    <div class="screen screen--course screen-slideshow">
        <button
            v-on:click="skip"
            class="screen-slideshow__link">
            <span>Sla uitleg over</span>
        </button>

        <img class="screen-slideshow__image"
             v-bind:state="asset % 2 === 0 ? 'in' : 'out'"
             v-bind:src="src" />
    </div>
</template>

<script>
    import { timeout } from '../util.js';

    export default {
        computed : {
            src() {
                return `assets/${this.asset + 1}-nq.jpg`;
            }
        },

        data() {
            return {
                asset : 0
            };
        },

        methods : {
            async nextAsset() {
                await timeout(10000);
                this.asset = (this.asset + 1) % 5;
                this.nextAsset();
            },

            skip() {
                this.$store.commit('screen', 'overview');
            }
        },

        mounted() {
            const sound = this.$sounds.play('intro_01');

            sound.player.addEventListener('ended', () => {
                this.skip();
            });

            this.nextAsset();
        }
    }
</script>