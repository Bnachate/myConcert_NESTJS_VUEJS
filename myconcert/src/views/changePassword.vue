<template>
    <div>
        <template>
        <v-toolbar>
        <v-btn text to="/profile">Personnal information</v-btn>
        <v-btn text to="/password">Change password</v-btn>
        <v-divider
           class="mx-4"
           inset
           vertical
        ></v-divider>
        </v-toolbar>
        </template>
        <v-container 
        fluid
        style="margin-top:30px;"
        >
            <v-row>
                <v-alert
                    color="error"
                    v-if="error"
                    icon="close"
                    v-on:click="close"
                >
                    {{message}}
                </v-alert>
                <v-alert
                    color="success"
                    v-if="success"
                    icon="close"
                    v-on:click="close"
                >
                    {{message}}
                </v-alert>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    sm="6"
                    style="margin:0 auto"
                >
                <h1 style="text-align:center;margin-bottom:20px;">Change Password</h1>
                    <v-form
                    ref="form"
                    >
                        <v-text-field
                        v-model="oldPassword"
                        label="Current password"
                        required
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        hint="At least 8 characters"
                        ></v-text-field>

                        <v-text-field
                        v-model="updateProfile.password"
                        label="New password"
                        required
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        hint="At least 8 characters"
                        ></v-text-field>

                        <v-text-field
                        v-model="updateProfile.passwordConfirmation"
                        label="New password confirmation"
                        required
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        hint="At least 8 characters"
                        ></v-text-field>

                        <v-btn
                        color="success"
                        class="mr-4"
                        @click="changePassword"
                        >
                        Validate
                        </v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>   
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
/* const bcrypt = require('bcrypt-nodejs'); */
export default {
    data() {
        return {
            oldPassword: '',
            password: '',
            passwordConfirmation: '',
            show1: false,
            error: false,
            success: false,
            message: '',
        }
    },
     computed: mapGetters(["allUsers"]),
    methods: {
         ...mapActions([
      "fetchUsers",
      "deleteUser",
      "addUsers",
      "updateUser",
      "showUser",
      "getStorage"
    ]),
        changePassword() {
            if (this.updateProfile.password === this.updateProfile.passwordConfirmation) {
                
                var item = {
                    _id: this.updateProfile._id,
                    first_name: this.updateProfile.first_name,
                    last_name: this.updateProfile.last_name,
                    email: this.updateProfile.email,
                    phone: this.updateProfile.phone,
                    address: this.updateProfile.address,
                    zip_code: this.updateProfile.zip_code,
                    city: this.updateProfile.city,
                    favorite_bands: this.updateProfile.favorite_bands,
                    password: this.updateProfile.password,
                    password_confirm: this.updateProfile.passwordConfirmation,   
               }
               this.$store.dispatch('updateprofileUser', item)
               localStorage.removeItem('userData')
               localStorage.setItem('userData', JSON.stringify(item))
                this.error = false
                this.success = true
                return this.message = "Your password has been change with success" 
            } else {
                this.error = true
                return this.message = "Your password doen't match our database. Please try again." 
            }
        },
        close() {
            this.error = false;
            this.success = false;
        }
    },
   
  created() {
    this.fetchUsers();
   this.updateProfile = JSON.parse(localStorage.getItem('userData'))
    
  },
}
</script>