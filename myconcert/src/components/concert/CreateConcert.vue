<template>
      <div class="col-md-12 form-wrapper">
          <h2> Create Concert </h2>
          <form id="create-post-form" @submit.prevent="createConcert">
               <div class="form-group col-md-12">
                <label for="title"> Title </label>
                <input type="text" id="title" v-model="title" name="title" class="form-control" placeholder="Enter title">
               </div>
               <div class="form-group col-md-12">
                <label for="title"> Description </label>
                <input type="text" id="description" v-model="description" name="title" class="form-control" placeholder="Enter description">
               </div>
             <div class="form-group col-md-12">
                <label for="title"> Location </label>
                <input type="text" id="location" v-model="location" name="title" class="form-control" placeholder="Enter location">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Date </label>
                <input type="text" id="date" v-model="date" name="title" class="form-control" placeholder="Enter a Date">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Price </label>
                <input type="text" id="price" v-model="price" name="title" class="form-control" placeholder="Enter Price">
            </div>
              <div class="form-group col-md-12">
                  <label for="description"> Band </label>
                  <input type="text" id="band" v-model="band" name="description" class="form-control" placeholder="Enter Band">
              </div>
              <div class="form-group col-md-12">
                  <label for="description"> Genre </label>
                  <input type="text" id="genre" v-model="genre" name="description" class="form-control" placeholder="Enter Genre">
              </div>
              <div class="form-group col-md-12">
                  <label for="description"> Concert Hall </label>
                  <input type="text" id="concertHall" v-model="concertHall" name="description" class="form-control" placeholder="Enter Concert Hall">
              </div>
              <div class="form-group col-md-12">
                  <label for="description"> Image url </label>
                  <input type="text" id="imageUrl" v-model="imageUrl" name="description" class="form-control" placeholder="Enter Image Url">
              </div>
              <div class="form-group col-md-12">
                  <label for="description"> Number of places </label>
                  <input type="text" id="description" v-model="numberPlaces" name="description" class="form-control" placeholder="Enter number of places">
              </div>
              <div class="form-group col-md-12">
                  <label for="description"> Number of reservations </label>
                  <input type="text" id="description" v-model="numberReservations" name="description" class="form-control" placeholder="Enter number of reservations">
              </div>
              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Create Concert </button>
              </div>           
        </form>
    </div>
</template>

<script>

export default {
  data() {
    return {
      title: "",
      description: "",
      location: "",
      date: "",
      price: "",
      band: "",
      genre: "",
      concertHall: "",
      imageUrl: "",
      numberPlaces: "",
      numberReservations: "",
      available: true
    };
  },
  methods: {
    createConcert() {
      let concertData = {
        title: this.title,
        description: this.description,
        location: this.location,
        date: this.date,
        price: this.price,
        band: this.band,
        genre: this.genre,
        concert_hall: this.concertHall,
        image_URL: this.imageUrl,
        nbr_tickets: this.numberPlaces,
        nbr_reservations: this.numberReservations,
        available: this.available
      };
      this.$store.dispatch('addConcert', concertData);
    },
  }
};
</script>

<style>

</style>