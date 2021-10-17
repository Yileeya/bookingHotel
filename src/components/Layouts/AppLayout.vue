<template>
    <div class="row">
        <div class="col-md-12">
            <loading-view v-if="isLoading"/>
            <header-view/>
            <router-view></router-view>
            <footer-view/>
        </div>
    </div>
</template>

<script>
    import HeaderView from '@/components/Common/HeaderView';
    import FooterView from '@/components/Common/FooterView';
    import {mapGetters} from 'vuex';
    import LoadingView from '@/components/Common/LoadingView';

    export default {
        name: "AppLayout",
        components: {LoadingView, HeaderView, FooterView},
        computed: {
            ...mapGetters(['isLoading']),
        },
    }
</script>

<style lang="scss" scoped>
    .col-md-12{
        padding: 0;
    }
</style>
