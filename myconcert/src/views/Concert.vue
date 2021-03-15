<template>
    <div class="container-fluid">
      <div class="text-center">
        <h1>Concert Admin Panel</h1>
       <div v-if="this.$store.state.allConcerts.length === 0">
            <h2> No concert found at the moment </h2>
        </div>
      </div>

        <div class="">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Location</th>
                  <th scope="col">Date</th>
                  <th scope="col">Band</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Concert Hall</th>
                  <th scope="col">Image</th>
                  <th scope="col">Nbr Tickets</th>
                  <th scope="col">Nbr Reservations</th>
                  <th scope="col">Available</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="concert in this.$store.state.allConcerts" :key="concert._id">
                  <td>{{ concert.title }}</td>
                  <td>{{ concert.description }}</td>
                  <td>{{ concert.location }}</td>
                  <td>{{ concert.date }}</td>
                  <td>{{ concert.band }}</td>
                  <td>{{ concert.genre }}</td>
                  <td>{{ concert.concert_hall }}</td>
                  <td>{{ concert.image_URL }}</td>
                  <td>{{ concert.nbr_tickets }}</td>
                  <td>{{ concert.nbr_reservations }}</td>
                  <td>{{ concert.available }}</td>
                  <td>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                          <router-link :to="{name: 'EditConcert', params: {id: concert._id}}" class="btn btn-sm btn-outline-secondary">Edit Concert </router-link>
                            <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteConcert(concert._id)">Delete Concert</button>
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
    this.$store.dispatch('fetchConcerts');
  },
  methods: {
    deleteConcert(id) {
      this.$store.dispatch('deleteConcert', id);
    }
  }
};
</script>

