<template>
    <div v-if="!isLoading">
        <section class="row intro-row">
            <div class="col-md-6">
                <CoolLightBox
                        :items="room.imageUrl"
                        :index="index"
                        @close="index = null">
                </CoolLightBox>
                <div class="room-pic"
                     v-for="(image, imageIndex) in room.imageUrl"
                     :key="imageIndex"
                     @click="index = imageIndex"
                     :class="setRoomPic(imageIndex)"
                     :style="{ background: 'url(' + image + ')' }">
                    <div class="room-img-hover"></div>
                </div>
            </div>
            <div class="col-md-6 room-intro" style="padding-right:3em">
                <template>
                    <h2>{{room.name}}</h2>
                    <h5>
                        {{room.description}}
                    </h5>
                </template>
                <hr>
                <template>
                    <div style="margin: 2em 0;">
                        <h4>Price(From Mon to Thu): <span>NT$ {{room.normalDayPrice}}</span></h4>
                        <h4>Price for weekend(From Fri to Sun): <span>NT$ {{room.holidayPrice}}</span></h4>
                    </div>
                    <div v-if="room.checkInAndOut">
                        <h4>checkIn time：
                            <span>{{ room.checkInAndOut.checkInEarly }}</span> ~ {{room.checkInAndOut.checkInLate}}</h4>
                        <h4>checkOut time： before {{room.checkInAndOut.checkOut}}</h4>
                    </div>
                </template>
            </div>
        </section>
        <section class="row detail-row">
            <div class="col-md-6">
                <h3 style="color: #B2B2B2;margin-bottom: 1em;">Detail Information</h3>
                <section v-if="room.descriptionShort">
                    <h4>
                        <i class="fa fa-male" aria-hidden="true"></i>
                        Person： {{room.descriptionShort.GuestMin}} ~ {{room.descriptionShort.GuestMax}}
                    </h4>
                    <h4>
                        <i class="fa fa-bed" aria-hidden="true"></i>
                        Bed： {{room.descriptionShort.Bed[0]}}
                    </h4>
                    <h4>
                        <i class="fa fa-bath" aria-hidden="true"></i>
                        Bathroom：{{room.descriptionShort['Private-Bath']}}
                    </h4>
                    <h4>
                        <i class="fa fa-home" aria-hidden="true"></i>
                        Room size： {{room.descriptionShort.Footage}} square meter
                    </h4>
                </section>
                <hr>
                <section class="amenities" v-if="room.amenities">
                    <h5 class="col-md-3" :class="this.setClass(room.amenities['Wi-Fi'])">
                        <i class="fa fa-wifi" aria-hidden="true"></i> Wifi
                    </h5>
                    <h5 class="col-md-3" :class="this.setClass(room.amenities['Breakfast'])">
                        <i class="fa fa-cutlery" aria-hidden="true"></i> Breakfast
                    </h5>
                    <h5 class="col-md-3" :class="this.setClass(room.amenities['Mini-Bar'])">
                        <i class="fa fa-coffee" aria-hidden="true"></i> Minibar
                    </h5>
                    <h5 class="col-md-3" :class="this.setClass(room.amenities.Television)">
                        <i class="fa fa-phone" aria-hidden="true"></i> Telephone
                    </h5>
                    <h5 class="col-md-3" :class="this.setClass(room.amenities['Air-Conditioner'])">
                        <i class="fa fa-snowflake-o" aria-hidden="true"></i> Air condition
                    </h5>
                    <h5 class="col-md-3" :class="this.setClass(room.amenities.Refrigerator)">
                        <i class="fa fa-thermometer" aria-hidden="true"></i> Refrigerator
                    </h5>
                    <h5 class="col-md-3" :class="this.setClass(room.amenities.Sofa)">
                        <i class="fa fa-cube" aria-hidden="true"></i> Sofa
                    </h5>
                    <h5 class="col-md-3" :class="this.setClass(room.amenities['Great-View'])">
                        <i class="fa fa-picture-o" aria-hidden="true"></i> Great view
                    </h5>
                    <h5 class="col-md-3" :class="this.setClass(room.amenities['Smoke-Free'])">
                        <i class="fa fa-envira" aria-hidden="true"></i> No-smoking
                    </h5>
                    <h5 class="col-md-3" :class="this.setClass(room.amenities['Child-Friendly'])">
                        <i class="fa fa-futbol-o" aria-hidden="true"></i> For kid
                    </h5>
                    <h5 class="col-md-3" :class="this.setClass(room.amenities['Pet-Friendly'])">
                        <i class="fa fa-heart" aria-hidden="true"></i> For pet
                    </h5>
                </section>
            </div>
            <div class="col-md-6 reserve-info">
                <section>
                    <h3>Reserve Information</h3>
                    <div>
                        <input v-model="reserveForm.name" class="form-control" placeholder="Name" :style="errorMessage && !reserveForm.name ? 'border-color :#DF8080': null">
                    </div>
                    <div>
                        <input v-model="reserveForm.tel" class="form-control" placeholder="Phone number" :style="errorMessage && !reserveForm.tel ? 'border-color :#DF8080': null">
                    </div>
                    <div :style="errorMessage && reserveForm.dayRange.length === 0 ? 'border:2px solid #DF8080': null">
                        <hotel-date-picker
                                ref="DatePicker"
                                :showYear="true"
                                :lastDateAvailable="new Date(new Date().getFullYear(), new Date().getMonth() + 3)"
                                clickOutsideElementId="clickOutsideElement"
                                :disabledDates="dynamicDisabledDates"
                                :format="dateFormat"
                                :endDate="new Date().setDate(new Date().getDate()+90)"
                                @check-in-changed="checkInChanged($event)"
                                @check-out-changed="checkOutChanged($event)"
                        />
                    </div>
                    <div v-if="normalDays || holidayDays" style="margin-top: 1em">
                        <h4 class="col-md-4">Total</h4>
                        <h4 class="col-md-8 text-right">
                            <span v-if="normalDays">NT$ {{ toCurrency(room.normalDayPrice) }} × {{ normalDays }}</span>
                            <span v-if="normalDays && holidayDays"> ＋ </span>
                            <span v-if="holidayDays">NT$ {{ toCurrency(room.holidayPrice) }} × {{ holidayDays }}</span>
                        </h4>
                        <hr class="col-md-12" style="width: 95%;">
                        <h2 class="col-md-12 text-right">
                            NT$ {{ toCurrency((room.holidayPrice) * holidayDays + (room.normalDayPrice) * normalDays) }}
                        </h2>
                    </div>
                    <button v-if="modal.reserve === false" class="col-md-12 send-btn" @click="sendReservation" :disabled="sending">{{ errorMessage ? 'Try again' : 'Send my Reservation' }}</button>
                    <button v-if="modal.reserve === true" class="col-md-12 send-btn btn-success" disabled>Success</button>
                    <div class="col-md-12 error-message" v-if="errorMessage">
                        {{ errorMessage }}
                    </div>
                </section>
            </div>
        </section>
        <div class="col-md-12 slogan-background" style="margin-top: 3em">
            <h2 class="text-center"><i>Faraway from the noisy city right now.</i></h2>
        </div>
        <reserve-modal v-model="modal.show"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import axios from 'axios';
    import HotelDatePicker from 'vue-hotel-datepicker2'
    import 'vue-hotel-datepicker2/dist/vueHotelDatepicker2.css';
    import moment from 'moment';
    import ReserveModal from '@/components/ReserveModal';

    export default {
        name: "RoomPage",
        computed: {
            ...mapGetters(['RoomId', 'AJAXConfig', 'isLoading']),
            dateFormat() {
                return "YYYY/MM/DD";
            }
        },
        components: {
            ReserveModal,
            HotelDatePicker
        },
        data() {
            return {
                room: {},
                index: null,
                dynamicDisabledDates: [],
                reserveForm: {
                    startTime: null,
                    endTime: null,
                    dayRange: [],
                    name: '',
                    tel: ''
                },
                holidayDays: 0,
                normalDays: 0,
                errorMessage: '',
                sending: false,
                modal: {
                    show: false,
                    reserve: false
                }
            }
        },
        watch: {
            'reserveForm.startTime'() {
                this.reserveForm.dayRange = [];
                this.holidayDays = 0;
                this.normalDays = 0;
                this.modal.reserve = false;
            },
            'modal.show'(newVal) {
                if(newVal === false) {
                    this.modal.reserve = true;
                }
            }
        },
        created() {
            if(!this.RoomId) {
                this.$router.push('/');
            } else {
                this.getSingleRoom();
            }
        },
        methods: {
            async getSingleRoom() {
                this.$store.commit('LOADING', true);
                const Url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${this.RoomId}`;
                let res = await axios.get(Url, this.AJAXConfig);
                res = res.data;
                if(res.success === true) {
                    this.room = res.room[0];
                    this.dynamicDisabledDates = res.booking.map(element => {
                        return element.date;
                    });
                    this.$store.commit('LOADING', false);
                }
            },
            setClass(data) {
                if(data === false)
                    return 'disable'
            },
            setRoomPic(index) {
                if(index === 0)
                    return 'img-first'
                else
                    return 'img-half'
            },
            checkInChanged(event) {
                this.reserveForm.startTime = moment(event).format('YYYY-MM-DD');
            },
            checkOutChanged(event) {
                this.reserveForm.endTime = moment(event).format('YYYY-MM-DD');
                this.dateInterval()
            },
            dateInterval() {
                const
                    Moment = require("moment"),
                    MomentRange = require("moment-range"),
                    moment = MomentRange.extendMoment(Moment); /*add plugin to moment instance*/
                let
                    range = moment().range(this.reserveForm.startTime, this.reserveForm.endTime), /*can handle leap year*/
                    array = Array.from(range.by("days")); /*days, hours, years, etc.*/
                array.map(m => {
                    this.reserveForm.dayRange.push(m.format("YYYY-MM-DD"))
                });
                this.computeTotalPrice();
            },
            computeTotalPrice() {
                this.reserveForm.dayRange.pop();
                this.reserveForm.dayRange.forEach(element => {
                    let weekDay = new Date(element).getDay();
                    if(weekDay === 5 || weekDay === 6 || weekDay === 0)
                        this.holidayDays += 1;
                    else
                        this.normalDays += 1;
                });
            },
            toCurrency(num) {
                let parts = num.toString().split('.');
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return parts.join('.');
            },
            async sendReservation() {
                if(this.reserveForm.startTime == null || this.reserveForm.endTime == null || this.reserveForm.dayRange.length === 0 || !this.reserveForm.name || !this.reserveForm.tel) {
                    this.errorMessage = 'Please check the fields'
                    return
                }
                try {
                    this.sending = true;
                    this.errorMessage = '';
                    const Url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${this.RoomId}`;
                    let res = await axios.post(Url, {
                        name: this.reserveForm.name,
                        tel: this.reserveForm.tel,
                        date: this.reserveForm.dayRange
                    }, this.AJAXConfig);
                    res = res.data;

                    this.dynamicDisabledDates = this.dynamicDisabledDates.concat(this.reserveForm.dayRange);
                    this.sending = false;
                    if(res.success === true) {
                        this.modal.show = true;
                    }
                } catch(err) {
                    this.sending = false;
                    this.errorMessage = err.response.data.message;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .intro-row{
        padding:     5em 0;
        display:     flex;
        align-items: center;
        .col-md-6{
            padding: 0 3em;
        }
        .img-first{
            width:  100%;
            height: 380px;
        }
        .img-half{
            width:   30%;
            display: inline-block;
            height:  150px;
            margin:  1em 0.5em 1em 0;
        }
        .room-intro{
            h2{
                text-decoration:       underline;
                font-style:            oblique;
                text-underline-offset: 5px;
            }
            h5{
                line-height:    1.5em;
                padding:        1em 0;
                color:          #B2B2B2;
                letter-spacing: 1px;
                font-size:      18px;
            }
            h4{
                font-size: 20px;
            }
        }
    }
    .detail-row{
        display:         flex;
        justify-content: center;
        align-items:     center;
        margin-bottom:   15px;
        .col-md-6{
            padding: 0 3%;
        }
        .reserve-info{
            background: #F0ECE9;
            padding:    3%;
            width:      45%;
            h3{
                color: #B2B2B2;
            }
        }
        .disable{
            color: #E3E3E3 !important;
        }
        .amenities{
            .col-md-3{
                padding-left: 0;
                color:        #858585;
            }
            hr{
                margin: 1em 0;
            }
        }
    }
    h2{
        color: #858585;
    }
    hr{
        border-top: 2px solid #E3E3E3;
    }
    h4{
        color: #858585;
    }
    .fa{
        width: 2em;
    }
    .slogan-background{
        background:          url(https://images.pexels.com/photos/6077368/pexels-photo-6077368.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1280);
        background-position: bottom;
        height:              400px;
        background-size:     cover;
        padding:             0;
        h2{
            background:      rgba(255, 255, 255, 0.7);
            height:          100%;
            margin:          0;
            font-size:       36px;
            display:         flex;
            align-items:     center;
            justify-content: center;
            letter-spacing:  5px;
        }
    }
    .send-btn{
        border-color:  transparent;
        background:    #D1B7A6;
        color:         white;
        width:         100%;
        font-size:     16px;
        height:        40px;
        margin:        1em 0;
        border-radius: 3px;
    }
    .send-btn:hover{
        background: #AC998D;
    }
    .error-message{
        color: #DF8080;
    }
    @media (max-width: 768px){
        .intro-row{
            flex-direction: column;
            align-items:    stretch;
            .img-first{
                height: 200px;
            }
            .img-half{
                height: 100px;
            }
        }
        .detail-row{
            display:        flex;
            flex-direction: column;
            .col-md-6{
                padding: 0 3em;
            }
            .reserve-info{
                width:  95%;
                margin: 30px;
            }
            .amenities{
                display:   flex;
                flex-wrap: wrap;
            }
        }
    }
</style>