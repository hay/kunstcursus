<template>
    <div class="screen screen-overview">
        <div class="screen-overview__content">
            <h1 class="screen-overview__title"
                v-html="$msg('title')"></h1>

            <p v-if="!allDone"
               class="screen-overview__description">
                Hee <strong>{{name}}</strong>! {{$msg('course_overview')}}.
            </p>

            <p v-if="allDone"
               class="screen-overview__description">
               Wauw <strong>{{name}}</strong>! Je hebt alle opdrachten gedaan!
               Gefeliciteerd!
            </p>

            <ul class="course-list">
                <li v-for="(course, index) in courses"
                    v-bind:disabled="index > lastCourse"
                    class="course-list__item">
                    <header class="course-list__itemheader"
                            v-on:click="toggle(index)">
                        <h2 class="course-list__title">
                            <strong>Opdracht {{index + 1}}</strong>
                            <span>{{course.title}}</span>
                        </h2>

                        <menu class="course-list__status">
                            <button>
                                <span v-if="index !== courseOpen">open</span>
                                <span v-if="index === courseOpen">sluit</span>
                            </button>
                        </menu>
                    </header>

                    <article
                        v-show="index === courseOpen"
                        class="course-list__info">
                        <p>{{course.description}}</p>

                        <el-button
                            v-if="index > lastCourse"
                            v-bind:disabled="true"
                            v-bind:text="'Je moet eerst opdracht ' + (lastCourse + 1) + ' doen'"></el-button>

                        <el-button
                            v-if="index <= lastCourse"
                            v-bind:text="'Doe opdracht ' + (index + 1)"
                            v-on:click="setCourse(index)"></el-button>
                    </article>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ElButton from './el-button.vue';

    export default {
        components : { ElButton },

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
            }
        },

        data() {
            return {
                courseOpen : this.$store.state.lastCourse
            };
        },

        methods : {
            back() {
                this.$store.commit('screen', 'splash');
            },

            setCourse(index) {
                this.$store.commit('courseIndex', index);
                this.$store.commit('screen', 'course');
            },

            toggle(index) {
                if (this.courseOpen === index) {
                    this.courseOpen = -1;
                } else {
                    this.courseOpen = index;
                }
            }
        }
    }
</script>