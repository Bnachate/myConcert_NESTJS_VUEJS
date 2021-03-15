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
            <v-btn class="pa2" style="color:green" justify-end text to="/hall/create">Create</v-btn>
        </v-col>
      </v-row>
      <div class="text-center">
        <h1>Hall Admin Panel</h1>
       <div v-if="this.$store.state.allHalls.length === 0">
            <h2> No hall found at the moment </h2>
        </div>
      </div>

        <div class="">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">name</th>
                  <th scope="col">nb_places</th>
                  <th scope="col">location</th>
                  <th scope="col">description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="hall in this.$store.state.allHalls" :key="hall._id">
                  <td>{{ hall.name }}</td>
                  <td>{{ hall.nb_places }}</td>
                  <td>{{ hall.location }}</td>
                  <td>{{ hall.description }}</td>
                  
                  <td>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                          <router-link :to="{name: 'EditHall', params: {id: hall._id}}" class="btn btn-sm btn-outline-secondary">Edit Hall </router-link>
                            <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteHall(hall._id)">Delete Hall</button>
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
    this.$store.dispatch('fetchHalls');
  },
  methods: {
    deleteHall(id) {
      this.$store.dispatch('deleteHall', id);
    }
  }
};
</script>