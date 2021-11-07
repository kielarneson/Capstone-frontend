<template>
  <div class="tailgates">
    <div>
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
        {{ tailgate.game.start_time_conversion.slice(1) }}
      </h4>
      <!-- <p>{{ tailgate.description }}</p> -->
      <!-- <p>{{ tailgate }}</p> -->
    </div>
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
