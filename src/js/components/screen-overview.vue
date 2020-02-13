<template>
    <div class="temp-screen">
        <h1>
            De lessen voor {{name}}
        </h1>

        <p>{{$msg('course_overview')}}</p>

        <ul class="overview">
            <li v-for="(course, index) in courses"
                v-on:click="setCourse(index)">
                <img v-bind:src="'assets/' + (index + 1) + '-sq.jpg'" alt="" />
                <h2>{{course.title}}</h2>
                <p>{{course.description}}</p>
            </li>
        </ul>

        <button v-on:click="back">
            {{$msg('btn_back')}}
        </button>
    </div>
</template>

<script>
    export default {
        computed : {
            courses() {
                return this.$store.state.courses;
            },

            name() {
                return this.$store.state.userName;
            }
        },

        methods : {
            back() {
                this.$store.commit('screen', 'splash');
            },

            setCourse(index) {
                this.$store.commit('courseIndex', index);
                this.$store.commit('screen', 'course');
            }
        }
    }
</script>