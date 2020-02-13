<template>
    <div class="image-viewer"
         v-bind:state="state">
        <img v-if="src"
             class="image-viewer__image"
             ref="img"
             v-bind:src="imageSrc"
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
                imageSrc : null,
                minZoomRatio : 0,
                maxZoomRatio : 1,
                originalLeft : 0,
                originalTop : 0,
                state : 'blurred',
                viewer : null,
            }
        },

        methods : {
            setupViewer() {
                let img = this.$refs.img;

                img.addEventListener('ready', () => {
                    this.$emit('ready');
                });

                img.addEventListener('viewed', () => {
                    // This is needed because otherwise the ratio gets
                    // smaller (?)
                    this.viewer.zoomTo(this.minZoomRatio);

                    // Note the current left/top
                    let canvas = this.$el.querySelector('.viewer-canvas img');
                    let left = canvas.style.marginLeft;
                    let top = canvas.style.marginTop;
                    this.originalLeft = parseFloat(left.replace('px', ''));
                    this.originalTop = parseFloat(top.replace('px', ''));
                });

                img.addEventListener('zoomed', () => {
                    if (this.viewer.imageData.ratio <= this.minZoomRatio) {
                        // Move to center and zoom to original ratio
                        this.viewer.zoomTo(this.minZoomRatio);
                        this.viewer.moveTo(this.originalLeft, this.originalTop);
                    }
                })

                this.viewer = new Viewer(img, {
                    backdrop: false,
                    button : false,
                    fullscreen: false,
                    inline : true,
                    minZoomRatio : this.minZoomRatio,
                    maxZoomRatio : 1.5,
                    navbar : false,
                    rotatable : false,
                    title : false,
                    toggleOnDblclick : false,
                    toolbar : false,
                    tooltip : false
                });
            },

            show() {
                this.state = 'show';
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
            let img = this.$refs.img;

            img.addEventListener('load', () => {
                // Get the minimal zoom ratio
                this.minZoomRatio = Math.min(
                    window.innerWidth / img.width,
                    window.innerHeight / img.height
                );

                this.setupViewer();
            });

            this.imageSrc = this.src('nq');
        }
    }
</script>