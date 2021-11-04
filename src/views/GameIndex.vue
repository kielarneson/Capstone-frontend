<template>
  <div class="games">
    College Football Selection Committee Top 25:
    <div class="team-rankings" v-for="team in rankings" v-bind:key="team.rank">
      {{ team.rank }}. {{ team.school }} ({{ team.conference }})
    </div>
    <br />
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
      <img :src="game.performers[0].image" alt="" />

      <div v-for="tailgate in game.tailgates" v-bind:key="tailgate.id">
        <a :href="`/tailgates/${tailgate.id}`">
          <h3>{{ tailgate.name }}</h3>
        </a>
      </div>

      <br />

      <a :href="`/tailgates/new?game_api_id=${game.id}`">New tailgate</a>
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
      // tailgates: [],
      searchQuery: "",
      displaySearchQuery: "",
      rankings: [],
    };
  },
  created: function () {},
  mounted: function () {
    this.indexGames();
    // this.indexTailgates();
    axios.get("/rankings").then((response) => {
      console.log("Rankings index", response);
      this.rankings = response.data.at(-1).polls[3].ranks;
    });
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
    // indexTailgates: function () {
    //   axios.get("/tailgates").then((response) => {
    //     this.tailgates = response.data;
    //   });
    // },
  },
};
</script>
