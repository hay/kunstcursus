<template>
    <div class="el-message screen__bottom"
         v-bind:is-visible="visible">
        <p class="el-message__text"
           v-html="text"></p>

        <button v-on:click="click"
                v-html="button"
                class="el-message__button"></button>
    </div>
</template>

<script>
    export default {
        methods : {
            click() {
                this.$emit('click');
            }
        },

        props : {
            button : {
                type : String
            },

            text : {
                type : String
            },

            visible : {
                default : true,
                type : Boolean
            }
        }
    }
</script>