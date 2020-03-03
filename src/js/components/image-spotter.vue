<template>
    <div class="image-spotter"
         ref="canvas">
        <div class="image-spotter__canvas">
            <img class="image-spotter__image"
                 ref="img"
                 v-bind:src="src" />

            <div v-if="!spots"
                 class="image-spotter__spot"
                 v-bind:visible="spotVisible"
                 v-bind:style="spotStyle"></div>

            <template v-if="spots">
                <div v-for="spot in spots"
                     class="image-spotter__spot"
                     visible
                     v-on:click="clickSpot(spot)"
                     v-bind:style="formatSpot(spot)"></div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        computed : {
            imageSrc() {
                return this.src('nq');
            }
        },

        data() {
            return {
                spotStyle : {},
                spotVisible : false,
                src : ''
            }
        },

        methods : {
            clickSpot(spot) {
                this.$emit('spot', spot.label);
            },

            fitImage() {
                const img = this.$refs.img;
                const canvas = this.$refs.canvas;
                const canvasSize = canvas.getClientRects()[0];
                const imgSize = img.getClientRects()[0];

                const scaleFactor = Math.min(
                    (canvasSize.width / img.width),
                    (canvasSize.height / img.height)
                );

                img.width = imgSize.width * scaleFactor;
                img.height = imgSize.height * scaleFactor;
            },

            formatSpot(spot) {
                return {
                    'left' : `${spot.x * 100}%`,
                    'top' : `${spot.y * 100}%`
                };
            },

            loadImage() {
                this.$refs.img.addEventListener('load', () => {
                    this.fitImage();

                    if (!this.spots) {
                        this.setupSpotClick();
                    }
                });

                let id = this.$store.getters.artwork;
                this.src = `assets/${id}-nq.jpg`;
            },

            reset() {
                this.spotVisible = false;
            },

            setupSpotClick() {
                const imgResized = this.$refs.img.getClientRects()[0];

                this.$refs.img.addEventListener('click', (e) => {
                    // Get relative x/y
                    const x = (e.clientX - imgResized.left) / imgResized.width;
                    const y = (e.clientY - imgResized.top) / imgResized.height;

                    this.spotVisible = true;
                    this.spotStyle = formatSpot({ x, y });
                    this.$emit('spot');
                });
            }
        },

        mounted() {
            this.loadImage();
        },

        props : {
            spots : {
                type : Array
            }
        }
    }
</script>