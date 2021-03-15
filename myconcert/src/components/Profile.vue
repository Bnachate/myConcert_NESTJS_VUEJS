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
            <v-container style="margin: 45px auto 60px auto">
                <h2 style="margin-bottom: 45px" class="display-2">Personnal information</h2>
                <v-alert
                    color="error"
                    v-if="this.error"
                    icon="close"
                    v-on:click="close"
                >
                    {{message}}
                </v-alert>
                <v-alert
                    color="success"
                    v-if="this.success"
                    icon="close"
                    v-on:click="close"
                >
                    {{mess}}
                </v-alert>
                <form action="">
                    <v-layout>
                        <v-flex x4>
                            <strong>Profile</strong>
                            <v-text-field v-model="updateProfile.first_name" label="First Name"></v-text-field>
                            <v-text-field v-model="updateProfile.last_name" label="Last Name"></v-text-field>
                            <v-text-field v-model="updateProfile.email" label="E-mail"></v-text-field>
                            <v-text-field v-model="updateProfile.phone" :maxlength="max"  label="Phone"></v-text-field>
                            <v-text-field v-model="updateProfile.address" label="Address"></v-text-field>
                            <v-text-field v-model="updateProfile.zip_code" label="Zip Code"></v-text-field>
                            <v-text-field v-model="updateProfile.city" label="City"></v-text-field>
                            <v-text-field v-model="updateProfile.favorite_bands" label="Favorite Bands"></v-text-field> 
                        </v-flex>
                        
                            <v-btn @click="verify" color="red" lager style="margin-top: 30px;">
                                <strong style="color:#FFFFFF;">Save information</strong>
                            </v-btn>
                        
                    </v-layout>
                </form>
            </v-container>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            max: 10,
            error: false,
            success: false,
            regex: RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"),
            updateProfile: {}
        }
    },
    methods: {
        ...mapActions([
        "fetchUsers",
        "showUser",
        "deleteUser",
        "addUsers",
        "updateUser",
        "getUser"
        ]),
        close() {
            this.error = false;
            this.success = false;
        },
        verify() {
           if(this.regex.test(this.updateProfile.email) == false) {
               this.error = true
               return this.message = "Your email is not valid."
           } else {
               this.error = false
               this.success = true
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
                    
               }
               this.$store.dispatch('updateprofileUser', item)
               localStorage.removeItem('userData')
               localStorage.setItem('userData', JSON.stringify(item))
               //this.updateProfile = JSON.parse(localStorage.getItem('userData'))
               return this.mess = "Your information has been updated successfully."
           }
        }
    },
    created() {
         this.updateProfile = JSON.parse(localStorage.getItem('userData'))
    }
}
</script>