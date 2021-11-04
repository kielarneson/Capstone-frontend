<template>
  <div class="user">
    <h1>Tailgates attending:</h1>

    <div v-for="tailgateAttended in userTailgatesAttended" v-bind:key="tailgateAttended.id">
      <h1>{{ tailgateAttended.tailgate.name }}</h1>
      <h3>{{ tailgateAttended.game.start_time_conversion.slice(1) }}</h3>
      <p>{{ tailgateAttended.tailgate.address }}</p>
      <h2>
        {{ tailgateAttended.awayTeamRecord.team }} ({{ tailgateAttended.awayTeamRecord.total.wins }}-{{
          tailgateAttended.awayTeamRecord.total.losses
        }}) at {{ tailgateAttended.homeTeamRecord.team }} ({{ tailgateAttended.homeTeamRecord.total.wins }}-{{
          tailgateAttended.homeTeamRecord.total.losses
        }})
      </h2>
      <p>
        {{ tailgateAttended.awayTeamRecord.team }} {{ tailgateAttended.awayTeamRecord.conference }} record: ({{
          tailgateAttended.awayTeamRecord.conferenceGames.wins
        }}-{{ tailgateAttended.awayTeamRecord.conferenceGames.losses }}) | {{ tailgateAttended.homeTeamRecord.team }}
        {{ tailgateAttended.homeTeamRecord.conference }} record: ({{
          tailgateAttended.homeTeamRecord.conferenceGames.wins
        }}-{{ tailgateAttended.homeTeamRecord.conferenceGames.losses }})
      </p>
      <p>
        Matchup wins since 1980:
        {{ tailgateAttended.historicalMatchupRecords.team1 }}:
        {{ tailgateAttended.historicalMatchupRecords.team1Wins }} |
        {{ tailgateAttended.historicalMatchupRecords.team2 }}: {{ tailgateAttended.historicalMatchupRecords.team2Wins }}
      </p>
      <p>
        Last matchup outcome:
        {{ tailgateAttended.historicalMatchupRecords.games.at(-1).awayTeam }} ({{
          tailgateAttended.historicalMatchupRecords.games.at(-1).awayScore
        }}) at {{ tailgateAttended.historicalMatchupRecords.games.at(-1).homeTeam }} ({{
          tailgateAttended.historicalMatchupRecords.games.at(-1).homeScore
        }}) |
        {{ tailgateAttended.historicalMatchupRecords.games.at(-1).season }}
      </p>
      Betting:
      <p>
        {{ tailgateAttended.bets.lines[0].formattedSpread }} | Total: {{ tailgateAttended.bets.lines[0].overUnder }}
      </p>

      <h2>Stadium:</h2>
      <h3>{{ tailgateAttended.game.stadium }}</h3>
      <p>{{ tailgateAttended.game.address }}</p>
      <div v-for="lodging in userLodgings" v-bind:key="lodging.id">
        <div v-if="lodging.tailgate_id === tailgateAttended.tailgate_id">
          <h2>Lodging:</h2>
          <h3>{{ lodging.lodging_name }}</h3>
          <p>{{ lodging.address }}</p>
        </div>
      </div>
      <div v-for="parking in userParkings" v-bind:key="parking.id">
        <div v-if="parking.tailgate_id === tailgateAttended.tailgate_id">
          <h2>Parking:</h2>
          <p>{{ parking.address }}</p>
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
/* global mapboxgl, mapboxSdk, MapboxDirections */

import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      userTailgatesAttended: {},
      userLodgings: {},
      userParkings: {},
      // awayTeamRecord: { total: { wins: {}, losses: {} }, conferenceGames: { wins: {} } },
      // homeTeamRecord: { total: { wins: {}, losses: {} }, conferenceGames: { wins: {} } },
      // historicalMatchupRecords: {},
      // bets: {},
      place: null,
      mapboxClient: null,
      map: null,
      directions: null,
    };
  },
  created: function () {},
  mounted: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      console.log("User show", response);
      this.user = response.data;
      axios.get("/lodgings").then((response) => {
        console.log("Lodgings Attending", response);
        this.userLodgings = response.data;
        axios.get("/parkings").then((response) => {
          console.log("Parkings Attending", response);
          this.userParkings = response.data;

          axios.get("/tailgate_users").then((response) => {
            console.log("Tailgates Attending", response);
            this.userTailgatesAttended = response.data.map((userTailgate) => {
              return {
                ...userTailgate,
                awayTeamRecord: { total: {}, conferenceGames: {} },
                homeTeamRecord: { total: {}, conferenceGames: {} },
                historicalMatchupRecords: { games: [{}] },
                bets: { lines: [{}] },
              };
            });

            this.setupMap();

            // Stadium
            this.addMarkerFromAddress("Stadium", this.userTailgatesAttended[0].game.stadium);
            // My lodging
            this.addMarkerFromAddress("Lodging", this.userLodgings[0].address);
            // My Parking
            this.addMarkerFromAddress("Parking", this.userParkings[0].address);
            // My tailgate address
            this.addMarkerFromAddress("Tailgate", this.userTailgatesAttended[0].tailgate.address);

            this.userTailgatesAttended.forEach((userTailgate) => {
              axios.get(`/records?q=${userTailgate.game.home_team}`).then((response) => {
                console.log("Home team record index", response);
                userTailgate.homeTeamRecord = response.data[0];
              });
              axios.get(`/records?q=${userTailgate.game.away_team}`).then((response) => {
                console.log("Away team record index", response);
                userTailgate.awayTeamRecord = response.data[0];
              });
              axios
                .get(
                  `/historical_matchup_records?team1=${userTailgate.game.away_team}&team2=${userTailgate.game.home_team}`
                )
                .then((response) => {
                  console.log("Historical matchup records index", response);
                  userTailgate.historicalMatchupRecords = response.data;
                });
              axios
                .get(`/bets?away=${userTailgate.game.away_team}&home=${userTailgate.game.home_team}`)
                .then((response) => {
                  console.log("Bets show", response.data);
                  userTailgate.bets = response.data[0];
                });
            });
          });
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

      this.directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      });
      this.map.addControl(this.directions, "top-left");

      this.directions.setOrigin(this.userTailgatesAttended[0].tailgate.address);
      this.directions.setDestination(this.userTailgatesAttended[0].game.address);

      console.log(this.map);
    },

    addMarkerFromAddress: function (description, address) {
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
          new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
            .setLngLat(feature.center)
            .setHTML(description)
            .addTo(this.map);
          this.map.flyTo({ center: feature.center, zoom: 12 });
        });
    },
  },
};
</script>
