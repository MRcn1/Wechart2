<template>
    <div class="receive">
        <div class="box1" v-if="type==1">
            <div :class="keyboardshow?'box1Inputmartop':'box1Input'">
                <div class="input" @click="keyboardshow = true"></div>
                <i v-if="phone" class="icon2" @click="keyboardshow = true">{{phone}}</i>
                <i v-else class="icon2" @click="keyboardshow = true">{{phonetxt}}</i>
                <i v-if="phone" @click="rest" class="icon"></i>
                <button @click="findVipSatae" class="btn">领取优惠券</button>
            </div>
            <!-- <van-number-keyboard :show="keyboardshow" extra-key="." close-button-text="完成" @blur="keyboardshow = false"
                @input="onInput" @delete="onDelete" /> -->

            <van-number-keyboard :show="keyboardshow" theme="custom" extra-key="-" close-button-text="完成" @blur="keyboardshowblur"
                @input="onInput" @delete="onDelete" />
        </div>

        <div class="box2" v-if="type==2">
            <div class="box2-txt">
                <span>成功领取优惠券1张</span>
            </div>
            <div class="box2-one">
                <div class="price">￥{{data.discountContentTypeAmount}}</div>
                <div class="use">满{{data.useCondition}}元可用</div>
            </div>
            <div class="box2-two">
                <div class="price">{{data.useProductScope==1?"全场通用":"指定商品"}}</div>
                <div class="use">{{data.startDeadlineDate.substr(0, 10)}}-{{data.endDeadlineDate.substr(0, 10)}}</div>
            </div>
            <div class="box2-three">
                <button class="btn" @click="use">去使用</button>
                <div class="txt">该券已放入你的账户{{phone}}</div>
            </div>
        </div>

        <div class="box3" v-if="type==3">
            <div class="box3-one">
                <img src="../../assets/fal_03.png" alt="">
            </div>
            <div class="box3-two">
                <div class="price">{{msg}}</div>
            </div>
            <div class="box3-three">
            </div>
        </div>

        <div class="modal" v-if="show">
            <div class="box4">
                <img @click="close" class="img" src="../../assets/denglu_07.png" alt="">
                <img class="img2" src="../../assets/gh_3d995e9e6cdc_258.jpg" alt="">
                <div class="txt">长按识别小程序码</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                phone: '',
                phonetxt: '请输入手机号',
                type: 1,
                msg: '',
                data: "",
                id: '',
                keyboardshow: false,
            }
        },
        components: {

        },
        created() {
            this.id = this.$route.query.id
        },
        methods: {
            onInput(value) {
                this.phone = this.phone + value
            },
            onDelete() {
                this.phone = this.phone.substr(0, this.phone.length - 1)
            },
            use() {
                this.show = true
            },
            close() {
                this.show = false
            },
            rest() {
                this.phone = ''
            },
            keyboardshowblur(){
                this.keyboardshow = false
            },
            findVipSatae() {
                if (this.phone == '') {
                    this.$toast('手机号不能为空')
                    return
                }
                if (!(/^[1][3,4,5,7,8][0-9]{9}$/).test(this.phone)) {
                    this.$toast('请输入正确的手机号')
                    return
                }
                let that = this
                let obj = {
                    url: "/lastmiles-coffee-admin-api/discountCoupon/getDiscountCouponByLink",
                    data: {
                        id: this.id,
                        phone: this.phone
                    },
                    success: function (data) {
                        if (data.data.code == 0) {
                            that.type = 2
                            that.data = data.data.data
                        } else {
                            that.type = 3
                        }
                    },
                    fail: function (msg) {
                        that.type = 3
                        that.msg = msg
                    }
                };
                this.$store.commit("getData", obj);
            },
        },
    }
</script>

