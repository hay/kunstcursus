<template>
    <div class="screen__hint hint"
         v-on:click="click"
         v-bind:align="align"
         v-bind:is-visible="visible">
        <p class="hint__text">
            <strong v-if="prefix">{{prefix}}</strong>
            <span v-html="text"></span>
        </p>
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
            align : {
                type : String,
                validator: (val) => ['left', 'right'].includes(val)
            },

            prefix : {
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
    };
</script>