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
                v-bind:text="step.text"
                v-bind:visible="questionsShown"
                v-on:submit="submit"></el-question>

            <modal-dialog
                v-show="!viewerShown && !courseReady"
                v-bind:text="firstStep.text"
                v-bind:disabled="!isViewerReady"
                v-on:ok="showViewer"></modal-dialog>

            <modal-dialog
                v-show="readyForQuestions"
                v-bind:text="firstStep.text2"
                v-on:ok="showQuestions"></modal-dialog>


            <modal-dialog
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
    import { first, last } from 'lodash';
    import ClockTimer from '../clocktimer.js';
    import { PAINTING_VIEW_TIME } from '../const.js';
    import ElHint from './el-hint.vue';
    import ElQuestion from './el-question.vue';
    import ImageViewer from './image-viewer.vue';
    import MenuBar from './menu-bar.vue';
    import ModalDialog from './modal-dialog.vue';

    let timer;

    export default {
        components : {
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

            courseDescription() {
                return this.$store.getters.course.modaltext;
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

            courseDone() {
                this.viewerShown = false;
                this.$refs.viewer.hide();
                this.questionsShown = false;
                this.courseReady = true;
                this.$store.commit('playSound', this.lastStep.audio2);
            },

            focusQuestion() {
                this.$refs.question.focus();
            },

            showQuestions() {
                this.readyForQuestions = false;
                this.$refs.viewer.reset();
                this.stepIndex = 1;
                this.questionsShown = true;

                // FIXME, this is ugly
                window.setTimeout(() => {
                    this.$refs.question.focus();
                }, 200);
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

                        if (e.type === 'target') {
                            this.readyForQuestions = true;
                            this.$store.commit('playSound', this.firstStep.audio2);
                        }
                    },

                    targets : [ PAINTING_VIEW_TIME ]
                });

                timer.start();
            },

            submit() {
                this.$refs.question.clear();

                if (this.stepIndex === (this.courseData.length - 1)) {
                    this.courseDone();
                } else {
                    this.stepIndex += 1;
                }
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
            }
        }
    }
</script>