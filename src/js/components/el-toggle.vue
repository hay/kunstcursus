<template>
    <button
        class="el-toggle"
        v-on:click="toggle"
        v-bind:state="state">
        <span class="sr-only">{{value}}</span>
    </button>
</template>

<script>
    export default {
        computed : {
            state() {
                if (this.value === null) {
                    return 'novalue';
                } else {
                    return this.value === this.states[0] ? 1 : 2;
                }
            }
        },

        methods : {
            toggle() {
                if (this.value === this.states[0]) {
                    this.$emit('input', this.states[1]);
                } else {
                    this.$emit('input', this.states[0]);
                }
            }
        },

        props : {
            states : {
                type : Array,
                default: () => [1, 2]
            },

            value : {
                type : [String, Number, Boolean, null]
            }
        }
    }
</script>