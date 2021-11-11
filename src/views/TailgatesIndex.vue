<template>
  <div class="tailgates">
    <div class="container">
      <div class="row">
        <!-- <h1>Upcoming {{ this.displaySearchQuery }} Games</h1> -->

        <!-- <div class="search">
            <input @keyup.enter="indexGames" type="text" v-model="searchQuery" placeholder="search games by team" />
          </div> -->

        <section id="tailgate" class="team section-bg">
          <div class="container">
            <div class="section-title">
              <h2>Upcoming Tailgates</h2>
              <!-- <p>
                  Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
                  consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia
                  fugiat sit in iste officiis commodi quidem hic quas.
                </p> -->
              <div>
                <input type="text" v-model="gameFilter" placeholder="search tailgates" />
              </div>
            </div>

            <div class="row">
              <div v-for="tailgate in filterBy(tailgates, gameFilter)" v-bind:key="tailgate.id">
                <div class="member">
                  <div class="member-img">
                    <div class="social">
                      <!-- <a href=""><i class="bi bi-twitter"></i></a>
                        <a href=""><i class="bi bi-facebook"></i></a>
                        <a href=""><i class="bi bi-instagram"></i></a>
                        <a href=""><i class="bi bi-linkedin"></i></a> -->
                      <!-- <a :href="`/tailgates/new?game_api_id=${game.id}`">Add New Tailgate</a> -->
                    </div>
                  </div>
                  <div class="member-info">
                    <div class="row">
                      <div class="col">
                        <a :href="`/tailgates/${tailgate.id}`">
                          <img class="tailgate-image" :src="`${tailgate.image_url}`" alt="" />
                        </a>
                      </div>
                      <div class="col tailgate-info">
                        <a :href="`/tailgates/${tailgate.id}`">
                          <h2>{{ tailgate.name }}</h2>
                        </a>
                        <h4>
                          <a :href="`/users/${tailgate.user.id}`">Host: {{ tailgate.user.user_name }}</a>
                        </h4>
                        <!-- <h4>About:</h4>
                        <h6>{{ tailgate.description }}</h6> -->
                        <!-- <h4>Tailgate info:</h4>
                        <h6>Address: {{ tailgate.address }}</h6> -->
                        <h4>Tailgate info:</h4>
                        <h6>{{ tailgate.start_time_conversion }} - {{ tailgate.end_time_conversion }}</h6>
                        <h4>Game info:</h4>
                        <h6>{{ tailgate.game.name }}</h6>
                        <h6>{{ tailgate.game.stadium }} | {{ tailgate.game.start_time_conversion }}</h6>
                        <h6></h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
#map {
  height: 750px;
}
.tailgate-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
.tailgate-info {
  text-align: left;
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      tailgates: [],
      gameFilter: "",
      place: null,
      mapboxClient: null,
      map: null,
    };
  },
  mounted: function () {
    this.indexTailgates();
  },
  methods: {
    indexTailgates: function () {
      axios.get("/tailgates").then((response) => {
        console.log("Tailgate index", response);
        this.tailgates = response.data;
      });
    },
  },
};
</script>
