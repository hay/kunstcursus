<template>
    <menu class="menu-bar">
        <button class="menu-bar__button"
                v-on:click="back">
            <img src="/static/img/icon-back.svg"
                 alt="Terug naar het vorige scherm" />
        </button>
    </menu>
</template>

<script>
    export default {
        methods : {
            back() {
                this.$store.commit('screen', 'overview');
            }
        }
    }
</script>