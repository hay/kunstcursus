<template>
    <div class="screen screen--text">
        <div class="profile">
            <h2 class="profile__header">{{$msg('profile_header')}}</h2>

            <p class="profile__intro">{{$msg('profile_intro')}}</p>

            <ul class="profile__inputs">
                <li>
                    <label>{{$msg('profile_location')}}</label>
                    <input v-model="location" class="profile__input" />
                </li>

                <li>
                    <label>{{$msg('profile_age')}}</label>
                    <input v-model="age" class="profile__number" type="tel" maxlength="3" />
                </li>

                <li>
                    <label>{{$msg('profile_gender')}}</label>

                    <ul class="profile__checkboxes">
                        <li>
                            <input id="profile_male" type="radio" v-model="gender" value="male" />
                            <label for="profile_male">{{$msg('profile_male')}}</label>
                        </li>

                        <li>
                            <input id="profile_female" type="radio" v-model="gender" value="female" />
                            <label for="profile_female">{{$msg('profile_female')}}</label>
                        </li>

                        <li>
                            <input id="profile_othergender" type="radio" v-model="gender" value="othergender" />
                            <label for="profile_othergender">{{$msg('profile_othergender')}}</label>
                        </li>
                    </ul>
                </li>

                <li>
                    <label>{{$msg('profile_favart')}}</label>

                    <ul class="profile__checkboxes">
                        <li>
                            <input id="profile_nofavart" type="radio" v-model="hasfavart" value="no" />
                            <label for="profile_nofavart">{{$msg('profile_no')}}</label>
                        </li>

                        <li>
                            <input id="profile_hasfavart" type="radio" v-model="hasfavart" value="yes" />
                            <label for="profile_hasfavart">{{$msg('profile_yesspec')}}</label>
                        </li>
                    </ul>

                    <li v-show="hasfavart === 'yes'">
                        <input v-model="favart" class="profile__input" />
                    </li>
                </li>

                <li>
                    <label>{{$msg('profile_favgenres')}}</label>
                    <input v-model="favgenres" class="profile__input" />
                </li>

                <li>
                    <el-button
                        v-bind:text="$msg('profile_nextstep')"
                        v-on:click="nextPage"></el-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ElButton from './el-button.vue';

    export default {
        components : {
            ElButton
        },

        data() {
            return {
                age : null,
                favart : null,
                favgenres : null,
                gender : null,
                hasfavart : null,
                location : null,
            }
        },

        methods : {
            nextPage() {

            }
        }
    }
</script>