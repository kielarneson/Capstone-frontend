<template>
  <div class="games">
    <!-- Display CFP top 25 -->
    College Football Selection Committee Top 25:
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

      <!-- <div v-for="record in awayTeamRecord" v-bind:key="record.team">
        <div v-if="record.length > 0 && record[0].team === game.performers[1].short_name">
          {{ record[0].team }} ({{ record[0].total.wins }}-{{ record[0].total.losses }})
        </div>
      </div>
      <div v-for="record in homeTeamRecord" v-bind:key="record.team">
        <div v-if="record.length > 0 && record[0].team === game.performers[0].short_name">
          {{ record[0].team }} ({{ record[0].total.wins }}-{{ record[0].total.losses }})
        </div>
      </div> -->

      <!-- </a> -->
      <p>{{ game.venue.name }} | {{ game.datetime_local }}</p>
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
          // WORK ON THIS TOMORROW. IT IS AN INTERESTING PROBLEM TO SOLVE!
          // let index = 0;
          // while (index < this.games.length) {
          //   axios.get(`/records?q=${this.games[index].performers[0].short_name}`).then((response) => {
          //     // console.log("Home team record index", response);
          //     this.homeTeamRecord.push(response.data);
          //   });

          //   // console.log(this.games[index].performers[0].short_name);
          //   index++;
          // }
          // console.log("Home team record", this.homeTeamRecord);

          // index = 0;
          // while (index < this.games.length) {
          //   axios.get(`/records?q=${this.games[index].performers[1].short_name}`).then((response) => {
          //     // console.log("Home team record index", response);
          //     this.awayTeamRecord.push(response.data);
          //   });

          //   // console.log(this.games[index].performers[0].short_name);
          //   index++;
          // }
          // console.log("Away team record", this.awayTeamRecord);
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

          // let index = 0;
          // while (index < this.games.length) {
          //   axios.get(`/records?q=${this.games[index].performers[0].short_name}`).then((response) => {
          //     // console.log("Home team record index", response);
          //     this.homeTeamRecord.push(response.data);
          //   });

          //   // console.log(this.games[index].performers[0].short_name);
          //   index++;
          // }
          // console.log("Home team record", this.homeTeamRecord);

          // index = 0;
          // while (index < this.games.length) {
          //   axios.get(`/records?q=${this.games[index].performers[1].short_name}`).then((response) => {
          //     // console.log("Home team record index", response);
          //     this.awayTeamRecord.push(response.data);
          //   });

          //   // console.log(this.games[index].performers[0].short_name);
          //   index++;
          // }
          // console.log("Away team record", this.awayTeamRecord);
        });
      }
    },
  },
};
</script>
