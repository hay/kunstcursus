<template>
    <main>
        <course-bridge v-if="courseId === '321-bridge'"></course-bridge>
        <screen-overview v-if="screen === 'overview'"></screen-overview>
        <screen-splash v-if="screen === 'splash'"></screen-splash>
    </main>
</template>

<script>
    import CourseBridge from './course-bridge.vue';
    import ScreenOverview from './screen-overview.vue';
    import ScreenSplash from './screen-splash.vue';

    export default {
        components : {
            CourseBridge,
            ScreenOverview,
            ScreenSplash
        },

        computed : {
            courseId() {
                if (this.$store.state.courseIndex !== null &&
                    this.screen === 'course') {
                    return this.$store.getters.course.id;
                } else {
                    return false;
                }
            },

            screen() {
                return this.$store.state.screen;
            }
        }
    }
</script>