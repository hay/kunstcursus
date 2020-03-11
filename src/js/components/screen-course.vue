<template>
    <div class="screen screen-course">
        <div class="screen__flex">
            <image-viewer
                v-if="viewerType === 'viewer'"
                ref="viewer"
                v-bind:disableZoom="disableZoom"
                v-bind:key="artwork"
                v-on:ready="viewerReady"
                ></image-viewer>

            <image-spotter
                v-if="viewerType === 'spotter' && step.action === 'imagespotter'"
                ref="spotter"
                v-on:spot="questionVisible = true"></image-spotter>

            <image-spotter
                v-if="viewerType === 'spotter' && step.action === 'spotted'"
                ref="spotted"
                v-bind:spots="protoSpots"
                v-on:spot="showNotice"></image-spotter>

            <image-single
                v-if="viewerType === 'single'"
                v-bind:src="step.meta"></image-single>

            <el-hint
                v-bind:visible="stepsVisible"
                align="left"
                v-bind:prefix="step.step + '/' + maxStep"
                v-bind:text="step.steplabel"></el-hint>

            <el-hint
                v-bind:visible="viewerShown && !!time && showTimer"
                align="right"
                v-on:click="skipTime"
                v-bind:text="time"></el-hint>

            <el-question
                ref="question"
                class="screen-course__bottom"
                v-bind:placeholder="step.placeholder"
                v-bind:text="step.text"
                v-bind:visible="questionVisible"
                v-on:submit="nextStep"></el-question>

            <el-comments
                class="screen-course__bottom"
                v-bind:button="step.button"
                v-bind:text="step.text"
                v-on:close="nextStep"
                v-bind:visible="step.action === 'comments'"></el-comments>

            <!-- This is used for ten times two and clicking on spots -->
            <el-message
                class="screen-course__bottom"
                v-bind:visible="!!hasNotice"
                v-bind:text="hasNotice ? hasNotice : ''">

                <menu class="el-message__menu">
                    <el-button
                        flair="solid"
                        text="OK"
                        v-on:click="hasNotice = false"></el-button>

                    <el-button
                        flair="solid"
                        text="Sluit les af"
                        v-on:click="nextStep"></el-button>
                </menu>
            </el-message>

            <el-message
                class="screen-course__bottom"
                v-bind:visible="step.action === 'notice'"
                v-bind:text="step.text">
                <el-button
                    flair="solid"
                    align="center"
                    v-bind:text="step.button"
                    v-on:click="nextStep"></el-notice>
            </el-message>

            <el-message
                type="modal"
                v-bind:visible="confirmExit"
                v-bind:text="$msg('confirm_exit')">

                <menu class="el-message__menu">
                    <el-button
                        flair="solid"
                        msg="confirm_yes"
                        v-on:click="exit"></el-button>

                    <el-button
                        flair="solid"
                        msg="confirm_no"
                        v-on:click="confirmExit = false"></el-button>
                </menu>
            </el-message>

            <el-judge
                class="screen-course__bottom"
                v-bind:visible="step.action === 'judge'"
                v-bind:text="$msg('judge_artwork')"
                v-on:click="judge"></el-judge>
        </div>

        <div class="screen__fixed">
            <menu-bar
                v-bind:disableZoom="disableZoom"
                v-on:exit="confirmExit = true"
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
    import ElJudge from './el-judge.vue';
    import ElMessage from './el-message.vue';
    import ElQuestion from './el-question.vue';
    import ImageSingle from './image-single.vue';
    import ImageSpotter from './image-spotter.vue';
    import ImageViewer from './image-viewer.vue';
    import MenuBar from './menu-bar.vue';
    import { COURSE_ACTIONS, PAINTING_VIEW_TIME, PROTO_SPOTS } from '../const.js';
    import { timeout } from '../util.js';

    let timer;

    export default {
        components : {
            ElComments,
            ElHint,
            ElJudge,
            ElMessage,
            ElQuestion,
            ImageSingle,
            ImageSpotter,
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
            },

            viewerType() {
                const action = this.step.action;

                if (this.useSingleImageViewer) {
                    return 'single';
                } else if (['imagespotter', 'spotted'].includes(action)) {
                    return 'spotter';
                } else {
                    return 'viewer';
                }
            }
        },

        data() {
            return {
                confirmExit : false,
                disableZoom : false,
                hasNotice : false,
                isViewerReady : false,
                protoSpots : PROTO_SPOTS,
                questionVisible : false,
                showTimer : false,
                stepsVisible : false,
                time : null,
                timer : null,
                useSingleImageViewer : false,
                viewerShown : false
            }
        },

        methods : {
            async courseDone() {
                this.viewerShown = false;

                if (this.$refs.viewer) {
                    this.$refs.viewer.hide();
                }

                await timeout(1000);
                this.$store.commit('courseDone');
                this.$store.commit('screen', 'overview');

                const courseLabel = this.$store.getters.course.title;
                this.$track.track('course-done', courseLabel)
            },

            exit() {
                this.$track.track('action', `exit`);
                this.confirmExit = false;
                this.courseDone();
            },

            fixKeyboardFocus() {
                // When in imagespotter modus, make sure a keydown gives
                // focus to the question
                window.addEventListener('keydown', (e) => {
                    if ((this.step.action === 'imagespotter') &&
                        !this.$refs.question.isFocused()) {
                        this.$refs.question.focus();

                    }
                });
            },

            judge(rating) {
                const evt = `${this.artwork}:${rating}`;
                this.$track.track('judge', evt);
                this.nextStep();
            },

            nextStep() {
                this.questionVisible = false;
                this.hasNotice = false;
                this.$store.dispatch('nextStep');
            },

            async parseStep() {
                if (this.$store.getters.courseDone) {
                    this.courseDone();
                } else {
                    if (this.step.action === 'timefeedback') {
                        // TOOD: implement
                        this.nextStep();
                        return;
                    }

                    if (this.step.action === 'singleimageon') {
                        this.useSingleImageViewer = true;
                        this.nextStep();
                    }

                    if (this.step.action === 'singleimageoff') {
                        this.useSingleImageViewer = false;
                        this.nextStep();
                    }

                    if (this.step.action === 'study') {
                        this.showViewer();
                        this.startTimer([ PAINTING_VIEW_TIME ]);
                    }

                    if (this.step.action === 'judge') {
                        // FIXME
                        await timeout(250);
                        this.showViewer();
                    }

                    if (this.step.action === 'question') {
                        this.questionVisible = true;
                    }

                    if (this.step.action === 'resetcenter') {
                        this.$refs.viewer.reset();
                        this.nextStep();
                    }

                    if (this.step.action === 'showviewer') {
                        this.showViewer();
                        this.nextStep();
                    }

                    if (this.step.action === 'disablezoom') {
                        this.disableZoom = true;
                        this.nextStep();
                    }

                    if (this.step.action === 'imagespotter') {
                        // FIXME
                        await timeout(250);
                        this.$refs.spotter.reset();
                    }

                    if (this.step.action === 'showsteps') {
                        this.stepsVisible = true;
                        this.nextStep();
                    }

                    if (this.step.action === 'hidesteps') {
                        this.stepsVisible = false;
                        this.nextStep();
                    }

                    // If the action is not a valid action, just skip
                    // to the next step and warn
                    if (!COURSE_ACTIONS.includes(this.step.action)) {
                        console.error(`Invalid action: ${this.step.action}`);
                        this.nextStep();
                    }

                    this.$refs.question.clear();
                    this.playSound();
                }
            },

            playSound() {
                if (this.step.audio) {
                    this.$sounds.play(this.step.audio);
                }
            },

            showNotice(msg) {
                this.hasNotice = msg;
            },

            async showViewer() {
                await timeout(250); // FIXME
                this.viewerShown = true;
                this.$refs.viewer.show();
            },

            skipTime() {
                this.$track.trackOnce('skip-time');
                timer.updateSeconds(PAINTING_VIEW_TIME - 1);
            },

            startTimer(targets = []) {
                this.showTimer = true;

                timer = new ClockTimer({
                    callback: (e) => {
                        if (e.type === 'update') {
                            this.time = e.data;
                        }

                        if (e.type === 'target') {
                            this.showTimer = false;
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
            this.parseStep();
            this.fixKeyboardFocus();
        },

        watch : {
            step() {
                this.parseStep();
            }
        }
    }
</script>