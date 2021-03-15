<template>
    <v-container>
    <Carousel />
    <Searchbar @search="search" @disableSearch="disableSearch"/>
    <v-alert color="red" v-show="error" icon="close" v-on:click="error_close">
      Please login to add your ticket in the basket
    </v-alert>
    <!-----------------------------------CARD CONCERT --------------------------------------->
    <v-container class="d-flex flex-row flex-wrap justify-space-around">
      <v-flex id="filter" xs12 sm12 md3 xl2>
        <Filters @filter="filterConcerts" @disable-filters="disableFilters" />
      </v-flex>
      <v-flex xs12 sm12 md9 xl10 class="flex-row justify-left">
        <v-row v-if="this.hasFiltered == false">
          <v-hover
            v-slot:default="{ hover }"
            v-for="concert in this.$store.state.allConcerts"
            :key="concert._id"
          >
            <v-card
              class="mx-auto my-12"
              max-width="360"
              :elevation="hover ? 16 : 2"
            >
             <div>
                  <v-img
                    @click="details(concert._id)"
                    :src="concert.image_URL"
                    style="height:250px"
                  />
                </div>
              
              <v-container class="d-flex">
                <v-card-title style="font-size:24px;">
                  {{ concert.title }}
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="$store.state.isLogin == true"
                  @click="updateWish(concert._id)"
                  text
                  plain
                  retain-focus-on-click
                  style="margin-top: 15px;"
                > 
                  <img src="../assets/heart_full.png" alt="Add to my wishlist" width="30" height="30" v-if="user.wish.includes(concert._id) == true">
                  <img src="../assets/heart_empty.png" alt="Add to my wishlist" width="30" height="30" v-if="user.wish.includes(concert._id) == false">
                </v-btn>
              </v-container>
              

              <v-card-text style="font-size:18px;">
                <div>{{ concert.description }}</div>
              </v-card-text>
              <v-card-text style="font-size:16px;">
                <div>{{ concert.genre }}</div>
              </v-card-text>
              <v-card-actions class="cart-action">
                <v-card-title style="color:red;font-size:22px;">
                  {{ concert.price }}€
                </v-card-title>
                <!-- ******************** -->
                <v-spacer></v-spacer>
                <!-- ******************** -->

                <v-btn
                 @click="updateReservation(concert._id)"
                  v-if="$store.state.isLogin == true"
                  text
                  class="float-right"
                  style="margin-right: 10px;"
                >
                  <v-icon class="mr-2 mb-1">event</v-icon><span class=" mr-2" style="color: #111">Get Ticket</span>
                </v-btn>
                <v-btn
                  v-if="$store.state.isLogin == false"
                  @click="error_open"
                  text
                  class="float-right"
                  style="margin-right: 10px;"
                >
                  <v-icon class="mr-2 mb-1">event</v-icon><span class=" mr-2" style="color: #111">Get Tickets</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-row>
        <v-container v-if="this.hasFiltered">
          <v-row
            v-if="this.filteredConcerts.length == 0"
            style="margin-bottom:400px"
          >
            <h3 class="mx-auto my-12">
              Sorry, we don't have products that match your filters. Please try
              again.
            </h3>
          </v-row>
          <v-row v-else>
            <!-----------------------------------FILTER CARDS --------------------------------------->
            <v-hover
              v-slot:default="{ hover }"
              v-for="concert in this.filteredConcerts"
              :key="concert._id"
            >
              <v-card
                class="mx-auto my-12 .d-none .d-sm-flex"
                max-width="260"
                :elevation="hover ? 16 : 2"
              >
                <div>
                  <v-img
                    @click="details(concert._id)"
                    :src="concert.image_URL"
                    style="height:180px"
                  />
                </div>

                <v-container class="d-flex">
                  <v-card-title style="font-size:24px;">{{
                    concert.title
                  }}</v-card-title>
                  <v-btn
                    @click="updateWish(concert._id)"
                    v-if="$store.state.isLogin == true"
                    text
                    plain
                    retain-focus-on-click
                    style="margin-top: 15px;"
                  >
                    <img src="../assets/heart_empty.png" alt="Add to my wishlist" width="30" height="30">
                  </v-btn>
                </v-container>

                <v-card-text style="font-size:16px;">
                  <div>{{ concert.description }}</div>
                </v-card-text>
                <v-card-text style="font-size:16px;">
                  <div>{{ concert.genre }}</div>
                </v-card-text>
                <v-card-actions class="cart-action">
                  <v-card-title style="color:red;font-size:22px;">
                    {{ concert.price }}€
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="$store.state.isLogin == true"
                    @click="updateReservation(concert._id)"
                    text
                    class="float-right"
                    style="margin-right: 10px;"
                  >
                    <v-icon class="mr-2 mb-1">event</v-icon><span class=" mr-2" style="color: #111">Get Ticket</span>
                  </v-btn>
                   <v-btn
                      v-if="$store.state.isLogin == false"
                      @click="error_open"
                      text
                      class="float-right"
                      style="margin-right: 10px;"
                    >
                  <v-icon class="mr-2 mb-1">event</v-icon><span class=" mr-2" style="color: #111">Get Tickets</span>
                </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-row>
        </v-container>
      </v-flex>
    </v-container>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
