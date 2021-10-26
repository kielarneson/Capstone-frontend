<template>
  <div class="games">
    <div id="search">
      <input @keyup.enter="indexGames" type="text" v-model="searchQuery" placeholder="seach for games" />
    </div>

    <div v-for="game in games" :key="game.id">
      <!-- <a :href="`/tailgates`"> -->
      <h2>{{ game.title }}</h2>
      <!-- </a> -->
      <p>{{ game.venue.name }} | {{ game.datetime_local }}</p>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      games: [],
      searchQuery: "",
    };
  },
  created: function () {
    this.indexGames();
  },
  methods: {
    indexGames: function () {
      if (this.searchQuery === "") {
        axios.get("/games?q=ncaa-football").then((response) => {
          console.log("Games index", response);
          this.games = response.data;
        });
      } else {
        let formattedSearchQuery = this.searchQuery.toLowerCase().split(" ").join("-");

        axios.get(`/games?q=${formattedSearchQuery}`).then((response) => {
          console.log("Games index", response);
          this.games = response.data;
        });
      }
    },
  },
};
</script>
