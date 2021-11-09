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
                    <!-- <img
                      :src="game.performers[0].image"
                      class="img-fluid"
                      alt=""
                      style="object-fit: cover; width: 100%"
                    /> -->
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
                        <h4>About:</h4>
                        <h6>{{ tailgate.description }}</h6>
                        <h4>Tailgate info:</h4>
                        <h6>Address: {{ tailgate.address }}</h6>
                        <h6>
                          Time and date: {{ tailgate.start_time_conversion }} - {{ tailgate.end_time_conversion }}
                        </h6>
                        <h4>Game info:</h4>
                        <h6>{{ tailgate.game.name }} | {{ tailgate.game.start_time_conversion }}</h6>
                        <!-- <h4>{{ game.title }}</h4>
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
                    </div> -->
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
    </div>

    <!-- <div>
      <input type="text" v-model="gameFilter" placeholder="search tailgates" />
    </div>
    <div v-for="tailgate in filterBy(tailgates, gameFilter)" v-bind:key="tailgate.id">
      <a :href="`/tailgates/${tailgate.id}`">
        <h2>{{ tailgate.name }}</h2>
      </a>
      <h3>
        <a :href="`/users/${tailgate.user.id}`">
          {{ tailgate.user.user_name }}
        </a>
        | {{ tailgate.address }} | {{ tailgate.start_time_conversion }} -
        {{ tailgate.end_time_conversion }}
      </h3>
      <h4>
        {{ tailgate.game.name }} | {{ tailgate.game.address }} |
        {{ tailgate.game.start_time_conversion }}
      </h4> -->
    <!-- <p>{{ tailgate.description }}</p> -->
    <!-- <p>{{ tailgate }}</p> -->
    <!-- </div> -->
    <!-- <div id="map"></div> -->
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
  height: 350px;
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
  // /* global mapboxgl, mapboxSdk */
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      tailgates: [],
      gameFilter: "",
      place: null,
      mapboxClient: null,
      map: null,
      // directions: null,
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
        // this.setupMap();
      });
    },
    // setupMap: function () {
    //   mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
    //   this.mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    //   this.map = new mapboxgl.Map({
    //     container: "map", // container ID
    //     style: "mapbox://styles/mapbox/satellite-streets-v11", // style URL
    //     center: [-98.35, 39.5], // starting position [lng, lat]
    //     zoom: 4, // starting zoom
    //   });

    //   // this.directions = new MapboxDirections({
    //   //   accessToken: mapboxgl.accessToken,
    //   // });
    //   // this.map.addControl(this.directions, "top-left");

    //   // // Changed these
    //   // this.directions.setOrigin(this.currentUserTailgate.lodgings[0].address);
    //   // this.directions.setDestination(this.currentUserTailgate.parkings[0].address);

    //   console.log(this.map);

    //   this.tailgates.forEach((tailgate) => {
    //     this.addMarkerFromAddress(tailgate.name, tailgate.address);
    //   });
    // },

    // addMarkerFromAddress: function (description, address) {
    //   this.mapboxClient.geocoding
    //     .forwardGeocode({
    //       query: address,
    //       autocomplete: false,
    //       limit: 1,
    //     })
    //     .send()
    //     .then((response) => {
    //       if (!response || !response.body || !response.body.features || !response.body.features.length) {
    //         console.error("Invalid response:");
    //         console.error(response);
    //         return;
    //       }

    //       const feature = response.body.features[0];
    //       // Create a marker and add it to the map.
    //       new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
    //         .setLngLat(feature.center)
    //         .setHTML(description)
    //         .addTo(this.map);
    //       // this.map.flyTo({ center: feature.center, zoom: 12 });
    //     });
    // },
  },
};
</script>
