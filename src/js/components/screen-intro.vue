<template>
    <div class="screen intro">
        <div
            ref="canvas"
            class="intro__canvas"></div>
    </div>
</template>

<script>
    import lottie from 'lottie-web';

    export default {
        mounted() {
            lottie.loadAnimation({
                container : this.$refs.canvas,
                path : 'intro/data.json',
                autoplay : true
            });
        }
    }
</script>