<template>
    <div class="screen screen-course">
        <div class="screen__flex">
            <image-viewer
                ref="viewer"
                v-bind:key="artwork"
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
                class="screen-course__bottom"
                v-bind:button="step.button"
                v-bind:text="step.text"
                v-on:click="nextStep"
                v-bind:visible="step.action === 'comments'"></el-comments>

            <el-message
                class="screen-course__bottom"
                v-bind:visible="step.action === 'notice'"
                v-bind:text="step.text">
                <el-button
                    align="center"
                    v-bind:text="step.button"
                    v-on:click="nextStep"></el-notice>
            </el-message>

            <el-message
                type="modal"
                v-bind:visible="confirmExit"
                text="Weet je zeker dat je deze les wilt verlaten?">

                <menu class="el-message__menu">
                    <el-button
                        text="Ja, stop de les"
                        v-on:click="exit"></el-button>

                    <el-button
                        text="Nee, ga verder"
                        v-on:click="confirmExit = false"></el-button>
                </menu>
            </el-message>

            <el-message
                class="screen-course__bottom"
                v-bind:visible="step.action === 'judge'"
                text="Wat vind je van dit kunstwerk?">

                <menu class="el-message__menu">
                    <el-button
                        icon="like"
                        text="Vind ik leuk"
                        v-on:click="nextStep"></el-button>

                    <el-button
                        icon="notlike"
                        text="Vind ik niet leuk"
                        v-on:click="nextStep"></el-button>
                </menu>
            </el-message>
        </div>

        <div class="screen__fixed">
            <menu-bar
                v-on:exit="confirmExit = true"
                v-on:zoomin="zoomIn"
                v-on:zoomout="zoomOut"
                ></menu-bar>
        </div>
    </div>
</template>

<script>
    import ClockTimer from '../clocktimer.js';
    import ElButton from './el-button.vue';
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
            ElButton,
            ElComments,
            ElHint,
            ElMessage,
            ElQuestion,
            ImageViewer,
            MenuBar
        },

        computed : {
            artwork() {
                return this.$store.getters.artwork;
            },

            maxStep() {
                return this.$store.getters.maxStep;
            },

            step() {
                return this.$store.getters.step;
            }
        },

        data() {
            return {
                confirmExit : false,
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
                this.$store.commit('courseDone');
                this.$store.commit('screen', 'overview');
            },

            exit() {
                this.confirmExit = false;
                this.courseDone();
            },

            nextStep() {
                this.$store.dispatch('nextStep');
            },

            playSound() {
                if (this.step.audio) {
                    this.$sounds.play(this.step.audio);
                }
            },

            showViewer() {
                this.viewerShown = true;
                this.$refs.viewer.show();
            },

            skipTime() {
                timer.updateSeconds(PAINTING_VIEW_TIME - 1);
            },

            startTimer(targets = []) {
                timer = new ClockTimer({
                    callback: (e) => {
                        if (e.type === 'update') {
                            this.time = e.data;
                        }

                        if (e.type === 'target') {
                            this.nextStep();
                        }
                    },

                    targets : targets
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
            async step() {
                if (this.$store.getters.courseDone) {
                    this.courseDone();
                } else {
                    if (this.step.action === 'timefeedback') {
                        // TOOD: implement
                        this.nextStep();
                        return;
                    }

                    if (this.step.action === 'study') {
                        this.showViewer();
                        this.startTimer([ PAINTING_VIEW_TIME ]);
                    }

                    if (this.step.action === 'starttimer') {
                        this.startTimer();
                        this.nextStep();
                    }

                    if (this.step.action === 'judge') {
                        // FIXME
                        await timeout(250);
                        this.showViewer();
                    }

                    if (this.step.action === 'resetcenter') {
                        this.$refs.viewer.reset();
                        this.nextStep();
                    }

                    this.$refs.question.clear();
                    this.playSound();
                }
            }
        }
    }
</script>