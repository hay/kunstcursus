<template>
    <div class="screen screen--course">
        <div class="screen__flex">
            <image-viewer
                ref="viewer"
                v-on:ready="viewerReady"
                ></image-viewer>

            <el-hint
                v-bind:visible="viewerShown"
                align="left"
                prefix="1/4"
                text="Bekijk het schilderij"></el-hint>

            <el-hint
                v-bind:visible="viewerShown"
                align="right"
                v-on:click="skipTime"
                v-bind:text="time"></el-hint>

            <modal-dialog
                v-show="!viewerShown"
                class="screen__modal"
                text="Welkom bij de eerste les, klik op OK om te beginnen."
                v-bind:disabled="!isViewerReady"
                v-on:ok="showViewer"></modal-dialog>
        </div>

        <div class="screen__fixed">
            <menu-bar
                v-on:zoomin="zoomIn"
                v-on:zoomout="zoomOut"
                ></menu-bar>
        </div>
    </div>
</template>

<script>
    import Timer from 'easytimer.js';
    import ElHint from './el-hint.vue';
    import ImageViewer from './image-viewer.vue';
    import MenuBar from './menu-bar.vue';
    import ModalDialog from './modal-dialog.vue';
    import { formatMs } from '../util.js';

    export default {
        components : {
            ElHint,
            ImageViewer,
            MenuBar,
            ModalDialog
        },

        data() {
            return {
                isViewerReady : false,
                startTime : null,
                time : '0',
                timer : null,
                viewerShown : false
            }
        },

        methods : {
            showViewer() {
                this.viewerShown = true;
                this.$refs.viewer.show();
                this.startTimer();
            },

            skipTime() {
                this.timer.updateSeconds(60);
            },

            startTimer() {
                this.timer = new Timer();

                this.timer.addEventListener('secondsUpdated', () => {
                    let t = this.timer.getTotalTimeValues();
                    this.time = formatMs(t.seconds);
                });

                this.timer.start();
            },

            viewerReady() {
                this.isViewerReady = true;
            },

            zoomIn() {
                this.$refs.viewer.zoomIn();
            },

            zoomOut() {
                this.$refs.viewer.zoomOut();
            }
        },

        mounted() {
            if (this.$store.state.skipIntro) {
                this.showViewer();
            }
        }
    }
</script>