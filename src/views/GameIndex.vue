<template>
  <div class="games">
    <div v-for="game in games" :key="game.id">
      <h3>{{ game.away_team }} at {{ game.home_team }}</h3>
      <p>{{ game.venue }}</p>
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
    };
  },
  created: function () {
    this.indexGames();
  },
  methods: {
    indexGames: function () {
      axios.get("/games").then((response) => {
        console.log("Games index", response);
        this.games = response.data;
      });
    },
  },
};
</script>
