<template>
    <div class="screen screen--course">
        <div class="screen__flex">
            <image-viewer
                ref="viewer"
                v-on:ready="viewerReady"
                ></image-viewer>

            <div class="screen__hint screen__hint--left hint"
                 v-bind:is-visible="viewerShown">
                <p class="hint__text">
                    <strong>1/4</strong>
                    Bekijk het schilderij
                </p>
            </div>

            <div class="screen__hint screen__hint--right hint"
                 v-bind:is-visible="viewerShown">
                <p class="hint__text">
                    <strong>{{time}}</strong>
                </p>
            </div>

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
    import ImageViewer from './image-viewer.vue';
    import MenuBar from './menu-bar.vue';
    import ModalDialog from './modal-dialog.vue';

    export default {
        components : {
            ImageViewer,
            MenuBar,
            ModalDialog
        },

        data() {
            return {
                isViewerReady : false,
                startTime : null,
                time : 0,
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
                this.startTime = Date.now();
                this.updateTime();
            },

            updateTime() {
                const diff = Date.now() - this.startTime;
                const seconds = Math.round(diff / 1000);
                let date = new Date(null);
                date.setSeconds(seconds);
                this.time = date.toISOString().substr(14, 5);
                window.setTimeout(this.updateTime.bind(this), 300);
            },

            viewerReady() {
                this.isViewerReady = true;
            },

            zoomIn() {
                console.log('zoomIn');
                this.$refs.viewer.zoomIn();
            },

            zoomOut() {
                this.$refs.viewer.zoomOut();
            }
        },

        mounted() {
            this.showViewer();
        }
    }
</script>