<template>
    <div class="screen intro">
        <div v-if="loading"
             class="intro__loading">
            {{$msg('loading_intro')}}
        </div>

        <div v-if="!loading"
             v-bind:style="progressStyle"
             class="intro__progress"></div>

        <div ref="canvas"
             class="intro__canvas"></div>

        <el-button
            class="intro__skip"
            v-on:click="skip"
            msg="skip_intro"></el-button>
    </div>
</template>

<script>
    import lottie from 'lottie-web';

    let animation;

    export default {
        data() {
            return {
                done : 0,

                loading : true,

                progressStyle : {
                    width : '100%'
                },

                voiceover : false
            };
        },

        methods : {
            close() {
                animation.destroy();
                this.$store.commit('screen', 'profile');
            },

            setupAnimation() {
                animation = lottie.loadAnimation({
                    container : this.$refs.canvas,
                    path : 'intro/data.json',
                    autoplay : false
                });

                animation.addEventListener('loaded_images', () => {
                    this.loading = false;
                    animation.play();
                })

                animation.addEventListener('enterFrame', (e) => {
                    const pct = e.currentTime / e.totalTime;
                    this.progressStyle.width = ((1 - pct) * 100) + '%';

                    if (pct > 0.05 && !this.voiceover) {
                        this.startVoiceover();
                    }
                });

                animation.addEventListener('complete', () => {
                    this.done = this.done + 1;
                })
            },

            skip() {
                this.$track.trackOnce('skip-intro');
                this.close();
            },

            startVoiceover() {
                this.voiceover = true;
                const sound = this.$sounds.play('intro_01');

                sound.player.addEventListener('ended', () => {
                    this.done = this.done + 1;
                });
            }
        },

        mounted() {
            this.setupAnimation();
        },

        watch : {
            done() {
                // This is a bit of a kludge, but make sure both voiceover
                // *and* animation are finished
                if (this.done >= 2) {
                    this.$track.trackOnce('finished-complete-intro');
                    this.close();
                }
            }
        }
    }
</script>