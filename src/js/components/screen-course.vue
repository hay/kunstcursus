<template>
    <div class="screen screen-course">
        <div class="screen__flex">
            <image-viewer
                ref="viewer"
                v-on:ready="viewerReady"
                ></image-viewer>

            <el-hint
                v-bind:visible="viewerShown"
                align="left"
                v-bind:prefix="step.step + '/' + maxStep"
                v-bind:text="step.steplabel"></el-hint>

            <el-hint
                v-bind:visible="viewerShown && !!time"
                align="right"
                v-on:click="skipTime"
                v-bind:text="time"></el-hint>

            <el-question
                ref="question"
                class="screen-course__bottom"
                v-bind:text="step.text"
                v-bind:visible="step.action === 'question'"
                v-on:submit="nextStep"></el-question>

            <el-comments
                v-bind:button="step.button"
                v-bind:text="step.text"
                v-on:click="nextStep"
                v-bind:visible="step.action === 'comments'"></el-comments>

            <el-notice
                v-bind:visible="step.action === 'notice'"
                v-bind:text="step.text"
                v-bind:button="step.button"
                v-on:click="nextStep"></el-notice>
        </div>

        <div class="screen__fixed">
            <menu-bar
                v-on:zoomin="zoomIn"
                v-on:zoomout="zoomOut"
                ></menu-bar>
        </div>
    </div>
</template>

<script>
    import ClockTimer from '../clocktimer.js';
    import ElComments from './el-comments.vue';
    import ElHint from './el-hint.vue';
    import ElNotice from './el-notice.vue';
    import ElQuestion from './el-question.vue';
    import ImageViewer from './image-viewer.vue';
    import MenuBar from './menu-bar.vue';
    import { PAINTING_VIEW_TIME } from '../const.js';
    import { timeout } from '../util.js';

    let timer;

    export default {
        components : {
            ElComments,
            ElHint,
            ElNotice,
            ElQuestion,
            ImageViewer,
            MenuBar
        },

        computed : {
            maxStep() {
                return this.$store.getters.maxStep;
            },

            step() {
                return this.$store.getters.step;
            }
        },

        data() {
            return {
                isViewerReady : false,
                startTime : null,
                time : null,
                timer : null,
                viewerShown : false
            }
        },

        methods : {
            async courseDone() {
                this.viewerShown = false;
                this.$refs.viewer.hide();
                await timeout(1000);
                this.$store.commit('screen', 'overview');
            },

            nextStep() {
                this.$store.dispatch('nextStep');
            },

            playSound() {
                if (this.step.audio) {
                    this.$store.commit('playSound', this.step.audio);
                }
            },

            showStudyViewer() {
                this.viewerShown = true;
                this.$refs.viewer.show();
                this.startTimer();
            },

            skipTime() {
                timer.updateSeconds(PAINTING_VIEW_TIME - 1);
            },

            startTimer() {
                timer = new ClockTimer({
                    callback: (e) => {
                        if (e.type === 'update') {
                            this.time = e.data;
                        }

                        if (e.type === 'target') {
                            this.nextStep();
                        }
                    },

                    targets : [ PAINTING_VIEW_TIME ]
                });

                timer.start();
            },

            viewerReady() {
                this.isViewerReady = true;
            },

            zoomIn() {
                this.$refs.viewer.zoomIn();
            },

            zoomOut() {
                this.$refs.viewer.zoomOut();
            }
        },

        mounted() {
            if (this.$store.state.skipIntro) {
                this.showViewer();
            }

            this.playSound();
        },

        watch : {
            step() {
                if (this.$store.getters.courseDone) {
                    this.courseDone();
                } else {
                    this.$refs.question.clear();
                    this.playSound();

                    if (this.step.action === 'study') {
                        this.showStudyViewer();
                    }
                }
            }
        }
    }
</script>