<template>
  <v-app-bar d-flex app color="black" dark height="100">
    <div>
      <a href="/">
        <v-img alt="myConcert" class="shrink mr-2" height="150" width="150" src="../assets/myconcert.png"
          transition="scale-transition" />
      </a>

    </div>

    <v-spacer></v-spacer>
    <div class="text-center">
      <v-btn href="/reservations" text>
        <v-icon class="mr-2 mb-1">event</v-icon><span class=" mr-2" style="color: #FFFFFF">Reservation</span>
      </v-btn>
    </div>

    <v-btn href="/login" target="_self" text v-if="this.$store.state.isLogin == false">
      <span class=" mr-2" style="color: #FFFFFF">Login</span>
    </v-btn>

    <!--test-->

    <v-menu offset-y v-model="message" v-if="this.$store.state.isLogin == true">

      <template v-slot:activator="{ on, attrs }">
        <v-btn text black v-bind="attrs" v-on="on">
          <strong>{{message}}</strong>
        </v-btn>
      </template>
      <v-list v-if="this.$store.state.admin == 1">

        <v-list-item-title>
          <v-btn href="/profile" target="_self" text>
            <span class=" mr-2" style="color:black">Profil</span>
          </v-btn>
        </v-list-item-title>
        <v-list-item-title>
          <v-btn href="/favorite" target="_self" text>
            <span class=" mr-2" style="color:black">Favorite Bands</span>
          </v-btn>
        </v-list-item-title>
        <v-list-item-title>
          <v-btn href="/dashboard" target="_self" text>
            <span class=" mr-2" style="color:black">Wish-List</span>
          </v-btn>
        </v-list-item-title>
        <v-list-item-title>
          <v-btn href="/admin-users" target="_self" text>
            <span class=" mr-2" style="color:black">Admin</span>
          </v-btn>
        </v-list-item-title>
        <v-list-item-title>
          <v-btn @click="logout" target="_self" text v-if="this.$store.state.isLogin == true">
            <span class=" mr-2" style="color:black">Logout</span>
          </v-btn>
        </v-list-item-title>


      </v-list>
      <v-list v-if="this.$store.state.admin == 0">

        <v-list-item-title>
          <v-btn href="/profile" target="_self" text>
            <span class=" mr-2" style="color:black">Profile</span>
          </v-btn>
        </v-list-item-title>
        <v-list-item-title>
          <v-btn href="/favorite" target="_self" text>
            <span class=" mr-2" style="color:black">Favorite Bands</span>
          </v-btn>
        </v-list-item-title>
        <v-list-item-title>
          <v-btn href="/" target="_self" text>
            <span class=" mr-2" style="color:black">Wish-List</span>
          </v-btn>
        </v-list-item-title>
        <v-list-item-title>
          <v-btn @click="logout" target="_self" text>
            <span class=" mr-2" style="color:black">Logout</span>
          </v-btn>
        </v-list-item-title>
      </v-list>
    </v-menu>

    <!--test-->

  </v-app-bar>


</template>

<script>
  import {
    server
  } from "./../helper";
  import axios from "axios";
  import {
    mapActions,
    mapGetters
  } from 'vuex'
  export default {
    name: 'Navbar',
    data: () => ({
      id: 0,
      user: {},
      
    }),
    methods: {
      ...mapActions([
        "fetchUsers",
        "showUser",
        "deleteUser",
        "addUsers",
        "getStorage",
      ]),
      logout() {
        this.$emit("logout")
      },
      async getUser() {
      await axios
        .get(`${server.baseURL}/user/users`)
        .then( data => {
          if(this.$store.state.isLogin == true) {
            console.log(this.$store.state.Storageuser)
            data.data.forEach(u => { 
              if(u.email == this.$store.state.Storageuser) {
                this.user = u;
                this.$emit('user', this.user)
              }
            })
          }
        });
    },

    },
    computed: {
      ...mapGetters(["allUsers"]),
      /*  totalQuantity() {
          this.$store.dispatch("getUser") 
         return JSON.parse(this.$store.state.cart).length
       }, */
      message: {
        get() {
          return this.$store.state.name;
        },
        set(data) {
          this.$store.commit(data)
        }
      }
    },
    async created() {
      await this.fetchUsers();
      this.getUser();
      this.$store.dispatch("getStorage", "user_email")
      this.$store.dispatch("getStorage", "admin")
      this.$store.dispatch("getStorage", "name")
      this.$store.dispatch("getStorage", "userData")
      /* this.$store.dispatch("getUser") */
    }
  }
</script>