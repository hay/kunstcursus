<template>
    <menu class="menu-bar">
        <div class="menu-bar__group">
            <el-button
                icon="exit"
                text="Terug naar overzicht"
                v-on:click="back"></el-button>
        </div>

        <div class="menu-bar__group">
            <el-button
                icon="plus"
                text="Zoom in"
                v-on:click="zoomIn"></el-button>

            <el-button
                icon="minus"
                text="Zoom uit"
                v-on:click="zoomOut"></el-button>
        </div>

        <div class="menu-bar__group">
            <el-button
                icon="again"
                text="Nogmaals"
                v-on:click="again"></el-button>

            <el-button
                v-bind:icon="muteIcon"
                text="Geluid uit / aan"
                v-on:click="mute"></el-button>
        </div>
    </menu>
</template>

<script>
    import ElButton from './el-button.vue';

    export default {
        components : { ElButton },

        computed : {
            muteIcon() {
                return this.$store.state.muted ? 'audio' : 'mute';
            }
        },

        methods : {
            again() {
                this.$store.dispatch('previousStep');
            },

            back() {
                this.$store.commit('screen', 'overview');
            },

            mute() {
                this.$store.commit('toggleMute');
            },

            zoomIn() {
                this.$emit('zoomin');
            },

            zoomOut() {
                this.$emit('zoomout');
            }
        }
    }
</script>