<template>
    <div class="container-fluid">
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      <v-row>
        <v-col md="6">
            <v-btn text to="/admin-users">My ADMIN USERS</v-btn>
        <v-btn text to="/admin-concerts">My ADMIN CONCERTS</v-btn>
        <v-btn text to="/admin-halls">My ADMIN HALLS</v-btn>
        <v-btn text to="/admin-bands">My ADMIN BANDS</v-btn>
        <v-btn text to="/admin-stats">Statistics</v-btn>
        </v-col>
        <v-col
          md="1"
          class="ml-auto"
        >
            <v-btn class="pa2" style="color:green" justify-end text to="/band/create">Create</v-btn>
        </v-col>
      </v-row>
      <div class="text-center">
        <h1>Bands Admin Panel</h1>
       <div v-if="this.$store.state.allBands.length === 0">
            <h2> No band found at the moment </h2>
        </div>
      </div>
        <div class="">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Concert</th>
                  <th scope="col">Image</th>
                  <th scope="col">Description</th>
                  <th scope="col">Nationality</th>
                  <th scope="col">Genre</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="band in this.$store.state.allBands" :key="band._id">
                  <td>{{ band.name }}</td>
                  <td>{{ band.concert }}</td>
                  <td>{{ band.image_URL }}</td>
                  <td>{{ band.description }}</td>
                  <td>{{ band.nationality }}</td>
                  <td>{{ band.genre }}</td>
                  
                  <td>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                          <router-link :to="{name: 'EditBand', params: {id: band._id}}" class="btn btn-sm btn-outline-secondary">Edit Band </router-link>
                            <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteBand(band._id)">Delete Band</button>
                        </div>
                      </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch('fetchBands');
  },
  methods: {
    deleteBand(id) {
      this.$store.dispatch('deleteBand', id);
    }
  }
};
</script>