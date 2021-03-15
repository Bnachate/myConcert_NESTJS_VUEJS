<template>
   <div>
        <div class="col-md-12 form-wrapper">
          <h2> Edit Band </h2>
          <form id="create-post-form" @submit.prevent="editBand">
               <div class="form-group col-md-12">
                <label for="title"> Name </label>
                <input type="text" id="name" v-model="band.name" class="form-control" placeholder="Enter name">
               </div>
               <div class="form-group col-md-12">
                <label for="title"> Concert </label>
                <input type="text" id="concert"  v-model="band.concert" name="concert" class="form-control" placeholder="Enter concert">
               </div>
               <div class="form-group col-md-12">
                <label for="image_URL"> Image </label>
                <input type="text" id="image_URL"  v-model="band.image_URL" name="image_URL" class="form-control" placeholder="Enter image">
               </div>
             <div class="form-group col-md-12">
                <label for="title"> Description </label>
                <input type="textarea" id="description"  v-model="band.description" name="description" class="form-control" placeholder="Enter description">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Nationality </label>
                <input type="text" id="nationality"  v-model="band.nationality" name="nationality" class="form-control" placeholder="Enter a nationality">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Genre </label>
                <input type="text" id="genre"  v-model="band.genre" name="genre" class="form-control" placeholder="Enter genre">
            </div>
                <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Edit Band </button>
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
      band: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getBand();
  },
  methods: {
    editBand() {
      let bandData = {
        _id: this.id,
        name: this.band.name,
        concert: this.band.concert,
        image_URL: this.band.image_URL,
        description: this.band.description,
        nationality: this.band.nationality,
        genre: this.band.genre,
        
      };
      this.$store.dispatch('updateBand', bandData);
      
    },
    getBand() {
      console.log(this.id);
      axios
        .get(`${server.baseURL}/band/${this.id}`)
        .then(data => this.band = data.data);
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

<style>

</style>