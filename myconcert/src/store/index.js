import Vue from 'vue'
import Vuex from 'vuex'
import { server } from "../helper";
import axios from "axios";
import router from '../router';

Vue.use(Vuex)

const bcrypt = require("bcrypt-nodejs");
export default new Vuex.Store({
  state: {
    allUsers: [],
    allBands: [],
    allConcerts: [],
    allHalls: [],
    user: {},
    Storageuser: -1,
    admin: -1,
    name: "",
    isLogin: false,
  },
  // ****************************************************
  //                        MUTATIONS
  // +***************************************************
  mutations: {
    // ---------------------USER-------------------------
    setUsers(state, users) {
      //products c'est la data envoyée par response.data
      state.allUsers = users;
    },

    addUser: (state, newUser) => state.allUsers.unshift(newUser),

    removeUsers: (state, id) =>
      (state.allUsers = state.allUsers.filter((user) => user.id !== id)),

    updUser: (state, userData) => {
      var _id = userData._id;
      state.allUsers = state.allUsers.filter(
        (user) => user._id != _id
      );
      state.allUsers.unshift(userData);
    },
    showUser: (state, id) =>
    (state.user = state.allUsers.find(
      (user) => user._id === id
    )),
    isLogin: (state, val) => (state.isLogin = val),
    user: (state, user) => {
      state.Storageuser = user;
    },
    admin: (state, admin) => (state.admin = admin),
    name: (state, name) => (state.name = name),

    userData: (state, data) => (state.userData = data),
    // --------------------CONCERT------------------------
    getConcerts: (state, data) => {
      state.allConcerts = data;
    },
    removeConcert: (state, id) => {
      state.allConcerts.filter(concert => concert._id !== id);
    },
    addConcert: (state, newConcert) => {
      state.allConcerts = state.allConcerts.unshift(newConcert);
    },
    updConcert: (state, concertData) => {
      var _id = concertData._id;
      state.allConcerts = state.allConcerts.filter(concert => concert._id !== _id);
      state.allConcerts = state.allConcerts.unshift(concertData);
    },
    // --------------------Hall------------------------
    getHalls: (state, data) => {
      state.allHalls = data;
    },
    removeHall: (state, id) => {
      state.allHalls.filter(hall => hall._id !== id);
    },
    addHall: (state, newHall) => {
      state.allHalls = state.allHalls.unshift(newHall);
    },
    updHall: (state, hallData) => {
      var _id = hallData._id;
      state.allHalls = state.allHalls.filter(Hall => Hall._id !== _id);
      state.allHalls = state.allHalls.unshift(hallData);
    },
    // --------------------Band------------------------
    getBands: (state, data) => {
      state.allBands = data;
    },
    removeBand: (state, id) => {
      state.allBands.filter(band => band._id !== id);
    },
    addBand: (state, newBand) => {
      state.allBands = state.allBands.unshift(newBand);
    },
    updBand: (state, bandData) => {
      var _id = bandData._id;
      state.allBands = state.allBands.filter(Band => Band._id !== _id);
      state.allBands = state.allBands.unshift(bandData);
    }
  },
  // ****************************************************
  //                        ACTIONS
  // +***************************************************
  actions: {
    //-----------------------USER-----------------
    //GET
    async fetchUsers({ commit }) {

      const response = await axios
        .get(`${server.baseURL}/user/users`)
        .then(data => (this.allUsers = data.data));
      commit("setUsers", response)
    },
    //END GET
    //DELETE
    async deleteUser({ commit }, id) {
      await axios
        .delete(`${server.baseURL}/user/delete?userID=${id}`)
        .then(() => {
          window.location.reload();
          commit("removeUsers", id);
        });
    },
    //END DELETE
    //POST
    async addUsers({ commit }, newUser) {
      let hash = bcrypt.hashSync(newUser.password);
      newUser.password = hash;
      newUser.password_confirm = hash;

      await axios.post(`${server.baseURL}/user/create`, newUser)
        .then(() => {

          commit("addUser", newUser);
        });
    },
    //END POST
    //PUT
    async updateUser({ commit }, user) {
      await axios
        .put(
          `${server.baseURL}/user/update?userID=${user._id}`,
          user
        )
        .then(() => {
          commit("updUser", user);
        });

    },
    async updateprofileUser({ commit }, item) {
      await axios
        .put(
          `${server.baseURL}/user/update?userID=${item._id}`,
          item
        )
        .then(() => {
          commit("updUser", item);
        });
    },
    //END PUT
    //SHOW
    async showUser({ commit }, id) {
      await axios
        .get(`${server.baseURL}/user/${id}`)
        .then(() => commit("showUser", id));
    },
    getUser({ commit }) {
      commit("showUser");
    },
    //END SHOW
    // async deleteReservation({ commit }, data) {

    // },
    async updateReservations({ commit }, updateData) {
      var duplicate = false;
      var concert = updateData.concert;
      var user = updateData.user;
      user.reservation.forEach(id => {
        if (id == concert._id) {
          duplicate = true;
        }
      })
      if (duplicate === false) {
        user.reservation.push(concert._id)
        await axios
          .put(
            `${server.baseURL}/user/update?userID=${user._id}`,
            { reservation: user.reservation }
          )
          .then(data => {
            console.log(data);
          })
        commit('updUser', user)
      }
    },
    async updateWishes({ commit }, updateData) {
      var duplicate = false;
      var concertID = updateData.concertID;
      var user = updateData.user;
      user.wish.forEach(id => {
        if (id == concertID) {
          duplicate = true;
        }
      })
      if (duplicate === false) {
        user.wish.push(concertID)
        await axios
          .put(
            `${server.baseURL}/user/update?userID=${user._id}`,
            { wish: user.wish }
          )
          .then(data => {
            commit('updUser', data.user)
          })
      } else {
        const index = user.wish.indexOf(concertID);
        user.wish.splice(index, 1);
        await axios
          .put(
            `${server.baseURL}/user/update?userID=${user._id}`,
            { wish: user.wish }
          )
          .then(data => {
            commit('updUser', data.user)
          })
      }
    },
    //-----------------------END USER-----------------
    //-----------------------CONCERT-----------------
    // GET
    async fetchConcerts({ commit }) {
      const response = await axios
        .get(`${server.baseURL}/concert/concerts`);
      commit('getConcerts', response.data);
    },
    // ADD

    async addConcert({ commit }, concertData) {
      axios.post(`${server.baseURL}/concert/create`, concertData)
        .then(() => {
          commit('addConcert', concertData)
          router.push({ name: "AdminConcert" });
        });
    },

    // UPDATE
    async updateConcert({ commit }, concertData) {
      await axios
        .put(
          `${server.baseURL}/concert/update?concertID=${concertData._id}`,
          concertData
        ).then(() => {
          commit('updConcert', concertData);
          router.push({ name: "AdminConcert" });
        });
    },
    // DELETE
    async deleteConcert({ commit }, id) {
      await axios
        .delete(`${server.baseURL}/concert/delete?concertID=${id}`)
        .then(() => {
          window.location.reload();
          commit('removeConcert', id);
        });
    },
    //-----------------------END CONCERT-----------------
    //-----------------------Hall-----------------
    // GET
    async fetchHalls({ commit }) {
      const response = await axios
        .get(`${server.baseURL}/hall/halls`);
      commit('getHalls', response.data);
    },
    // ADD

    async addHall({ commit }, hallData) {
      axios.post(`${server.baseURL}/hall/create`, hallData)
        .then(() => {
          commit('addHall', hallData)
          router.push({ name: "AdminHall" });
        });
    },

    // UPDATE
    async updateHall({ commit }, hallData) {
      await axios
        .put(
          `${server.baseURL}/hall/update?hallID=${hallData._id}`,
          hallData
        ).then(() => {
          commit('updHall', hallData);
          router.push({ name: "AdminHall" });
        });
    },
    // DELETE
    async deleteHall({ commit }, id) {
      await axios
        .delete(`${server.baseURL}/hall/delete?hallID=${id}`)
        .then(() => {
          window.location.reload();
          commit('removehall', id);
        });
    },
    //-----------------------END Hall-----------------
    //-----------------------Band-----------------
    // GET
    async fetchBands({ commit }) {
      const response = await axios
        .get(`${server.baseURL}/band/bands`);
      commit('getBands', response.data);
    },
    // ADD

    async addBand({ commit }, bandData) {
      axios.post(`${server.baseURL}/band/create`, bandData)
        .then(() => {
          commit('addBand', bandData)
          router.push({ name: "AdminBand" });
        });
    },

    // UPDATE
    async updateBand({ commit }, bandData) {
      await axios
        .put(
          `${server.baseURL}/band/update?bandID=${bandData._id}`,
          bandData
        ).then(() => {
          commit('updBand', bandData);
          router.push({ name: "AdminBand" });
        });
    },
    // DELETE
    async deleteBand({ commit }, id) {
      await axios
        .delete(`${server.baseURL}/band/delete?bandID=${id}`)
        .then(() => {
          window.location.reload();
          commit('removeband', id);
        });
    },
    //-----------------------END Band-----------------
    // ***************** LOCAL STORAGE ********************

    getStorage({ commit }, cname) {

      if (cname == "user_email") {
        var user = localStorage.getItem("user_email");
        if (user != undefined) {
          commit("isLogin", true);
        }
        commit("user", user);

      } else if (cname == "admin") {
        var admin = localStorage.getItem("admin");
        commit("admin", admin);
      } else if (cname == "name") {
        var name = localStorage.getItem("name");
        commit("name", name);
      } else if (cname == "userData") {
        var userData = localStorage.getItem("userData");
        commit("userData", userData);
      }
    },
  },
  modules: {
  }
})
