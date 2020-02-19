<template>
    <div class="screen screen-overview">
        <div class="screen-overview__content">
            <h1 class="screen-overview__title"
                v-html="$msg('title')"></h1>

            <p class="screen-overview__description">
                Hee <strong>{{name}}</strong>! {{$msg('course_overview')}}
            </p>

            <ul class="course-list">
                <li v-for="(course, index) in courses"
                    class="course-list__item">
                    <header class="course-list__itemheader">
                        <h2 class="course-list__title">
                            <strong>Opdracht {{index + 1}}</strong>
                            <span>{{course.title}}</span>
                        </h2>

                        <menu class="course-list__status">
                            <button v-on:click="toggle(index)">
                                <span v-if="course.collapsed">open</span>
                                <span v-if="!course.collapsed">sluit</span>
                            </button>
                        </menu>
                    </header>

                    <article
                        v-show="index === courseOpen"
                        class="course-list__info">
                        <p>{{course.description}}</p>

                        <button v-on:click="setCourse(index)">
                            Doe deze les
                        </button>
                    </article>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        computed : {
            courses() {
                return this.$store.state.courses.map((course) => {
                    course.collapsed = true;
                    return course;
                });
            },

            name() {
                return this.$store.state.userName;
            }
        },

        data() {
            return {
                courseOpen : -1
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
                this.courseOpen = index;
            }
        }
    }
</script>