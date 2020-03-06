<template>
    <button class="el-button"
            v-bind:disabled="disabled"
            v-bind:class="classes"
            v-on:click="click">

        <img v-if="type === 'icon'"
             v-bind:src="iconSrc"
             v-bind:alt="text" />

        <span v-if="type === 'text'"
              v-html="text"></span>
    </button>
</template>

<script>
    export default {
        computed : {
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
                // FIXME
                if (this.icon.endsWith('.png')) {
                    return `img/icon-${this.icon}`;
                } else {
                    return `img/icon-${this.icon}.svg`;
                }
            },

            type() {
                return this.icon && this.text ? 'icon' : 'text';
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

            text : {
                type : String
            }
        }
    };
</script>