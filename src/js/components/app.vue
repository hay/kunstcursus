<template>
    <main>
        <screen-overview v-if="screen === 'overview'"></screen-overview>
        <screen-splash v-if="screen === 'splash'"></screen-splash>
    </main>
</template>

<script>
    import ScreenOverview from './screen-overview.vue';
    import ScreenSplash from './screen-splash.vue';

    export default {
        components : {
            ScreenOverview,
            ScreenSplash
        },

        computed : {
            screen() {
                return this.$store.state.screen;
            }
        }
    }
</script>