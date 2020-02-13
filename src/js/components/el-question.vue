<template>
    <div class="el-question screen__question"
         v-bind:is-visible="visible">
        <div class="el-question__text">
            <p v-html="text"></p>
        </div>

        <div class="el-question__input">
            <textarea
                class="el-question__form"
                ref="form"
                v-model="input"></textarea>

            <button
                v-on:click="submit"
                v-bind:disabled="buttonDisabled"
                class="el-question__button">
                <img src="/static/img/icon-send.svg"
                     alt="Verstuur" />
            </button>
        </div>
    </div>
</template>

<script>
    import { MIN_QUESTION_LENGTH } from '../const.js';

    export default {
        computed : {
            buttonDisabled() {
                return this.input.length < this.minlength;
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

            submit() {
                if (!this.buttonDisabled) {
                    this.$emit('submit');
                }
            }
        },

        props : {
            minlength : {
                default : MIN_QUESTION_LENGTH,
                type : Number
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