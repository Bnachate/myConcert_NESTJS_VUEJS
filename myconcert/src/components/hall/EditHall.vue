<template>
   <div>
        <div class="col-md-12 form-wrapper">
          <h2> Edit Hall </h2>
          <form id="create-post-form" @submit.prevent="editHall">
               <div class="form-group col-md-12">
                <label for="title"> Name </label>
                <input type="text" id="name" v-model="hall.name" class="form-control" placeholder="Enter name">
               </div>
             <div class="form-group col-md-12">
                <label for="title"> Number of Places </label>
                <input type="text" id="nb_place"  v-model="hall.nb_places" name="nb_place" class="form-control" placeholder="Enter the number of places">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Location </label>
                <input type="text" id="location"  v-model="hall.location" name="location" class="form-control" placeholder="Enter location">
            </div>
               <div class="form-group col-md-12">
                <label for="title"> Description </label>
                <input type="text" id="description"  v-model="hall.description" name="title" class="form-control" placeholder="Enter description">
               </div>
            
              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Edit Hall </button>
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
      hall: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getHall();
  },
  methods: {
    editHall() {
      let hallData = {
        _id: this.id,
        name: this.hall.name,
        nb_places: this.hall.nb_places,
        location: this.hall.location,
        description: this.hall.description,
        };
      this.$store.dispatch('updateHall', hallData);
      
    },
    getHall() {
      console.log(this.id);
      axios
        .get(`${server.baseURL}/hall/${this.id}`)
        .then(data => this.hall = data.data);
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

<style>

</style>