<template>
    <div class="temp-screen">
        <img src="/static/img/logo-wordmark.svg" alt="" />
        <h1>{{$msg('title')}}</h1>

        <p>{{$msg('intro')}}</p>

        <form>
            <input type="text"
                   v-model="name"
                   v-bind:placeholder="$msg('form_name')" />
        </form>

        <button
            v-bind:disabled="!isValidName"
            v-on:click="start">
            {{$msg('btn_start')}}
        </button>
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