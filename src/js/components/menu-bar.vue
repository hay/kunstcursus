<template>
    <menu class="menu-bar">
        <div class="menu-bar__group">
            <button class="menu-bar__button"
                    v-on:click="back">
                <img src="/static/img/icon-back.svg"
                     alt="Terug naar het vorige scherm" />
            </button>
        </div>

        <div class="menu-bar__group">
            <button class="menu-bar__button"
                    v-on:click="zoomOut">
                <img src="/static/img/icon-minus.svg"
                     alt="Zoom uit" />
            </button>

            <button class="menu-bar__button"
                    v-on:click="zoomIn">
                <img src="/static/img/icon-plus.svg"
                     alt="Zoom in" />
            </button>
        </div>
    </menu>
</template>

<script>
    export default {
        methods : {
            back() {
                this.$store.commit('screen', 'overview');
            },

            zoomIn() {
                this.$emit('zoomin');
            },

            zoomOut() {
                this.$emit('zoomout');
            }
        }
    }
</script>