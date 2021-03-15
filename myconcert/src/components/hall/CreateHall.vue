<template>
      <div class="col-md-12 form-wrapper">
          <h2> Create Hall </h2>
          <form id="create-post-form" @submit.prevent="createHall">
               <div class="form-group col-md-12">
                <label for="title"> Name </label>
                <input type="text" id="name" v-model="name" name="name" class="form-control" placeholder="Enter name">
               </div>
            <div class="form-group col-md-12">
                <label for="title"> Nombre de Places </label>
                <input type="text" id="nb_places" v-model="nb_places" name="nb_places" class="form-control" placeholder="Enter number of places">
            </div>
             <div class="form-group col-md-12">
                <label for="title"> Location </label>
                <input type="text" id="location" v-model="location" name="title" class="form-control" placeholder="Enter location">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Description </label>
                <input type="textarea" id="description" v-model="description" name="title" class="form-control" placeholder="Enter description">
               </div>
                   <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Create User </button>
              </div>             
        </form>
    </div>
</template>

<script>

export default {
  data() {
    return {
      name: "",
      nb_places: "",
      location: "",
      description: "",
    };
  },
  methods: {
    createHall() {
      let hallData = {
        name: this.name,
        nb_places: this.nb_places,
        location: this.location,
        description: this.description,
      };
      this.$store.dispatch('addHall', hallData);
    },
  }
};
</script>

<style>

</style>