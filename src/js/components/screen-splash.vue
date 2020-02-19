<template>
    <div class="screen screen-splash">
        <div class="screen-splash__content">
            <h1 class="screen-splash__title"
                v-html="$msg('title')"></h1>

            <article class="screen-splash__text"
                     v-html="$msg('intro')"></article>

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
        </div>
    </div>
</template>

<script>
    export default {
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
            start() {
                this.$store.commit('userName', this.name);
                this.$store.commit('screen', 'slideshow');
                this.$store.commit('playSound', 'intro_01');
            }
        }
    }
</script>