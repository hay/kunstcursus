<template>
    <div class="screen screen-splash screen--text">
        <div class="screen__content">
            <h1 class="screen-splash__title">
                <img class="screen-splash__title-image"
                     src="/static/img/logo-splash.png"
                     alt="De 'B' van Boijmans" />

                <div class="screen-splash__title-text"
                     v-html="$msg('title')"></div>
            </h1>

            <article class="screen-splash__text"
                     v-html="$msg('intro')"></article>

            <div class="screen-splash__notice">
                <p>{{$msg('enable_audio')}}</p>
            </div>

            <form class="screen-splash__form">
                <input class="screen-splash__name"
                       type="text"
                       v-model="name"
                       v-bind:placeholder="$msg('form_name')" />

                <button
                    class="screen-splash__start"
                    v-bind:disabled="!isValidName"
                    v-on:click="start">
                    {{$msg('btn_start')}}
                </button>
            </form>

            <div class="screen-splash__small">
                <small>{{$msg('disclaimer')}}</small>
            </div>

            <el-button
                v-on:click="about"
                v-bind:text="$msg('about_header')"
                align="center"></el-button>
        </div>
    </div>
</template>

<script>
    import ElButton from './el-button.vue';

    export default {
        components : {
            ElButton
        },

        computed : {
            isValidName() {
                return !!this.name && this.name.length >= 3 && this.name.length <= 20;
            }
        },

        data() {
            return {
                name : null
            }
        },

        methods : {
            about() {
                this.$store.commit('screen', 'about');
            },

            start() {
                this.$store.commit('userName', this.name);
                this.$store.commit('screen', 'slideshow');
            }
        }
    }
</script>