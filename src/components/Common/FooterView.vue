<template>
    <div>
        <div class="footer col-md-12">
            <div class="col-md-4 text-center">
                <h5>
                    Follow us on
                    <a href="https://www.facebook.com/" target="_blank">
                        <i class="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
                    </a>
                    <a href="https://twitter.com/" target="_blank">
                        <i class="fa fa-twitter-square fa-2x" aria-hidden="true"></i>
                    </a>
                </h5>
            </div>
            <div class="col-md-4 text-center">
                <h5>
                    Servise number
                    <span class="phone-number">
                            +886-1-2345-6789
                    </span>
                </h5>
            </div>
            <div class="col-md-4 text-center">
                <h5>
                    © 2021 Nature Space
                </h5>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FooterView"
    }
</script>

<style scoped>
    .footer{
        background: #E3E3E3;
        padding:    2em;
    }
    h5{
        color:          #B2B2B2;
        letter-spacing: 2px;
    }
    .phone-number{
        color:  #858585;
        margin: 0 1em;
    }
    .fa-2x{
        margin: -8px 8px;
        vertical-align: text-top;
    }
    a{
        color: #858585!important;
    }
    a:hover{
        opacity: 0.7!important;
    }
</style>