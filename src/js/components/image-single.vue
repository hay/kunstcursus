<template>
    <div class="image-single">
        <img
            v-if="src"
            class="image-single__image"
            v-bind:src="src"
            alt="" />
    </div>
</template>

<script>
    export default {
        props : {
            src : {
                type : String
            }
        }
    }
</script>