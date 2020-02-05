<template>
    <div class="screen">
        <button v-on:click="back">
            {{$msg('btn_back')}}
        </button>

        <h1>{{course.title}}</h1>
        <p>{{course.text}}</p>

        <image-viewer></image-viewer>
    </div>
</template>

<script>
    import ImageViewer from './image-viewer.vue';

    export default {
        components : {
            ImageViewer
        },

        computed : {
            course() {
                return this.$store.getters.course;
            }
        },

        methods : {
            back() {
                this.$store.commit('screen', 'overview');
            }
        }
    }
</script>