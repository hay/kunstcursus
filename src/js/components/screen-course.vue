<template>
    <div class="screen screen--course">
        <div class="screen__flex">
            <image-viewer></image-viewer>
        </div>

        <div class="screen__fixed">
            <menu-bar></menu-bar>
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
        }
    }
</script>