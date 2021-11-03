<template>
  <div class="user">
    <h1>Tailgates attending:</h1>
    <div v-for="tailgate in userTailgates" v-bind:key="tailgate.id">
      <h1>{{ tailgate.tailgate.name }} | {{ tailgate.game.name }}</h1>
      <h2>Tailgate:</h2>
      <h3>{{ tailgate.tailgate.name }}</h3>
      <p>{{ tailgate.tailgate.address }}</p>
      <h2>Stadium:</h2>
      <h3>{{ tailgate.game.stadium }}</h3>
      <p>{{ tailgate.game.address }}</p>
      <div v-for="lodging in userLodgings" v-bind:key="lodging.id">
        <div v-if="lodging.tailgate_id === tailgate.tailgate_id">
          <h2>Lodging:</h2>
          <h3>{{ lodging.lodging_name }}</h3>
          <p>{{ lodging.address }}</p>
        </div>
      </div>
    </div>

    <div id="map"></div>
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
/* global mapboxgl, mapboxSdk */

import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      newLodgingParams: {},
      userTailgates: {},
      userLodgings: {},
      place: null,
      mapboxClient: null,
      map: null,
    };
  },
  created: function () {},
  mounted: function () {
    this.setupMap();

    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      console.log("User show", response);
      this.user = response.data;
      axios.get("/lodgings").then((response) => {
        console.log("Lodgings Attending", response);
        this.userLodgings = response.data;
        axios.get("/tailgate_users").then((response) => {
          console.log("Tailgates Attending", response);
          this.userTailgates = response.data;
          // My tailgate address
          this.addMarkerFromAddress(this.userTailgates[0].tailgate.address);
          // Stadium
          this.addMarkerFromAddress(this.userTailgates[0].game.stadium);
          // My lodging
          this.addMarkerFromAddress(this.userLodgings[0].address);
          // My Parking
        });
      });
    });
  },
  methods: {
    setupMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      this.mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      this.map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/satellite-streets-v11", // style URL
        center: [-87.62, 41.88], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
      console.log(this.map);
    },
    addMarkerFromAddress: function (address) {
      this.mapboxClient.geocoding
        .forwardGeocode({
          query: address,
          autocomplete: false,
          limit: 1,
        })
        .send()
        .then((response) => {
          if (!response || !response.body || !response.body.features || !response.body.features.length) {
            console.error("Invalid response:");
            console.error(response);
            return;
          }
          const feature = response.body.features[0];
          // Create a marker and add it to the map.
          new mapboxgl.Marker().setLngLat(feature.center).addTo(this.map);
          this.map.flyTo({ center: feature.center, zoom: 12 });
        });
    },
  },
};
</script>
