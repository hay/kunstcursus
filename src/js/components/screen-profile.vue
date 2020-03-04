<template>
    <div class="screen screen--text">
        <div v-show="page === 1"
             class="profile">
            <h2 class="profile__header">
                {{$msg('profile_header')}}
            </h2>

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

                    <input v-show="hasfavart === 'yes'" v-model="favart" class="profile__input" />
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

        <div v-show="page === 2"
             class="profile">
            <h2 class="profile__header">
                {{$msg('profile_header')}}
            </h2>

            <p class="profile__intro">{{$msg('profile_statements')}}</p>

            <ul class="profile__toggles">
                <li
                    class="profile__toggle"
                    v-for="stat in statements">
                    <span class="profile__toggle-label"
                          v-on:click="stat.value = stat.states[0]">{{stat.label1}}</span>

                    <el-toggle
                        v-bind:states="stat.states"
                        v-model="stat.value"></el-toggle>

                    <span class="profile__toggle-label"
                          v-on:click="stat.value = stat.states[1]">{{stat.label2}}</span>
                </li>
            </ul>

            <el-button
                v-bind:text="$msg('profile_nextstep')"
                v-on:click="nextPage"></el-button>
        </div>
    </div>
</template>

<script>
    import ElButton from './el-button.vue';
    import ElToggle from './el-toggle.vue';
    import { STATEMENTS } from '../const.js';

    export default {
        components : {
            ElButton, ElToggle
        },

        computed : {
            profile() {
                const statements = this.statements.map((stat) => {
                    return [stat.statement, stat.value];
                });

                return {
                    age : this.age,
                    favart : this.favart,
                    favgenres : this.favgenres,
                    gender : this.gender,
                    hasfavart : this.hasfavart,
                    location : this.location,
                    statements : statements
                };
            }
        },

        data() {
            return {
                age : null,
                favart : null,
                favgenres : null,
                gender : null,
                hasfavart : null,
                location : null,
                page : 1,
                statements : STATEMENTS.map((stat) => {
                    const state1 = `${stat}1`;
                    const state2 = `${stat}2`;

                    return {
                        statement : stat,
                        states : [state1, state2],
                        label1 : this.$msg('profile_' + state1),
                        label2 : this.$msg('profile_' + state2),
                        value : null
                    };
                })
            }
        },

        methods : {
            nextPage() {
                if (this.page === 1) {
                    window.scrollTo(0, 0);
                    this.page = 2;
                } else {
                    // Send profile to analytics
                    this.$store.commit('screen', 'overview');
                }
            }
        }
    }
</script>