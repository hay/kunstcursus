<template>
    <div class="screen screen--text">
        <div class="screen__content">
            <el-button
                align="center"
                flair="link"
                v-on:click="back"
                v-bind:text="$msg('btn_back')"></el-button>

            <el-logo></el-logo>

            <h1 class="screen__title">
                {{$msg('about_header')}}
            </h1>

            <article class="screen__text"
                     v-html="$msg('credits')"></article>

            <el-button
                v-on:click="back"
                v-bind:text="$msg('btn_back')"
                align="center"></el-button>
        </div>
    </div>
</template>

<script>
    import ElLogo from './el-logo.vue';

    export default {
        components : { ElLogo },

        methods : {
            back() {
                this.$store.commit('screen', 'splash');
            }
        }
    }
</script>