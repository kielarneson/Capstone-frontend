<template>
  <div class="games">
    <div class="container">
      <div class="row">
        <div class="col-8">
          <!-- <h1>Upcoming {{ this.displaySearchQuery }} Games</h1> -->

          <!-- <div class="search">
            <input @keyup.enter="indexGames" type="text" v-model="searchQuery" placeholder="search games by team" />
          </div> -->

          <section id="team" class="team section-bg">
            <div class="container">
              <div class="section-title">
                <h2>Upcoming {{ this.displaySearchQuery }} Games</h2>
                <!-- <p>
                  Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
                  consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia
                  fugiat sit in iste officiis commodi quidem hic quas.
                </p> -->
                <div class="search">
                  <input
                    @keyup.enter="indexGames"
                    type="text"
                    v-model="searchQuery"
                    placeholder="search games by team"
                  />
                </div>
              </div>

              <div class="row">
                <div v-for="game in games" :key="game.id" class="col-lg-6 col-md-6 d-flex align-items-stretch">
                  <div class="member">
                    <div class="member-img">
                      <img
                        :src="game.performers[0].image"
                        class="img-fluid"
                        alt=""
                        style="object-fit: cover; width: 100%"
                      />
                      <div class="social">
                        <!-- <a href=""><i class="bi bi-twitter"></i></a>
                        <a href=""><i class="bi bi-facebook"></i></a>
                        <a href=""><i class="bi bi-instagram"></i></a>
                        <a href=""><i class="bi bi-linkedin"></i></a> -->
                        <a :href="`/tailgates/new?game_api_id=${game.id}`">Add New Tailgate</a>
                      </div>
                    </div>
                    <div class="member-info">
                      <h4>{{ game.title }}</h4>
                      <p>{{ game.venue.name }} | {{ game.venue.display_location }}</p>
                      <p>{{ game.start_time_conversion }}</p>
                      <div v-if="game.tailgates.length > 0">
                        <h4>Join a tailgate:</h4>
                      </div>
                      <div v-for="tailgate in game.tailgates" v-bind:key="tailgate.id">
                        <div class="tailgate-display" v-if="tailgate">
                          <a :href="`/tailgates/${tailgate.id}`">
                            <h6>{{ tailgate.name }}</h6>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- <div class="games" v-for="game in games" :key="game.id"> -->
          <!-- <a :href="`/tailgates`"> -->
          <!-- <h2>{{ game.title }}</h2>

            <p>{{ game.venue.name }} | {{ game.start_time_conversion }}</p>
            <img :src="game.performers[0].image" alt="" /> -->

          <!-- Allow user to create tailgate for specific game -->
          <!-- <div v-for="tailgate in game.tailgates" v-bind:key="tailgate.id">
              <div class="tailgate-display" v-if="tailgate">
                <h5>Tailgates for this game:</h5>
                <a :href="`/tailgates/${tailgate.id}`">
                  <h3>{{ tailgate.name }}</h3>
                </a>
              </div>
            </div>

            <br /> -->

          <!-- Move user to new game page to enter tailgate specific information -->
          <!-- <div class="add-new-tailgate">
              <a :href="`/tailgates/new?game_api_id=${game.id}`">Add New Tailgate</a>
            </div>
          </div> -->
        </div>

        <div class="col">
          <!-- <h3>College Football Playoff Top 25</h3>
          <div class="team-rankings" v-for="team in rankings" v-bind:key="team.rank">
            {{ team.rank }}. {{ team.school }} ({{ team.conference }})
          </div> -->
          <div class="articles">
            <h3>{{ this.displaySearchQuery }} Stories</h3>
            <div class="article" v-for="article in news" v-bind:key="article.id">
              <!-- <h4>{{ article.source.name }}</h4> -->
              <h4>{{ article.title }}</h4>
              <img :src="`${article.urlToImage}`" style="object-fit: cover; width: 100%" alt="" />
              <p>{{ article.content }}</p>
              <a :href="`${article.url}`">link to full story</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  padding-top: 10px;
}
.articles {
  padding-top: 50px;
}
.article {
  padding-top: 10px;
}
.search {
  padding-top: 20px;
}
.games {
  padding-top: 20px;
}
.tailgate-display {
  padding-top: 10px;
}
.add-new-tailgate {
  padding-top: 10px;
}
</style>

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
      this.rankings = response.data.at(1).polls[0].ranks;
      // this.rankings = response.data.at(-1).polls[3].ranks;
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
