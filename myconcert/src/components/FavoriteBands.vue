<template>
    <v-container>
    <Carousel />
  <!--Vuetify 2-->
  <v-container fluid>
    <div
      >
    <v-row align="center"
      >
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select 
           :items="items"
           v-model="updateProfile.favorite_bands"
          label="Choice your Favorite Bands" 
        ></v-select>
      </v-col>
      <v-btn
      @click="submit"
  elevation="2"
>ADD</v-btn>
    </v-row>
    </div>
  </v-container>
  <!--END Vuetify 2-->
 
    <!-----------------------------------CARD CONCERT --------------------------------------->
    
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
import Carousel from "@/components/Carousel";
export default {
  components: {Carousel},
  data() {
    return {
      items: [],
      favorite_bands: "",
      updateProfile: {}
    };
  },
 
  created() {
    this.$store.state.allBands.forEach(band => {
      this.items.push(band.name)
    })
    this.fetchConcerts();
    this.fetchBands();
    this.$store.dispatch('fetchBands');
    
    this.updateProfile = JSON.parse(localStorage.getItem('userData'))
  },
  
  methods: {
    
    ...mapActions([
      'fetchConcerts',
      'fetchBands',
      'updateReservations'
    ]),
    submit() {
      
        var item = {
        _id: this.updateProfile._id,
        first_name: this.updateProfile.first_name,
        last_name: this.updateProfile.last_name,
        email: this.updateProfile.email,
        phone: this.updateProfile.phone,
        address: this.updateProfile.address,
        zip_code: this.updateProfile.zip_code,
        city: this.updateProfile.city,
        favorite_bands: this.updateProfile.favorite_bands,

        }
        
        this.$store.dispatch('updateprofileUser', item)
        localStorage.removeItem('userData')
        localStorage.setItem('userData', JSON.stringify(item))
        
    },
    deleteBand(id) {
      this.$store.dispatch('deleteBand', id);
    }, 
    },
};
</script>