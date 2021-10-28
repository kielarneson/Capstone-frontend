<template>
  <div class="games">
    <div id="search">
      <input @keyup.enter="indexGames" type="text" v-model="searchQuery" placeholder="search games by team" />
    </div>
    <div>
      <h1>Upcoming {{ this.displaySearchQuery }} Games</h1>
    </div>
    <div v-for="game in games" :key="game.id">
      <!-- <a :href="`/tailgates`"> -->
      <h2>{{ game.title }}</h2>
      <!-- </a> -->
      <p>{{ game.venue.name }} | {{ game.datetime_local }}</p>
      <!-- <img :src="game.performers[0].image" alt="" /> -->
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
      displaySearchQuery: "",
    };
  },
  mounted: function () {
    this.indexGames();
  },
  methods: {
    indexGames: function () {
      if (this.searchQuery === "") {
        axios.get("/games?q=ncaa-football").then((response) => {
          console.log("Games index", response);
          this.games = response.data;
          this.displaySearchQuery = "NCAA Football";
        });
      } else {
        let displaySearchQueryArray = this.searchQuery.split(" ");
        let capitalizeSearchQuery = [];
        displaySearchQueryArray.map((word) => capitalizeSearchQuery.push(word[0].toUpperCase() + word.slice(1)));
        this.displaySearchQuery = capitalizeSearchQuery.join(" ");

        let formattedSearchQuery = this.searchQuery.toLowerCase().split(" ");
        formattedSearchQuery.push("football");
        formattedSearchQuery.join("-");

        axios.get(`/games?q=${formattedSearchQuery}`).then((response) => {
          console.log("Games index", response);
          this.games = response.data;
          this.searchQuery = "";
        });
      }
    },
  },
};
</script>