<style scoped lang='scss'>
    .receive {
        height: 100%;
        position: relative;
    }

    .box1 {
        width: 100%;
        height: 100%;
        background-image: url('../../assets/quan_bg_02.png');
        background-size: 100% 100%;
        overflow: hidden;

        .box1Inputmartop {
            width: 300px;
            height: 280px;
            margin: 0 auto;
            margin-top: 295px;
            position: relative;
            overflow: hidden;

            .input {
                width: 100%;
                height: 45px;
                border-radius: 5px;
                text-align: center;
                border: transparent;
                position: relative;
                background-color: #fff;
            }

            .btn {
                width: 100%;
                height: 45px;
                border-radius: 5px;
                border: transparent;
                margin-top: 20px;
                background-color: #f9be32;
                color: #fff;
            }

            .icon {
                width: 15px;
                height: 15px;
                position: absolute;
                right: 5px;
                top: 13px;
                background-image: url('../../assets/denglu_07.png');
                background-size: 100% 100%;
            }

            .icon2 {
                width: 100%;
                height: 25px;
                position: absolute;
                top: 10px;
                text-align: center;
                overflow: hidden;
                line-height: 25px;
            }
        }

        .box1Input {
            width: 300px;
            height: 280px;
            margin: 0 auto;
            margin-top: 330px;
            position: relative;
            overflow: hidden;

            .input {
                width: 100%;
                height: 45px;
                border-radius: 5px;
                text-align: center;
                border: transparent;
                position: relative;
                background-color: #fff;
            }

            .btn {
                width: 100%;
                height: 45px;
                border-radius: 5px;
                border: transparent;
                margin-top: 20px;
                background-color: #f9be32;
                color: #fff;
            }

            .icon {
                width: 15px;
                height: 15px;
                position: absolute;
                right: 5px;
                top: 13px;
                background-image: url('../../assets/denglu_07.png');
                background-size: 100% 100%;
            }

            .icon2 {
                width: 100%;
                height: 25px;
                position: absolute;
                top: 10px;
                text-align: center;
                overflow: hidden;
                line-height: 25px;
            }
        }
    }

    .box2 {
        width: 100%;
        height: 100%;
        background-image: url('../../assets/succ_bg_02.png');
        background-size: 100% 100%;
        overflow: hidden;

        .box2-txt {
            text-align: center;
            margin-top: 138px;
            color: #ffffff;
        }

        .box2-one {
            width: 100%;
            height: 50px;
            text-align: center;
            margin-top: 20px;

            .price {
                font-size: 36px;
                color: #fc564a;
            }

            use {
                color: #333333;
                font-size: 22px;
            }
        }

        .box2-two {
            width: 100%;
            height: 40px;
            text-align: center;
            margin-top: 45px;
        }

        .box2-three {
            margin: 0 auto;
            margin-top: 70px;
            width: 70%;
            height: 90px;

            .btn {
                width: 100%;
                height: 40px;
                border-radius: 5px;
                border: transparent;
                background-color: #f9be32;
                color: #fff;
                margin: 5px 0
            }

            .btn2 {
                background-color: #98b920;
            }

            .txt {
                text-align: center;
                margin-top: 10px;
                color: #fff;
                font-size: 11px;
            }
        }
    }

    .box3 {
        width: 100%;
        height: 100%;
        background-image: url('../../assets/succ_bg_02.png');
        background-size: 100% 100%;
        overflow: hidden;

        .box3-one {
            width: 100%;
            height: 70px;
            text-align: center;
            margin-top: 180px;

            .price {
                font-size: 36px;
                color: #fc564a;
            }

            use {
                color: #333333;
                font-size: 22px;
            }

            img {
                width: 70px;
            }
        }

        .box3-two {
            width: 100%;
            height: 10px;
            text-align: center;
            margin-top: 40px;
        }

        .box3-three {
            margin: 0 auto;
            margin-top: 18%;
            width: 70%;
            height: 20px;

            .btn {
                width: 100%;
                height: 45%;
                border-radius: 5px;
                border: transparent;
                background-color: #f9be32;
                color: #fff;
            }
        }
    }

    .box4 {
        position: absolute;
        width: 80%;
        height: 65%;
        background-color: #fff;
        top: 12%;
        left: 10%;

        .img {
            width: 7%;
            height: 5%;
            position: absolute;
            right: 7%;
            top: 4%;
        }

        .img2 {
            width: 80%;
            height: 52%;
            position: absolute;
            top: 19%;
            left: 11%;
        }

        .txt {
            text-align: center;
            margin-top: 113%;
        }
    }

    .modal {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>