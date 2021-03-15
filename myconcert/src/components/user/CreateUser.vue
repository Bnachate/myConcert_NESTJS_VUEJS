<template>
   <div>
        <div class="col-md-12 form-wrapper">
          <h2> Create User </h2>
          <form id="create-post-form" @submit.prevent="createUser">
               <div class="form-group col-md-13">
                <label for="title"> First Name </label>
                <input type="text" id="first_name" v-model="first_name" name="title" class="form-control" placeholder="Enter firstname">
               </div>
               <div class="form-group col-md-13">
                <label for="title"> Last Name </label>
                <input type="text" id="last_name" v-model="last_name" name="title" class="form-control" placeholder="Enter Last name">
               </div>
               <div class="form-group col-md-13">
                <label for="title"> Admin </label>
                <input type="text" id="last_name" v-model="admin" name="title" class="form-control" placeholder="Enter Last name">
               </div>
             <div class="form-group col-md-13">
                <label for="title"> Email </label>
                <input type="text" id="email" v-model="email" name="title" class="form-control" placeholder="Enter email">
            </div>
             <div class="form-group col-md-13">
                <label for="title"> Password </label>
                <input type="text" id="password" v-model="password" name="title" class="form-control" placeholder="Enter password">
            </div>
             <div class="form-group col-md-13">
                <label for="title"> Password Confirm</label>
                <input type="text" id="password_confirm" v-model="password_confirm" name="title" class="form-control" placeholder="Enter password confirmation">
            </div>
            <div class="form-group col-md-13">
                <label for="title"> Phone </label>
                <input type="text" id="phone_number" v-model="phone" name="title" class="form-control" placeholder="Enter Phone number">
            </div>
            <div class="form-group col-md-13">
                <label for="title"> Address </label>
                <input type="text" id="address" v-model="address" name="title" class="form-control" placeholder="Enter Address">
            </div>
              <div class="form-group col-md-13">
                  <label for="zip_code"> Zip Code </label>
                  <input type="text" id="zip_code" v-model="zip_code" name="description" class="form-control" placeholder="Enter Zip Code">
              </div>
              <div class="form-group col-md-13">
                  <label for="city"> City </label>
                  <input type="text" id="city" v-model="city" name="description" class="form-control" placeholder="Enter City">
              </div>
              <div class="form-group col-md-13">
                  <label for="favorite_bands"> Favorite Bands </label>
                  <input type="text" id="favorite_bands" v-model="favorite_bands" name="description" class="form-control" placeholder="Enter Favorite Bands">
              </div>
              
              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Create User </button>
              </div>           
              </form>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirm: "",
      admin: "0",
      isLogin: false,
      phone: "",
      address: "",
      zip_code: "",
      city: "",
      favorite_bands: "",
      wish: "",

    };
  },
  methods: {
     ...mapActions([
      "addUsers",
      
      ]),
    createUser() {
      let newUser = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirm: this.password_confirm,
        admin: this.admin,
        isLogin: this.isLogin,
        phone: this.phone,
        address: this.address,
        zip_code: this.zip_code,
        city: this.city,
        favorite_bands: this.favorite_bands,
        wish: this.bands,
      };
      this.addUsers(newUser);
      this.$router.push({ name: "Admin-users" });
    },
    /* __submitToServer(data) {
      axios.post(`${server.baseURL}/user/create`, data).then(data => {
        router.push({ name: "home" });
      });
    } */
  }
};
</script>