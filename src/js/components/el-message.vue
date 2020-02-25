<template>
    <div class="el-message screen-course__bottom"
         v-bind:is-visible="visible">

        <div class="el-message__text"
             v-if="text">
            <p v-html="text"></p>
        </div>

        <slot></slot>

        <button v-on:click="click"
                v-html="button"
                v-if="button"
                class="el-message__text-button"></button>
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