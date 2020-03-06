<template>
    <button class="el-button"
            v-bind:disabled="disabled"
            v-bind:class="classes"
            v-on:click="click">

        <img v-if="type === 'icon'"
             v-bind:src="iconSrc"
             v-bind:alt="text" />

        <span v-if="type === 'text'"
              v-html="buttonText"></span>
    </button>
</template>

<script>
    export default {
        computed : {
            buttonText() {
                if (this.text) {
                    return this.text;
                } else if (this.msg) {
                    return this.$msg(this.msg);
                } else {
                    return null;
                }
            },

            classes() {
                const classes = ['el-button--' + this.type];

                if (this.align) {
                    classes.push('el-button--' + this.align);
                }

                if (this.flair) {
                    classes.push('el-button--' + this.flair);
                }

                return classes;
            },

            iconSrc() {
                return `img/icon-${this.icon}.png`;
            },

            type() {
                return this.icon && this.buttonText ? 'icon' : 'text';
            }
        },

        methods : {
            click() {
                this.$emit('click');
            }
        },

        props : {
            align : {
                type : String
            },

            disabled : {
                type : Boolean,
                default : false
            },

            flair : {
                type : String
            },

            icon : {
                type : String,
            },

            msg : {
                type : String
            },

            text : {
                type : String
            }
        }
    };
</script>