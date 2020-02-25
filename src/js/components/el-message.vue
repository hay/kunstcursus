<template>
    <div class="el-message screen-course__bottom"
         v-bind:is-visible="visible">
        <div class="el-message__text"
             v-if="text">
            <p v-html="text"></p>
        </div>

        <slot></slot>
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