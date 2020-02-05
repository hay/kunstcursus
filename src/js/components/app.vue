<template>
    <main>
        <screen-course v-if="screen === 'course'"></screen-course>
        <screen-overview v-if="screen === 'overview'"></screen-overview>
        <screen-splash v-if="screen === 'splash'"></screen-splash>
    </main>
</template>

<script>
    import ScreenCourse from './screen-course.vue';
    import ScreenOverview from './screen-overview.vue';
    import ScreenSplash from './screen-splash.vue';

    export default {
        components : {
            ScreenCourse,
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