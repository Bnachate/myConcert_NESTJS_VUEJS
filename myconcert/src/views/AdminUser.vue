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
            <v-btn class="pa2" style="color:green" justify-end text to="/user/create">Create</v-btn>
        </v-col>
      </v-row>
      <div class="text-center">
        <h1>Users Admin Panel</h1>
       
       <div v-if="this.$store.state.allUsers.length === 0">
            <h2> No user found at the moment </h2>
        </div>
      </div>

        <div class="">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Admin</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Password Confirm</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Zip Code</th>
                  <th scope="col">City</th>
                  <th scope="col">Favorite Bands</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in this.$store.state.allUsers" :key="user._id">
                  <td>{{ user.first_name }}</td>
                  <td>{{ user.last_name }}</td>
                  <td>{{ user.admin }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.password }}</td>
                  <td>{{ user.password_confirm }}</td>
                  <td>{{ user.phone }}</td>
                  <td>{{ user.address }}</td>
                  <td>{{ user.zip_code }}</td>
                  <td>{{ user.city }}</td>
                  <td>{{ user.favorite_bands }}</td>
                  
                  <td>
                    <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group" style="margin-bottom: 20px;">
                                  <router-link :to="{name: 'EditUser', params: {id: user._id}}" class="btn btn-sm btn-outline-secondary">Edit User </router-link>
                                  <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteUser(user._id)">Delete User</button>
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
import { mapActions } from "vuex";
/* import { server } from "../helper";
import axios from "axios"; */
export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions([
      "fetchUsers",
      "deleteUser",
      "updateUser",
      "showUser"
    ]),
   /*  fetchUsers() {
      axios
        .get(`${server.baseURL}/user/users`)
        .then(data => (this.users = data.data));
    }, */
    /* deleteUser(id) {
      axios
        .delete(`${server.baseURL}/user/delete?userID=${id}`)
        .then(data => {
          console.log(data);
          window.location.reload();
        });
    } */
  },
 
  
};
</script>