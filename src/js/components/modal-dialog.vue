<template>
    <div class="modal-dialog">
        <p class="modal-dialog__text">{{text}}</p>

        <button
            class="modal-dialog__button"
            v-bind:disabled="disabled"
            v-on:click="click">
            {{buttonText}}
        </button>
    </div>
</template>

<script>
    export default {
        methods : {
            click() {
                this.$emit('ok');
            }
        },

        props : {
            buttonText : {
                default : 'OK',
                type : String
            },

            disabled : {
                default : false,
                type : Boolean
            },

            text : {
                required : true,
                type : String
            }
        }
    }
</script>