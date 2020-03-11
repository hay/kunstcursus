<template>
    <el-message
        v-bind:visible="visible"
        v-bind:text="text">
        <ul class="el-message__list">
            <li>
                <strong>Hay (36, Amsterdam)</strong>
                <p>Ik denk dat ze iemand hoort roepen, ze ziet niks, want ze heeft haar ogen dicht, en ze ruikt verse bloemen.</p>
            </li>

            <li>
                <strong>Brigitte Jansen (28, Rotterdam)</strong>
                <p>Ze hoort muziek, ziet haar buurvrouw en ruikt vers gebakken brood.</p>
            </li>
        </ul>

        <el-button
            v-on:click="click"
            align="center"
            v-bind:text="button"></el-button>
    </el-message>
</template>

<script>
    import ElMessage from './el-message.vue';

    export default {
        components : { ElMessage },

        extends : ElMessage,

        methods : {
            click() {
                this.$emit('click');
            }
        },

        props : {
            button : {
                type : String,
            }
        }
    }
</script>