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
                state : 'blurred',
                viewer : null,
            }
        },

        methods : {
            setupBoundary() {
                let el = this.$el.querySelector('.viewer-move');
                let canvas = this.$el.querySelector('.viewer-canvas');
                let canvasRect = canvas.getBoundingClientRect();

                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((e) => {
                        let left = e.target.style.marginLeft;
                        let top = e.target.style.marginTop;
                        left = parseFloat(left.replace('px', ''));
                        top = parseFloat(top.replace('px', ''));

                        let container = this.viewer.containerData;
                        let minRatio = this.viewer.options.minZoomRatio;
                        let curRatio = this.viewer.imageData.ratio;

                        console.log(left, top, minRatio, curRatio);

                        if (curRatio > minRatio) {
                            return;
                        }

                        if (left < 0) {
                            this.viewer.moveTo(0, top);
                        }

                        if (top < 0) {
                            this.viewer.moveTo(left, 0);
                        }

                        if (left > container.width) {
                            this.viewer.moveTo(container.width, top);
                        }
                    });
                });


                observer.observe(el, {
                    attributes : true,
                    attribueFilter : ['style']
                });
            },

            setupViewer() {
                let img = this.$refs.img;

                img.addEventListener('ready', () => {
                    this.$emit('ready');
                });

                img.addEventListener('viewed', () => {
                    this.setupBoundary();

                    // This is needed because otherwise the ratio gets
                    // smaller (?)
                    this.viewer.zoomTo(this.minZoomRatio);
                });

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
                console.log('zoom', ZOOM_BTN_FACTOR);
                this.viewer.zoom(ZOOM_BTN_FACTOR);
            },

            zoomOut() {
                this.viewer.zoom(-ZOOM_BTN_FACTOR);
            }
        },

        mounted() {
            let img = this.$refs.img;

            img.addEventListener('load', () => {
                this.minZoomRatio = window.innerWidth / img.width;
                this.setupViewer();
            });

            this.imageSrc = this.src('nq');
        }
    }
</script>