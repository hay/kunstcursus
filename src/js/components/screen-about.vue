<template>
    <div class="screen screen--text">
        <div class="screen__content">
            <el-button
                v-on:click="back"
                v-bind:text="$msg('btn_back')"
                align="center"></el-button>

            <h1 class="screen__title">
                {{$msg('about_header')}}
            </h1>

            <article class="screen__text"
                     v-html="$msg('credits')"></article>
        </div>
    </div>
</template>

<script>
    import ElButton from './el-button.vue';

    export default {
        components : {
            ElButton
        },

        methods : {
            back() {
                this.$store.commit('screen', 'splash');
            }
        }
    }
</script>