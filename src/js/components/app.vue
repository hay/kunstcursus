<template>
    <main>
        <screen-about v-if="screen === 'about'"></screen-about>
        <screen-course v-if="screen === 'course'"></screen-course>
        <screen-intro v-if="screen === 'intro'"></screen-intro>
        <screen-overview v-if="screen === 'overview'"></screen-overview>
        <screen-profile v-if="screen === 'profile'"></screen-profile>
        <screen-splash v-if="screen === 'splash'"></screen-splash>
        <screen-slideshow v-if="screen === 'slideshow'"></screen-slideshow>
    </main>
</template>

<script>
    import ScreenAbout from './screen-about.vue';
    import ScreenCourse from './screen-course.vue';
    import ScreenIntro from './screen-intro.vue';
    import ScreenOverview from './screen-overview.vue';
    import ScreenProfile from './screen-profile.vue';
    import ScreenSplash from './screen-splash.vue';
    import ScreenSlideshow from './screen-slideshow.vue';

    export default {
        components : {
            ScreenAbout,
            ScreenCourse,
            ScreenIntro,
            ScreenOverview,
            ScreenProfile,
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