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
        
      </v-row>
      <div class="text-center">
        <h1>Statistics</h1>
       <div v-if="this.$store.state.allConcerts.length === 0">
            <h2> No statics found at the moment </h2>
        </div>
      </div>

        <div class="">
            <v-simple-table>
    
      <thead>
        <tr>
          <th class="text-left">
            Concert
          </th>
          <th class="text-left">
            Tickets disponibles
            </th>
          <th class="text-left">
            Reservations
          </th>
          <th class="text-left">
            Prix
          </th>
          <th class="text-left">
            Places restantes
          </th>
          
          <th class="text-left">
            chiffre d'affaire (en euros) 
          </th>
          <th class="text-left">
            chiffre d'affaire potentiel (en euros)
          </th>
         <th class="text-left">
            Manque à gagner (en %)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
         v-for="concert in this.$store.state.allConcerts" :key="concert._id"
        >
          <td>{{ concert.title }}</td>
          <td>{{ concert.nbr_tickets }}</td>
          <td>{{ concert.nbr_reservations }}</td>
          <td>{{ concert.price }}</td>
          <td>{{ concert.nbr_tickets - concert.nbr_reservations }}</td>
          <td>{{ concert.nbr_reservations * concert.price }}</td>
          <td>{{ concert.nbr_tickets * concert.price }}</td>
          <td>{{ Math.floor((((concert.nbr_tickets - concert.nbr_reservations)/concert.nbr_tickets) *100)) }} %</td>
        </tr>
      </tbody>
   
  </v-simple-table>
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
  },
   computed: {
      substraction: function(){
      return this.concert.nbr_tickets * this.concert.nbr_reservations;
      }
   }
};
</script>
