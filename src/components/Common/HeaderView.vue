<template>
    <div class="uiv">
        <navbar fixed-top>
            <a class="navbar-brand" slot="brand" href="https://yileeya.github.io/bookingHotel/#/">
                <i style="font-size: 1.3em;" class="fa fa-leaf" aria-hidden="true"></i>
                <span style="font-size: 1.3em;"><i>Nature Space</i></span>
            </a>
            <template slot="collapse">
                <navbar-nav right class="nav-right">
                    <li><a role="button" @click="setNavTitle('About')">About us</a></li>
                    <li><a role="button" @click="setNavTitle('Rooms')">Rooms</a></li>
<!--                    <li><a role="button" @click="setNavTitle('Contact')">Contact us</a></li>-->
<!--                    <li><a role="button"><i class="fa fa-sign-in" aria-hidden="true"></i></a></li>-->
                </navbar-nav>
            </template>
        </navbar>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "HeaderView",
        computed: {
            ...mapGetters(['navTitle'])
        },
        methods: {
            setNavTitle(title) {
                this.$store.commit('NAVTITLE', title);
                if(this.$route.path !== '/')
                    this.$router.push('/');
            }
        }
    }
</script>

<style scoped lang="scss">
    .navbar-brand{
        color: #D1B7A6 !important;
    }
    .fa-leaf{
        margin: 0 15px;
    }
    .nav-right{
        text-align: center;
        a{
            color: #B2B2B2!important;
            font-size: 1.2em;
        }
    }
    nav{
        margin: initial;
    }
    a:hover{
        color: #858585!important;
    }
</style>