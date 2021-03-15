<template>
  <v-container>
    <v-layout class="main justify-center" row wrap >
      <v-flex xs12 sm4 md5 ml-5>
        <div>
          <v-img :src="this.concert.image_URL" style="width:max;height:500px" />
        </div>
      </v-flex>

      <v-flex xs12 sm4 md5 mb-5>
        <v-card style="height:500px">
          <v-row>
            <v-card-title>
             
              <span style="font-size:40px">{{ this.concert.title }}</span>
              
            </v-card-title>
          </v-row>
          <v-card-text>
            <v-row align="center" class="mx-0">

              

              <div class="grey--text ml-4"></div>
            </v-row>

            <v-divider class="mx-4"></v-divider>
            <div></div>

            <p>
              {{ this.concert.description }}
            </p>

            <v-row>
              <v-card-title style="color:red;font-size:30px;">
                {{ this.concert.price }}€
              </v-card-title>
            </v-row>
            <v-row style="margin:20px 0;">
              <v-btn
                  v-if="$store.state.isLogin == true"
                  text
                  class="float-right"
                  style="margin-right: 10px;"
              >
                <v-icon class="mr-2 mb-1">event</v-icon><span class=" mr-2" style="color: #111">Get Tickets</span>
              </v-btn>
              <v-btn 
                to="/"
                text
              >
                Accueil
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Show",
  data() {
    return {
      router: "",
      concert: {}, 
      idConcert: this.$route.params.id,
    };
  },

  methods: {
    ...mapActions([
      "fetchConcerts",
    ]),
  },

  //computed: mapGetters(["concert"]),

  created() {
    this.concert = JSON.parse(localStorage.getItem("concertShow"));
  },
};
</script>

<style scoped>
.main {
  margin-top: 1%;
}

.description {
  margin-top: 2%;
  font-size: 30px;
  font: "Fira Sans", serif;
}

.titre {
  font-size: 50px;
}
</style>
