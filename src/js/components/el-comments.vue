<template>
    <div class="el-comments"
         v-bind:visible="visible">
        <el-button
            flair="solid"
            v-on:click="click"
            align="center"
            v-bind:text="button"></el-button>

        <div class="el-comments__listcontainer">
            <ul class="el-comments__list">
                <li class="el-comments__comment"
                    v-for="comment in comments">
                    <strong class="el-comments__name">
                        {{comment.name}}
                    </strong>

                    <p class="el-comments__text">
                        {{comment.text}}
                    </p>

                    <el-button
                        class="el-comments__votebtn"
                        v-if="comment.meta === 'vote'"
                        flair="solid"
                        v-on:click="click"
                        align="center"
                        msg="vote_comment"></el-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        computed : {
            comments() {
                return this.$store.getters.course.comments;
            }
        },

        methods : {
            click() {
                this.$emit('close');
            }
        },

        props : {
            button : {
                type : String,
            },

            visible : {
                type : Boolean
            }
        }
    }
</script>