<template>
    <div class="screen screen-splash screen--text">
        <div class="screen__content">
            <el-button
                align="right"
                flair="noborder"
                icon="info"
                text="Over dit prototype"
                v-on:click="about"></el-button>

            <el-logo></el-logo>

            <article class="screen-splash__text"
                     v-html="$msg('intro')"></article>

            <div class="screen-splash__notice">
                <p>{{$msg('enable_audio')}}</p>
            </div>

            <form class="screen-splash__form">
                <input class="screen-splash__name"
                       type="text"
                       v-model="name"
                       v-bind:placeholder="$msg('form_name')" />

                <el-button
                    v-on:click="start"
                    v-bind:text="$msg('btn_start')"
                    v-bind:disabled="!isValidName"></el-button>
                </button>
            </form>

            <div class="screen-splash__small">
                <small>{{$msg('disclaimer')}}</small>
            </div>


        </div>
    </div>
</template>

<script>
    import ElLogo from './el-logo.vue';

    export default {
        components : { ElLogo },

        computed : {
            isValidName() {
                return !!this.name && this.name.length >= 3 && this.name.length <= 20;
            }
        },

        data() {
            return {
                name : null
            }
        },

        methods : {
            about() {
                this.$store.commit('screen', 'about');
            },

            start() {
                this.$store.commit('userName', this.name);
                this.$store.commit('screen', 'intro');
            }
        }
    }
</script>