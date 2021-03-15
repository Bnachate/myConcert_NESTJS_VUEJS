<template>
    <div class="cart" style="margin:0 auto 0 auto;width:80%;margin: 0 auto 0 auto">
        <h1 style="margin:45px auto 25px auto;">Verify</h1>
        <form @submit.prevent="">
            <v-card v-for="item in cart" :key="item._id" class="d-flex flex-columns">
                <v-container>
                    <v-label>Concert:</v-label>
                    <v-card-title>{{ item.title }}</v-card-title>
                </v-container>
                <v-container>
                    <v-label>Location:</v-label>
                    <v-card-title>{{ item.location }}</v-card-title>
                </v-container>
                <v-spacer></v-spacer>
                <v-container>
                    <v-label>At the date:</v-label>
                    <v-card-title>{{ cartDate[item._id]}}</v-card-title>
                </v-container>
                <v-container>
                    <v-label>Number of tickets:</v-label>
                    <v-card-title>{{ cartPrice[item._id]}}</v-card-title>
                </v-container>
                <v-container>
                    <v-label>Price:</v-label>
                    <v-card-title>{{ Number(item.price) * Number(cartPrice[item._id])}}€</v-card-title>
                </v-container>
            </v-card>
            <v-btn
                @click="confirm"
                color="primary"
                style="margin: 45px auto 45px auto; float:right;"
            >
                Proceed to payment
            </v-btn>
            <v-btn
                @click="goBack"
                color="primary"
                style="margin: 45px auto 45px auto; float:left;"
            >
                Back to cart
            </v-btn>
        </form>
    </div>
</template>
<script>
import { server } from "./../helper";
import axios from "axios";
export default {
    props: ['cartDate', 'cartPrice'],
    data() {
        return {
            user: {},
            cart: [],
        }
    },
    async created() {
        await this.getUser();
        await this.getReservations();
    },
    methods: {
        async getUser() {
            await axios
                .get(`${server.baseURL}/user/users`)
                .then( data => {
                if(this.$store.state.isLogin == true) {
                    data.data.forEach(u => { 
                        if(u.email == this.$store.state.Storageuser) {
                            this.user = u;
                        }
                    })
                }
            });
        },
        async getReservations() {
            await axios
                .get(`${server.baseURL}/concert/concerts`)
                .then( data => {
                    this.user.reservation.forEach(resa => {
                        data.data.forEach(concert => {
                            if (concert._id == resa) {
                                this.cart.push(concert);
                            } 
                        })
                    })
                })
        },
        confirm() {
            this.$router.push('/confirmation')
        },
        goBack() {
            this.$router.push('/reservations')
        }
    }
}
</script>