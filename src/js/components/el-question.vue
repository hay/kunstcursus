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
                class="el-question__button">
                <img src="/static/img/icon-send.svg"
                     alt="Verstuur" />
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                input : ''
            }
        },

        methods : {
            clear() {
                this.input = '';
                this.$refs.form.focus();
            },

            submit() {
                this.$emit('submit');
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