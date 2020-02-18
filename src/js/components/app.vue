<template>
    <main>
        <course-questions v-if="courseId === 'questions'"></course-questions>
        <screen-overview v-if="screen === 'overview'"></screen-overview>
        <screen-splash v-if="screen === 'splash'"></screen-splash>
        <screen-slideshow v-if="screen === 'slideshow'"></screen-slideshow>
    </main>
</template>

<script>
    import CourseQuestions from './course-questions.vue';
    import ScreenOverview from './screen-overview.vue';
    import ScreenSplash from './screen-splash.vue';
    import ScreenSlideshow from './screen-slideshow.vue';

    export default {
        components : {
            CourseQuestions,
            ScreenOverview,
            ScreenSplash,
            ScreenSlideshow
        },

        computed : {
            courseId() {
                if (this.$store.state.courseIndex !== null &&
                    this.screen === 'course') {
                    return this.$store.getters.course.course;
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