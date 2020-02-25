<template>
    <el-message v-bind:visible="visible"
                v-bind:text="text">
        <button v-on:click="click"
                v-html="button"
                class="el-message__text-button"></button>
    </el-message>
</template>

<script>
    import ElMessage from './el-message.vue';

    export default {
        components : {
            ElMessage
        },

        extends : ElMessage,

        methods : {
            click() {
                this.$emit('click');
            }
        },

        props : {
            button : {
                type : String
            }
        }
    }
</script>