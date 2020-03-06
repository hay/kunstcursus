<template>
    <el-message v-bind:visible="visible"
                v-bind:text="text">
        <div class="el-message__input">
            <textarea
                class="el-message__form"
                v-bind:placeholder="placeholder"
                ref="form"
                v-model="input"></textarea>

            <button
                v-on:click="submit"
                v-bind:disabled="buttonDisabled"
                class="el-message__icon-button">
                <img src="/static/img/icon-send.png"
                     alt="Verstuur" />
            </button>
        </div>
    </el-message>
</template>

<script>
    import { MIN_QUESTION_LENGTH } from '../const.js';
    import ElMessage from './el-message.vue';

    export default {
        components : {
            ElMessage
        },

        extends : ElMessage,

        computed : {
            buttonDisabled() {
                return this.input.length < MIN_QUESTION_LENGTH;
            }
        },

        data() {
            return {
                input : ''
            }
        },

        methods : {
            clear() {
                this.input = '';
                this.focus();
            },

            focus() {
                this.$refs.form.focus();
            },

            isFocused() {
                return document.activeElement === this.$refs.form;
            },

            submit() {
                if (!this.buttonDisabled) {
                    this.$store.commit('log', `question:${this.input}`);
                    this.$emit('submit');
                }
            }
        },

        props : {
            placeholder : {
                type : String
            }
        }
    }
</script>