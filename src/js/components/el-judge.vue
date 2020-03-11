<template>
    <el-message
        v-bind:visible="visible"
        v-bind:text="text">
        <menu class="el-message__menu">
            <el-button
                icon="thumbsup"
                msg="judge_good"
                v-on:click="click('good')"></el-button>

            <el-button
                icon="thumbsavg"
                msg="judge_avg"
                v-on:click="click('avg')"></el-button>

            <el-button
                icon="thumbsdown"
                msg="judge_bad"
                v-on:click="click('bad')"></el-button>
        </menu>
    </el-message>
</template>

<script>
    import ElMessage from './el-message.vue';

    export default {
        components : { ElMessage },

        extends : ElMessage,

        methods : {
            click(msg) {
                this.$emit('click', msg);
            }
        }
    }
</script>