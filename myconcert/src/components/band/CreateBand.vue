<template>
      <div class="col-md-12 form-wrapper">
          <h2> Create Band </h2>
          <form id="create-post-form" @submit.prevent="createBand">
               <div class="form-group col-md-12">
                <label for="title"> Name </label>
                <input type="text" id="name" v-model="name" name="name" class="form-control" placeholder="Enter name">
               </div>
               <div class="form-group col-md-12">
                <label for="title"> Concert</label>
                <input type="text" id="concert" v-model="concert" name="concert" class="form-control" placeholder="Enter concert">
               </div>
               <div class="form-group col-md-12">
                <label for="Image"> Image</label>
                <input type="text" id="image_URL" v-model="image_URL" name="image_URL" class="form-control" placeholder="Enter image">
               </div>
             <div class="form-group col-md-12">
                <label for="description"> Description </label>
                <input type="text" id="description" v-model="description" name="description" class="form-control" placeholder="Enter description">
            </div>
            <div class="form-group col-md-12">
                <label for="nationality"> Nationality </label>
                <input type="text" id="nationality" v-model="nationality" name="nationality" class="form-control" placeholder="Enter a nationality">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Genre </label>
                <input type="text" id="genre" v-model="genre" name="genre" class="form-control" placeholder="Enter Genre">
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
      concert: "",
      description: "",
      image_URL: "",
      nationality: "",
      genre: "",
    };
  },
  methods: {
    createBand() {
      let bandData = {
        name: this.name,
        concert: this.concert,
        description: this.description,
        image_URL: this.image_URL,
        nationality: this.nationality,
        genre: this.genre,
      };
      this.$store.dispatch('addBand', bandData);
    },
  }
};
</script>

<style>

</style>