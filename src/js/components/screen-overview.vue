<template>
    <div class="screen screen-overview screen--text">
        <div class="screen-overview__content">
            <el-button
                align="right"
                flair="noborder"
                icon="info"
                msg="about_prototype"
                v-on:click="about"></el-button>

            <el-logo></el-logo>

            <p v-if="!allDone"
               class="screen-overview__description"
                v-html="$msg('course_overview', { name : name})"></p>

            <p v-if="allDone"
               class="screen-overview__description"
               v-html="$msg('wow_text', { name : name})"></p>

            <el-button
                flair="course"
                v-bind:text="$msg('enter_course', { course : nextCourseLabel })"
                v-on:click="nextCourse"></el-button>

            <ul class="course-list">
                <li v-for="(course, index) in courses"
                    v-bind:disabled="index >= lastCourse"
                    class="course-list__item">
                    <header class="course-list__itemheader">
                        <h2 class="course-list__title">
                            {{course.title}}
                        </h2>
                    </header>

                    <article
                        v-show="index < lastCourse"
                        class="course-list__info">

                        <p>{{course.description}}</p>

                        <ul class="course-list__meta">
                            <li v-if="course.artlabel && course.artlink">
                                <span>{{$msg('label_artwork')}}:</span>

                                <a v-bind:href="course.artlink"
                                   target="_blank">
                                   {{course.artlabel}}
                                </a>
                            </li>
                        </ul>

                        <el-button
                            align="right"
                            v-if="index <= lastCourse"
                            msg="enter_course_again"
                            v-on:click="setCourse(index)"></el-button>
                    </article>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ElLogo from './el-logo.vue';

    export default {
        components : { ElLogo },

        computed : {
            allDone() {
                return this.$store.getters.allDone;
            },

            courses() {
                return this.$store.state.courses;
            },

            lastCourse() {
                return this.$store.state.lastCourse;
            },

            name() {
                return this.$store.state.userName;
            },

            nextCourseLabel() {
                return this.$store.getters.nextCourseLabel;
            }
        },

        methods : {
            about() {
                this.$store.commit('screen', 'about');
            },

            nextCourse() {
                this.setCourse(this.lastCourse);
            },

            setCourse(index) {
                this.$store.commit('courseIndex', index);
                this.$store.commit('screen', 'course');
            }
        },

        mounted() {
            if (!this.$store.state.seenOverview) {
                this.$sounds.play('overview_01');
                this.$store.commit('seenOverview');
            }

            if (this.allDone) {
                this.$sounds.play('outro_01');
            }
        }
    }
</script>