<template>
  <v-app >
   <Navbar @logout="logout" @user="setUser"/>
    <v-main>
      <router-view @cartData="getCart" :cartDate="cartDate" :cartPrice="cartPrice"></router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "App",

  components: {
    Navbar,
    Footer,
  },

  data() {
    return {
      user: {},
      cartDate: {},
      cartPrice: {}
    }
  },

  created() {
     
      this.$store.dispatch("getStorage", "user_email")
      this.$store.dispatch("getStorage", "admin")
      this.$store.dispatch("getStorage", "name")
      this.$store.dispatch("getStorage", "userData")
      /* this.$store.dispatch("getUser") */
    },

   methods: {
    logout() {
      this.$store.state.user = '';
      this.$store.state.admin = -1;
      this.$store.state.isLogin = false;
      localStorage.removeItem('user_email');
      localStorage.removeItem('admin');
      localStorage.removeItem('name');
      localStorage.removeItem('userData');
    },
    setUser(user) {
      this.user = user;
    },
    getCart(data) {
      this.cartDate = data.date;
      this.cartPrice = data.computedPrice;
    }
    },
    computed: {
  }
  
};
</script>
