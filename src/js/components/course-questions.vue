<template>
    <div class="screen screen--course">
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
                v-bind:text="step.text1"
                v-bind:visible="questionsShown"
                v-on:submit="nextStep"></el-question>

            <el-comments
                v-bind:title="step.text1"
                v-on:click="hideComments"
                v-bind:visible="commentsShown"></el-comments>

            <modal-dialog
                v-show="!viewerShown && !courseReady"
                v-bind:text="firstStep.text1"
                v-bind:disabled="!isViewerReady"
                v-on:ok="showViewer"></modal-dialog>

            <modal-dialog
                v-if="firstStep.text1"
                v-show="readyForQuestions"
                v-bind:text="firstStep.text2"
                v-on:ok="showQuestions"></modal-dialog>

            <modal-dialog
                v-if="lastStep.text2"
                v-show="courseReady"
                v-bind:text="lastStep.text2"
                v-on:ok="back"></modal-dialog>
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
    // Used for both 321-bridge and step-inside
    import { first, last } from 'lodash';
    import ClockTimer from '../clocktimer.js';
    import { PAINTING_VIEW_TIME } from '../const.js';
    import ElComments from './el-comments.vue';
    import ElHint from './el-hint.vue';
    import ElQuestion from './el-question.vue';
    import ImageViewer from './image-viewer.vue';
    import MenuBar from './menu-bar.vue';
    import ModalDialog from './modal-dialog.vue';
    import { timeout } from '../util.js';

    let timer;

    export default {
        components : {
            ElComments,
            ElHint,
            ElQuestion,
            ImageViewer,
            MenuBar,
            ModalDialog
        },

        computed : {
            courseData() {
                return this.$store.getters.course.data;
            },

            firstStep() {
                return first(this.courseData);
            },

            lastStep() {
                return last(this.courseData);
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
                commentsShown : false,
                courseReady : false,
                isViewerReady : false,
                questionsShown : false,
                readyForQuestions : false,
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

                if (this.lastStep.audio2) {
                    this.$store.commit('playSound', this.lastStep.audio2);
                } else {
                    // FIXME
                    await timeout(1000);
                    this.back();
                }
            },

            focusQuestion() {
                this.$refs.question.focus();
            },

            hideComments() {
                this.commentsShown = false;
                this.showQuestions(this.stepIndex + 1)
            },

            nextStep() {
                this.$refs.question.clear();

                if (this.stepIndex === (this.courseData.length - 1)) {
                    this.courseDone();
                } else {
                    this.stepIndex += 1;
                }
            },

            async showQuestions(index = 1) {
                this.readyForQuestions = false;
                this.$refs.viewer.reset();
                this.stepIndex = index;
                this.questionsShown = true;

                // FIXME, this is ugly
                await timeout(200);
                this.$refs.question.focus();
            },

            showViewer() {
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

                        if (e.type === 'target' && this.firstStep.text2) {
                            this.readyForQuestions = true;
                            this.$store.commit('playSound', this.firstStep.audio2);
                        }

                        if (e.type === 'target' && !this.firstStep.text2) {
                            this.showQuestions();
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

            this.$store.commit('playSound', this.courseData[0].audio1);
        },

        watch : {
            step() {
                this.$store.commit('playSound', this.step.audio1);
                console.log('step!', this.step.action);

                if (this.step.action === 'comments') {
                    this.commentsShown = true;
                    this.questionsShown = false;
                }
            }
        }
    }
</script>