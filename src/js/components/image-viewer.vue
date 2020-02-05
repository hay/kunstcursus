<template>
    <div class="image-viewer">
        <img v-if="src"
             class="image-viewer__image"
             ref="img"
             v-bind:src="src('mq')"
             v-bind:alt="alt" />
    </div>
</template>

<script>
    import Viewer from 'viewerjs';

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
            setupViewer() {
                this.viewer = new Viewer(this.$refs.img, {
                    inline : false,
                    minZoomRatio : 0.25,
                    maxZoomRatio : 3,
                    navbar : false,
                    rotatable : false,
                    title : false,
                    toolbar : false,
                    url : this.src('hq')
                });

                this.viewer.show();

                console.log(this.viewer);
            },

            src(type) {
                let id = this.$store.getters.course.artwork;
                return `assets/${id}-${type}.jpg`;
            }
        },

        mounted() {
            // this.setupViewer();
        }
    }
</script>