import Carousel from "@/components/Carousel";
import Searchbar from "@/components/Searchbar";
import Filters from "@/components/Filter";
import { server } from "./../helper";
import axios from "axios";
export default {
  components: {Carousel, Searchbar, Filters},
  data() {
    return {
      user: {},
      hasFiltered: false,
      filteredConcerts: [],
      noResult: false,
      error: false
    };
  },
  created() {
    this.fetchUsers();
    this.fetchConcerts();
    this.getUser();
  },
  methods: {
    ...mapActions([
      'fetchUsers',
      'fetchConcerts',
      'updateReservations'
    ]),
    updateReservation(concertID) {

      var concert = this.$store.state.allConcerts.find(concert => concert._id === concertID);
      var user = this.$store.state.allUsers.find(user => user.email === this.$store.state.Storageuser);
      var data = {
        user: user,
        concert: concert
      }
      this.$store.dispatch('updateReservations', data);
    },
    updateWish(concertID) {
      var user = this.$store.state.allUsers.find(user => user.email === this.$store.state.Storageuser);
      const index = user.wish.indexOf(concertID);
      if (index == -1) {
        this.user.wish.push(concertID);
      } else {
        this.user.wish.splice(index, 1);
      }
      var data = {
        user: user,
        concertID: concertID
      }
      this.$store.dispatch('updateWishes', data);
    },
    details: function(index) {
      var concert = this.$store.state.allConcerts.find(
        (concert) => concert._id == index
      );
      localStorage.setItem("concertShow", JSON.stringify(concert));
      this.$router.push({ name: "details" });
    },
    search(results) {
      this.hasFiltered = true;
      if (results.length == 0) {
          this.noResult = true;
          this.filteredConcerts = []
      } else {
        this.filteredConcerts = results
      }
    },
    filterConcerts(data) {
      this.hasFiltered = true;
      this.filteredConcerts = [];
      var filters = Object.values(data);
      console.log(filters);
      if (filters[0] == "" && filters[1] == "") {
        // Aucun filtre n'a été rentré par l'utilisateur
        this.hasFiltered = false;
      } else if (filters[0] !== "" && filters[1] === "") {
        // Seulement la categorie ont été entré par l'utilisateur
        this.filteredConcerts = this.$store.state.allConcerts.filter(
           (concert) => concert.genre == filters[0]
        );
        if (this.filteredConcerts.length == 0) {
          this.noResult = true;
        }
      } else if (filters[0] === "" && filters[1] !== "") {
        // Seulement le prix et le ratings ont été entrés par l'utilisateur
       //filters[1] = filters[1] + '/' + filters[1].subtr(0, 4)
        var filter =  filters[1].substr(5) + '/' + filters[1].substr(0, 4);
        console.log(filter);
        this.$store.state.allConcerts.filter(
          (concert) => {
            concert.date.forEach(d => {
              if (d.includes(filter) == true) {
                this.filteredConcerts.unshift(concert)
              }
          })
          }
        );
      } else {
        // Les trois filtres ont été entrés
        filter =  filters[1].substr(5) + '/' + filters[1].substr(0, 4);
        console.log(filter);
        this.$store.state.allConcerts.filter(
          (concert) => {
            concert.date.forEach(c => {
              if (c.includes(filter) == true && concert.genre == filters[0]) {
                console.log(concert.title)
                this.filteredConcerts.unshift(concert)
              }
          })
          }
        );
      }
    },
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
    disableFilters() {
      this.hasFiltered = false;
    },
    disableSearch() {
      this.hasFiltered = false
      this.filteredConcerts = []
    },
    error_open() {
      this.error = true;
    },
    error_close() {
      this.error = false;
    },
  }
};
</script>
<style>

.btn:focus {
  outline: none;
  box-shadow: none;
}

</style>