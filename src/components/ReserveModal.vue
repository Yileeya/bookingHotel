<template>
    <modal v-model="showModal"
           @show="onShowModal"
           @hide="onHideModal"
           :footer="false"
           :backdrop="true">
        <div slot="default">
            <h2 class="text-center">
                <i class="fa fa-calendar-check-o fa-3x" aria-hidden="true"></i>
            </h2>
            <h2 class="text-center">Thank you for reserve!</h2>
            <h4 class="text-center">
                Please pay attention to the SMS, and show this on the day of check-in.<br>
                If you have not received the text message, please call us to confirm,<br> thank you.
            </h4>
        </div>
    </modal>
</template>

<script>
    export default {
        name: "ReserveModal",
        props: {
            value: Boolean
        },
        watch: {
            value(newVal) {
                this.showModal = newVal;
            }
        },
        data() {
            return {
                showModal: this.value
            }
        },
        methods: {
            async onShowModal() {

            },
            onHideModal() {
                this.$emit('input', false);
            }
        }
    }
</script>

<style scoped>
    h2{
        color:          #D1B7A6;
        letter-spacing: 1px;
    }
    h4{
        font-size: 16px;
        padding:   1em 2em;
        color:     #B2B2B2;
    }
</style>