<template>
    <div class="el-comments screen__question"
         v-bind:is-visible="visible">
        <div class="el-comments__content">
            <h2 class="el-comments__title">
                {{title}}
            </h2>

            <ul class="el-comments__list">
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
                    class="el-comments__button">
                Gelezen
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        methods : {
            click() {
                this.$emit('click');
            }
        },

        props : {
            title : {
                type : String
            },

            visible : {
                default : true,
                type : Boolean
            }
        }
    }
</script>