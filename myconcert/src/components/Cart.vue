<template>
    <div class="cart" style="margin:0 auto 0 auto;width:80%;margin: 0 auto 0 auto">
        <h1 style="margin:45px auto 25px auto;">Reservations</h1>
    <v-alert color="red" v-show="error" icon="close" v-on:click="error_close">
      Please select a date and a quantity of ticket(s) for your concert(s)
    </v-alert>
        <form @submit.prevent="">
            <v-card v-for="item in cart" :key="item._id" class="d-flex flex-columns">
                <v-container>
                    <v-card-title>{{ item.title }}</v-card-title>
                    <v-card-text>{{ item.description }}</v-card-text>
                </v-container>
                <v-spacer></v-spacer>
                <v-container>
                    <v-card-title>{{ item.price }}€</v-card-title>
                </v-container>
                <v-container>
                    <v-label>Select your date:</v-label>
                    <v-select :items="item.date" :value="item.date[0]" v-model="date[item._id]"></v-select>
                </v-container>
                <v-container>
                    <v-label>Select a quantity:</v-label>
                    <v-select :items="quantity" :value="quantity[0]" v-model="computedPrice[item._id]"></v-select>
                </v-container>
                <v-card-actions style="font-size=50px">
                    <v-btn
                    text
                    plain
                    @click="deleteItem(item._id)"
                    >
                    X
                    </v-btn>
                </v-card-actions>
            </v-card>
            <v-btn
                @click="submitCart"
                color="primary"
                style="margin: 45px auto 45px auto; float:right;"
            >
                Continue to payment
            </v-btn>
        </form>
    </div>
</template>
<script>
import { server } from "./../helper";
import axios from "axios";
export default {
    data() {
        return {
            user: {},
            cart: [],
            quantity: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            date: {},
            computedPrice: {},
            error: false,
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
                    console.log(this.$store.state.Storageuser)
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
        async deleteItem(id) {
            var objectToRemove;

            const indexUser = this.user.reservation.indexOf(id);
            this.user.reservation.splice(indexUser, 1);

            await axios
                .put(
                    `${server.baseURL}/user/update?userID=${this.user._id}`,
                    this.user
                )
            
            this.cart.forEach(item => {
                if(item._id == id) {
                    objectToRemove = item;
                }
            });
            const index = this.cart.indexOf(objectToRemove);
            this.cart.splice(index, 1);
        },
        submitCart() {
            var data = {
                date: this.date,
                computedPrice: this.computedPrice
            }
            if (Object.keys(this.date).length == this.cart.length && Object.keys(this.computedPrice).length == this.cart.length) {
                this.$emit('cartData', data);
                this.$router.push('check');
            } else {
                this.error = true;
            }
        },
        error_close() {
            this.error = false;
        },
    }
}
</script>
<style scoped>

</style>
