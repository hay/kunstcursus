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
                v-bind:title="step.text"
                v-on:click="nextStep"
                v-bind:visible="step.action === 'comments'"></el-comments>

            <el-message
                v-bind:visible="step.action === 'message'"
                v-bind:text="step.text"
                v-bind:button="step.button"
                v-on:click="nextStep"></el-message>
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
    import ElMessage from './el-message.vue';
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
            ElMessage,
            ElQuestion,
            ImageViewer,
            MenuBar
        },

        computed : {
            courseData() {
                return this.$store.getters.course.data;
            },

            maxStep() {
                return Math.max.apply(
                    this, this.courseData.map(d => parseInt(d.step))
                );
            },

            step() {
                return this.courseData[this.stepIndex];
            }
        },

        data() {
            return {
                isViewerReady : false,
                stepIndex : 0,
                startTime : null,
                time : null,
                timer : null,
                viewerShown : false
            }
        },

        methods : {
            back() {
                this.$store.commit('screen', 'overview');
            },

            async courseDone() {
                this.viewerShown = false;
                this.$refs.viewer.hide();
                this.questionsShown = false;
                this.courseReady = true;

                // FIXME
                await timeout(1000);
                this.back();
            },


            nextStep() {
                this.$refs.question.clear();

                if (this.stepIndex === (this.courseData.length - 1)) {
                    this.courseDone();
                } else {
                    this.stepIndex += 1;
                }
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
                this.playSound();

                if (this.step.action === 'study') {
                    this.showStudyViewer();
                }

                if (this.step.action === 'comments') {
                    this.commentsShown = true;
                    this.questionsShown = false;
                }
            }
        }
    }
</script>