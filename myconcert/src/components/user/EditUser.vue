<template>
   <div>
        <h4 class="text-center mt-20">
         <small>
         <button class="btn btn-success" v-on:click="navigate()"> View All Users </button>
         </small>
        </h4>
        <div class="col-md-12 form-wrapper">
          <h2> Edit User </h2>
          <form id="create-post-form" @submit.prevent="editUser">
               <div class="form-group col-md-12">
                <label for="title"> First Name </label>
                <input type="text" id="first_name" v-model="user.first_name" name="title" class="form-control" placeholder="Enter firstname">
               </div>
               <div class="form-group col-md-12">
                <label for="title"> Last Name </label>
                <input type="text" id="last_name" v-model="user.last_name" name="title" class="form-control" placeholder="Enter Last name">
               </div>
               <div class="form-group col-md-12">
                <label for="title"> Admin </label>
                <input type="text" id="last_name" v-model="user.admin" name="title" class="form-control" placeholder="Enter Last name">
               </div>
             <div class="form-group col-md-12">
                <label for="title"> Email </label>
                <input type="text" id="email" v-model="user.email" name="title" class="form-control" placeholder="Enter email">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Password </label>
                <input type="text" id="email" v-model="user.password" name="title" class="form-control" placeholder="Enter password">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Password Confirm</label>
                <input type="text" id="email" v-model="user.password_confirm" name="title" class="form-control" placeholder="Enter password">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Phone </label>
                <input type="text" id="phone_number" v-model="user.phone" name="title" class="form-control" placeholder="Enter Phone number">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Address </label>
                <input type="text" id="address" v-model="user.address" name="title" class="form-control" placeholder="Enter Address">
            </div>
              <div class="form-group col-md-12">
                  <label for="city"> Zip Code </label>
                  <input type="text" id="zip_code" v-model="user.zip_code" name="title" class="form-control" placeholder="Enter Zip Code">
              </div>
              <div class="form-group col-md-12">
                  <label for="city"> City </label>
                  <input type="text" id="city" v-model="user.city" name="title" class="form-control" placeholder="Enter Zip Code">
              </div>
              <div class="form-group col-md-12">
                  <label for="favorite_bands"> Favorite Bands </label>
                  <input type="text" id="favorite_bands" v-model="user.favorite_bands" name="title" class="form-control" placeholder="Enter Favorite Bands">
              </div>
              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Edit User </button>
              </div>           </form>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
 import { server } from "../../helper";
 import axios from "axios"; 
import router from "../../router";
export default {
  data() {
    return {
      id: 0,
      user: {},
    };
  },
  async created() {
    this.id = this.$route.params.id;
    this.getUser();
    this.$store.dispatch("showUser", this.$route.params.id);
  },
  methods: {
     ...mapActions([
      "fetchUsers",
      "deleteUser",
      "updateUser",
      "showUser"
      ]),
      
      editUser() {
        /* console.log(this.user) */
 this.$store.dispatch("updateUser", this.user);
this.$router.push('/admin-users') 

      },
      /* let userData = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password,
        password_confirm: this.user.password_confirm,
        admin: this.useradmin,
        isLogin: this.userisLogin,
        phone: this.user.phone,
        address: this.user.address,
        zip_code: this.user.zip_code,
        city: this.user.city,
        favorite_bands: this.user.favorite_bands,
        wish: this.user.wish
        

      };
      axios
        .put(
          `${server.baseURL}/user/update?userID=${this.id}`,
          userData
        )
        .then(data => {
          router.push({ name: "home" });
        });
    },   */
     getUser() {
      axios
        .get(`${server.baseURL}/user/${this.id}`)
        .then(data => (this.user = data.data));
    },  
    navigate() {
      router.go(-1);
    }
  }
};
</script>