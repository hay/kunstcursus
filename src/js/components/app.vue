<template>
    <main>
        <screen-course v-if="screen === 'course'"></screen-course>
        <screen-overview v-if="screen === 'overview'"></screen-overview>
        <screen-splash v-if="screen === 'splash'"></screen-splash>
        <screen-slideshow v-if="screen === 'slideshow'"></screen-slideshow>
    </main>
</template>

<script>
    import ScreenCourse from './screen-course.vue';
    import ScreenOverview from './screen-overview.vue';
    import ScreenSplash from './screen-splash.vue';
    import ScreenSlideshow from './screen-slideshow.vue';

    export default {
        components : {
            ScreenCourse,
            ScreenOverview,
            ScreenSplash,
            ScreenSlideshow
        },

        computed : {
            screen() {
                return this.$store.state.screen;
            }
        },

        watch : {
            screen() {
                // Pause audio when changing screens
                this.$sounds.pause();
            }
        }
    }
</script>