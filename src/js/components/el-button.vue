<template>
    <button class="el-button"
            v-bind:disabled="disabled"
            v-bind:class="'el-button--' + type"
            v-on:click="click">

        <img v-if="type === 'icon'"
             v-bind:src="'img/icon-' + icon + '.svg'"
             v-bind:alt="text" />

        <span v-if="type === 'text'"
              v-html="text"></span>
    </button>
</template>

<script>
    export default {
        computed : {
            type() {
                return this.icon && this.text ? 'icon' : 'text';
            }
        },

        methods : {
            click() {
                this.$emit('click');
            }
        },

        props : {
            disabled : {
                type : Boolean,
                default : false
            },

            icon : {
                type : String,
            },

            text : {
                type : String
            }
        }
    };
</script>