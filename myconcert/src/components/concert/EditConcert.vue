<template>
   <div>
        <div class="col-md-12 form-wrapper">
          <h2> Edit Concert </h2>
          <form id="create-post-form" @submit.prevent="editConcert">
               <div class="form-group col-md-12">
                <label for="title"> Title </label>
                <input type="text" id="title" v-model="concert.title" class="form-control" placeholder="Enter title">
               </div>
               <div class="form-group col-md-12">
                <label for="title"> Description </label>
                <input type="text" id="description"  v-model="concert.description" name="title" class="form-control" placeholder="Enter description">
               </div>
             <div class="form-group col-md-12">
                <label for="title"> Location </label>
                <input type="text" id="location"  v-model="concert.location" name="title" class="form-control" placeholder="Enter location">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Date </label>
                <input type="text" id="date"  v-model="concert.date" name="title" class="form-control" placeholder="Enter a date">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Price </label>
                <input type="text" id="price"  v-model="concert.price" name="title" class="form-control" placeholder="Enter price">
            </div>
              <div class="form-group col-md-12">
                  <label for="description"> Band </label>
                  <input type="text" id="band"  v-model="concert.band" name="description" class="form-control" placeholder="Enter band">
              </div>
              <div class="form-group col-md-12">
                  <label for="description"> Genre </label>
                  <input type="text" id="genre"  v-model="concert.genre" name="description" class="form-control" placeholder="Enter genre">
              </div>
              <div class="form-group col-md-12">
                  <label for="description"> Concert Hall </label>
                  <input type="text" id="concertHall"  v-model="concert.concert_hall" name="description" class="form-control" placeholder="Enter Concert Hall">
              </div>
              <div class="form-group col-md-12">
                  <label for="description"> Image url </label>
                  <input type="text" id="imageUrl"  v-model="concert.image_URL" name="description" class="form-control" placeholder="Enter image URL">
              </div>
              <div class="form-group col-md-12">
                  <label for="description"> Number of places </label>
                  <input type="text" id="description"  v-model="concert.nbr_tickets" name="description" class="form-control" placeholder="Enter number of places">
              </div>
              <div class="form-group col-md-12">
                  <label for="description"> Number of reservations </label>
                  <input type="text" id="description"  v-model="concert.nbr_reservations" name="description" class="form-control" placeholder="Enter number of reservations">
              </div>
              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Edit Concert </button>
              </div>           
        </form>
        </div>
   </div>

</template>

<script>
import { server } from "../../helper";
import axios from "axios";
import router from "../../router";
export default {
  data() {
    return {
      id: 0,
      concert: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getConcert();
  },
  methods: {
    editConcert() {
      let concertData = {
        _id: this.id,
        title: this.concert.title,
        description: this.concert.description,
        location: this.concert.location,
        date: this.concert.date,
        price: this.concert.price,
        band: this.concert.band,
        genre: this.concert.genre,
        concert_hall: this.concert.concert_hall,
        image_URL: this.concert.image_URL,
        nbr_tickets: this.concert.nbr_tickets,
        nbr_reservations: this.concert.nbr_reservations,
        available: this.concert.available
      };
      this.$store.dispatch('updateConcert', concertData);
      
    },
    getConcert() {
      console.log(this.id);
      axios
        .get(`${server.baseURL}/concert/${this.id}`)
        .then(data => this.concert = data.data);
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

<style>

</style>