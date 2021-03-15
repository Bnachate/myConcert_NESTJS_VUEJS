<template>
  <v-container class="mt-5" fluid grid-list-xl>
    <v-layout justify-center row wrap>
      <v-flex xs12>
        <v-layout justify-center row wrap>
          <v-flex xs6>
            <v-form>
              <v-text-field
                v-model="query"
                @keydown.enter.prevent="search"
                label="Search for products"
                append-Icon="fas fa-search"
              ></v-text-field>
            </v-form>
          </v-flex>
          <v-btn color="primary" @click="search" style="margin-top:20px">Search</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Searchbar",
  data() {
    return {
      query: "",
      filteredConcerts: [],
    };
  },
  methods: {
    search() {
        this.$emit('disableSearch')
      this.filteredConcerts = this.$store.state.allConcerts.filter((concert) =>
        concert.title.toLowerCase().includes(this.query.toLowerCase())
      );
      this.query = "";
      this.$emit("search", this.filteredConcerts);
    },
    disableSearch() {
      this.$emit("disableSearch");
    },
  },
};
</script>
