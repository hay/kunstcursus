<template>
    <div class="screen screen--course">
        <div class="screen__flex">
            <image-viewer
                ref="viewer"
                ></image-viewer>
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

    export default {
        components : {
            ImageViewer,
            MenuBar
        },

        methods : {
            zoomIn() {
                this.$refs.viewer.zoomIn();
            },

            zoomOut() {
                this.$refs.viewer.zoomOut();
            }
        }
    }
</script>