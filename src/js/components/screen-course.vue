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
    import ElHint from './el-hint.vue';
    import ImageViewer from './image-viewer.vue';
    import MenuBar from './menu-bar.vue';
    import ModalDialog from './modal-dialog.vue';
    import Timer from '../timer.js';

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
                viewerShown : false
            }
        },

        methods : {
            showViewer() {
                this.viewerShown = true;
                this.$refs.viewer.show();
                this.startTimer();
            },

            startTimer() {
                let timer = new Timer();

                timer.onUpdate(t => this.time = t);

                timer.start();
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
        }
    }
</script>