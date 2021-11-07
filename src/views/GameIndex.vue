<template>
  <div class="games">
    <!-- Display CFP top 25 -->
    College Football Selection Committee Top 25:
    <!-- Maybe add some search capabilites to rankings -->
    <div class="team-rankings" v-for="team in rankings" v-bind:key="team.rank">
      {{ team.rank }}. {{ team.school }} ({{ team.conference }})
    </div>
    <br />
    <!-- Search for games in seat geek API -->
    <div id="search">
      <input @keyup.enter="indexGames" type="text" v-model="searchQuery" placeholder="search games by team" />
    </div>
    <div>
      <h1>Upcoming {{ this.displaySearchQuery }} Games</h1>
    </div>
    <div v-for="game in games" :key="game.id">
      <!-- <a :href="`/tailgates`"> -->
      <h2>{{ game.title }}</h2>

      <p>{{ game.venue.name }} | {{ game.start_time_conversion }}</p>
      <img :src="game.performers[0].image" alt="" />

      <!-- Allow user to create tailgate for specific game -->
      <div v-for="tailgate in game.tailgates" v-bind:key="tailgate.id">
        <a :href="`/tailgates/${tailgate.id}`">
          <h3>{{ tailgate.name }}</h3>
        </a>
      </div>

      <br />

      <!-- Move user to new game page to enter tailgate specific information -->
      <a :href="`/tailgates/new?game_api_id=${game.id}`">New tailgate</a>
    </div>

    <div v-for="article in news" v-bind:key="article.id">
      <h4>{{ article.source.name }}</h4>
      <h3>{{ article.title }}</h3>
      <img :src="`${article.urlToImage}`" alt="" />
      <p>{{ article.content }}</p>
      <a :href="`${article.url}`">link to full story</a>
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
      homeTeamRecord: [],
      awayTeamRecord: [],
      rankings: [],
      news: {},
      searchQuery: "",
      displaySearchQuery: "",
    };
  },
  created: function () {},
  mounted: function () {
    this.indexGames();

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

          axios.get(`/news?q=${"college-football"}`).then((response) => {
            console.log("News index", response);
            this.news = response.data.articles.slice(0, 5);
          });
        });
      } else {
        let displaySearchQueryArray = this.searchQuery.split(" ");
        let capitalizeSearchQuery = [];
        displaySearchQueryArray.map((word) => capitalizeSearchQuery.push(word[0].toUpperCase() + word.slice(1)));
        this.displaySearchQuery = capitalizeSearchQuery.join(" ");

        let formattedSearchQuery = this.searchQuery.toLowerCase().split(" ");
        formattedSearchQuery.push("football");
        formattedSearchQuery = formattedSearchQuery.join("-");

        console.log(formattedSearchQuery);

        axios.get(`/games?q=${formattedSearchQuery}`).then((response) => {
          console.log("Games index", response);
          this.games = response.data;
          this.searchQuery = "";

          axios.get(`/news?q=${formattedSearchQuery}`).then((response) => {
            console.log("News index", response);
            this.news = response.data.articles.slice(0, 5);
          });
        });
      }
    },
  },
};
</script>
