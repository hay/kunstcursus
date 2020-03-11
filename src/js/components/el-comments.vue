<template>
    <el-message
        v-bind:visible="visible"
        v-bind:text="text">
        <ul class="el-message__list">
            <li>
                <strong>Sarie, 25 jaar</strong>
                <p>Zij hoort het druppelen van water in de douche, en dit denk ik door het kleurgebruik en de naakte dame. Ze lijkt me een beetje naar beneden te kijken, dus het doucheputje. Ze ruikt algemene geur van de badkamer, volgens mij heeft ze nog geen shampoo gebruikt.</p>
            </li>

            <li>
                <strong>Daniël, 21 jaar</strong>
                <p>Naar mijn mening gaat dit werk over een liefdesbreuk of een ander droevig verhaal. Ze kijkt echt naar beneden om niet haar verdrietige gezicht te laten zien. Ook de harde lijnen en donkere kleuren symboliseren dit. Ze kijkt naar haar handen. Ze ruikt bloemen, want die zijn zwart door alle spijt.</p>
            </li>

            <li>
                <strong>Sasha, 34 jaar</strong>
                <p>De vrouw is aan het werken met haar handen, hier hoort ze de geluiden van. Ze ziet een vreemdeling voorbij lopen. Ze ruikt het houten gereedschap wat ze gebruikt en misschien wat zweet.</p>
            </li>
        </ul>

        <el-button
            v-on:click="click"
            align="center"
            v-bind:text="button"></el-button>
    </el-message>
</template>

<script>
    import ElMessage from './el-message.vue';

    export default {
        components : { ElMessage },

        extends : ElMessage,

        methods : {
            click() {
                this.$emit('click');
            }
        },

        props : {
            button : {
                type : String,
            }
        }
    }
</script>