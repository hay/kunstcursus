<template>
    <div class="screen screen--text">
        <div class="screen__content">
            <el-button
                align="right"
                flair="link"
                v-on:click="back"
                msg="btn_back"></el-button>

            <el-logo></el-logo>

            <h2 class="screen__subtitle">
                {{$msg('about_prototype')}}
            </h2>

            <article class="screen__text"
                     v-html="$msg('credits')"></article>

            <a v-bind:href="$msg('feedback_url')"
               target="_blank"
               class="el-button el-button--text el-button--center">
                <span>
                    {{$msg('give_feedback')}}
                </span>
            </a>
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