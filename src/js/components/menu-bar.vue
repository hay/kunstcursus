<template>
    <menu class="menu-bar">
        <div class="menu-bar__group">
            <el-button
                icon="exit"
                text="Terug naar overzicht"
                v-on:click="exit"></el-button>
        </div>

        <div class="menu-bar__group"
             v-show="!disableZoom">
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
            <div class="menu-bar__audio">
                <img src="/static/img/icon-no-audio.png"
                     alt="Geen geluid" />

                <el-toggle
                    v-bind:states="[true, false]"
                    v-model="muted"></el-toggle>

                <img src="/static/img/icon-audio.png"
                     alt="Wel geluid" />
            </div>
        </div>
    </menu>
</template>

<script>
    import ElButton from './el-button.vue';
    import ElToggle from './el-toggle.vue';

    export default {
        components : { ElButton, ElToggle },

        computed : {
            muteIcon() {
                return this.$store.state.muted ? 'audio' : 'mute';
            }
        },

        data() {
            return {
                muted : this.$store.state.muted
            }
        },

        methods : {
            exit() {
                this.$emit('exit');
            },


            zoomIn() {
                this.$emit('zoomin');
            },

            zoomOut() {
                this.$emit('zoomout');
            }
        },

        props : {
            disableZoom : {
                type : Boolean,
                default : false
            }
        },

        watch : {
            muted() {
                this.$store.commit('muted', this.muted);
            }
        }
    }
</script>