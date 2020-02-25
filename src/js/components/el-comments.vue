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

        props : {
            button : {
                type : String,
            }
        }
    }
</script>