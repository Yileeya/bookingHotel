<template>
    <div>
        <div class="jumbotron text-center">
            <h1>FARAWAY</h1>
            <h2 class="sub-title">FROM THE NOISY CITY</h2>
        </div>
        <template>
            <div class="row about" id="About">
                <div class="col-md-5 text-center">
                    <img class="img-responsive" src="https://images.pexels.com/photos/1809344/pexels-photo-1809344.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500">
                </div>
                <div class="col-md-7">
                    <h2>About us</h2>
                    <div class="about-us-content">
                        <h4>
                            A wonderful vacation on dream. <br>
                            The beach with the breeze, enjoying the sunset in summer, and bathing the stars at midnight.<br>
                            What an amazing thing when you wake up in the morning with the view formed the sky, the mountains and the ocean in front of you.<br>
                            You can totally relax yourself with the bright and tidy room, the astonishing scene, and our sweet service.
                            <br>
                            Faraway from the noist city right now.
                        </h4>
                    </div>
                </div>
            </div>
        </template>
        <template>
            <div class="row rooms" id="Rooms">
                <div class="col-md-4 room-introduction-content">
                    <h2>Rooms</h2>
                    <h4>
                        We have six kind of rooms. <br>
                        You can’t keep your eyes away from the windows with the blue sky, the wide ocean or the vast sky full of stars.
                        <br>
                        Living in the corner without the noise and having a relaxed vocation are the most important things why you come here.
                    </h4>
                </div>
                <div class="col-md-8 room-introduction-img">
                    <div class="col-md-4 room-introduction" v-for="item in rooms" :key="item.id">
                        <router-link :to="`/rooms/${ eliminateBlanks(item.name) }`">
                            <img :src="item.imageUrl" class="img-responsive">
                            <h3 @click="emitRoomId(item.id)" class="text-center room-name">{{ item.name }}</h3>
                        </router-link>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapGetters} from 'vuex';

    export default {
        name: "HomePage",
        computed: {
            ...mapGetters(['AJAXConfig', 'isLoading', 'navTitle'])
        },
        data() {
            return {
                rooms: []
            }
        },
        watch: {
            navTitle(newVal) {
                this.scrollNavTitleArea(newVal);
            },
            isLoading(newVal) {
                if(newVal === false && this.navTitle) {
                    this.scrollNavTitleArea(this.navTitle);
                }
            }
        },
        created() {
            this.getRooms();
        },
        methods: {
            async getRooms() {
                this.$store.commit('LOADING', true);
                const Url = `https://challenge.thef2e.com/api/thef2e2019/stage6/rooms`;
                let res = await axios.get(Url, this.AJAXConfig);
                res = res.data;
                if(res.success === true) {
                    this.rooms = res.items;
                    this.$store.commit('LOADING', false);
                }
            },
            eliminateBlanks(data) {
                let result;
                result = data.replace(/(^\s )|(\s $)/g, "");
                return result.replace(/\s/g, "");
            },
            emitRoomId(roomId) {
                this.$store.commit('ROOMID', roomId);
            },
            scrollNavTitleArea(title) {
                let scrollDiv = document.getElementById(title).offsetTop - 50;
                window.scrollTo({top: scrollDiv, behavior: 'smooth'});
            }
        }
    }
</script>

<style scoped lang="scss">
    .jumbotron{
        background:          url(https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80);
        background-size:     cover;
        height:              25vh;
        background-position: center;
        color:               #858585;
        margin-top:          50px;
        min-height:          400px;
        display:             flex;
        flex-direction:      column;
        justify-content:     space-evenly;
        align-items:         center;
        h2{
            color:           #eee !important;
            padding:         5px 15px;
            text-decoration: none;
        }
    }
    h1{
        background:     rgba(0, 0, 0, 0.1);
        color:          white !important;
        font-style:     italic;
        letter-spacing: 1rem;
        width:          100%;
    }
    h2{
        letter-spacing:        2px;
        font-style:            italic;
        background:            rgba(0, 0, 0, 0.1);
        font-size:             28px;
        display:               inline-block;
        color:                 white !important;
        padding:               10px 2em 10px 1em;
        text-decoration:       underline;
        text-underline-offset: 2px;
    }
    h4{
        color:       #B2B2B2;
        line-height: 2em;
        font-family: Palatino;
    }
    .about{
        min-height:  calc(100vh - 200px);
        display:     flex;
        align-items: center;
    }
    .img-responsive{
        margin-top: 3em;
        display:    initial;
    }
    .rooms{
        margin-top: 5em;
        background: #F0ECE9;
        .room-introduction-img, .room-introduction-content{
            padding: 3em;
            .col-md-4{
                padding: 0;
            }
        }
        .room-introduction{
            height:   250px;
            overflow: hidden;
        }
        .room-introduction:hover{
            img{
                transform:  scale(1.3);
                transition: 0.5s;
            }
        }
        .img-responsive{
            margin: initial;
            height: 100%;
            width:  100%;
        }
        .room-name{
            color:      white;
            padding:    110px 0;
            background: #86766B66;
            height:     100%;
            cursor:     pointer;
            width:      100%;
            position:   absolute;
            top:        0;
        }
        .room-name:hover{
            background: rgba(227, 227, 227, 0.6);
            color:      #858585;
            font-size:  30px;
            transition: 0.5s;
        }
        h3{
            margin: 0;
        }
    }
    @media (max-width: 768px){
        .about, .rooms{
            flex-direction: column;
            padding:        0 5%;
            .room-introduction-img, .room-introduction-content{
                padding: 15px;
            }
        }
    }
</style>