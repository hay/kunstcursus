<template>
    <div class="image-viewer">
        <img v-if="src"
             class="image-viewer__image"
             ref="img"
             v-bind:src="src('nq')"
             v-bind:alt="alt" />
    </div>
</template>

<script>
    import Viewer from 'viewerjs';
    import {
        MIN_ZOOM_RATIO, MAX_ZOOM_RATIO, ZOOM_BTN_FACTOR
    } from '../const.js';

    export default {
        computed : {
            alt() {
                return 'Hier moet een alt text komen';
            }
        },

        data() {
            return {
                viewer : null
            }
        },

        methods : {
            resetWhenZoomedout() {
                // When zoomed out completely, return to center, but make
                // sure it doesn't interfere with natural things
                let times = 0;

                this.$refs.img.addEventListener('zoom', (e) => {
                    if (e.detail.ratio === MIN_ZOOM_RATIO) {
                        times = times + 1;

                        if (times > 1) {
                            this.viewer.reset();
                            times = 0;
                        }
                    }
                });
            },

            setupViewer() {
                this.viewer = new Viewer(this.$refs.img, {
                    backdrop: false,
                    button : false,
                    fullscreen: false,
                    inline : true,
                    minZoomRatio : MIN_ZOOM_RATIO,
                    maxZoomRatio : MAX_ZOOM_RATIO,
                    navbar : false,
                    rotatable : false,
                    title : false,
                    toolbar : false,
                    tooltip : false
                });
            },

            src(type) {
                let id = this.$store.getters.course.artwork;
                return `assets/${id}-${type}.jpg`;
            },

            zoomIn() {
                this.viewer.zoom(ZOOM_BTN_FACTOR);
            },

            zoomOut() {
                this.viewer.zoom(-ZOOM_BTN_FACTOR);
            }
        },

        mounted() {
            this.setupViewer();
            this.resetWhenZoomedout();
        }
    }
</script>