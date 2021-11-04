<template>
  <div class="user">
    <h1>Tailgates attending:</h1>

    <div v-for="userTailgate in userTailgatesAttended" v-bind:key="userTailgate.id">
      <h1>{{ userTailgate.tailgate.name }}</h1>
      <h3>{{ userTailgate.game.start_time_conversion.slice(1) }}</h3>
      <p>{{ userTailgate.tailgate.address }}</p>
      <button @click="setCurrentUserTailgate(userTailgate)">More info</button>
    </div>

    <div v-if="currentUserTailgate">
      <h2>
        {{ currentUserTailgate.awayTeamRecord.team }} ({{ currentUserTailgate.awayTeamRecord.total.wins }}-{{
          currentUserTailgate.awayTeamRecord.total.losses
        }}) at {{ currentUserTailgate.homeTeamRecord.team }} ({{ currentUserTailgate.homeTeamRecord.total.wins }}-{{
          currentUserTailgate.homeTeamRecord.total.losses
        }})
      </h2>
      <p>
        {{ currentUserTailgate.awayTeamRecord.team }} {{ currentUserTailgate.awayTeamRecord.conference }} record: ({{
          currentUserTailgate.awayTeamRecord.conferenceGames.wins
        }}-{{ currentUserTailgate.awayTeamRecord.conferenceGames.losses }}) |
        {{ currentUserTailgate.homeTeamRecord.team }} {{ currentUserTailgate.homeTeamRecord.conference }} record: ({{
          currentUserTailgate.homeTeamRecord.conferenceGames.wins
        }}-{{ currentUserTailgate.homeTeamRecord.conferenceGames.losses }})
      </p>
      <p>
        Matchup wins since 1980:
        {{ currentUserTailgate.historicalMatchupRecords.team1 }}:
        {{ currentUserTailgate.historicalMatchupRecords.team1Wins }} |
        {{ currentUserTailgate.historicalMatchupRecords.team2 }}:
        {{ currentUserTailgate.historicalMatchupRecords.team2Wins }}
      </p>
      <p>
        Last matchup outcome:
        {{ currentUserTailgate.historicalMatchupRecords.games.at(-1).awayTeam }} ({{
          currentUserTailgate.historicalMatchupRecords.games.at(-1).awayScore
        }}) at {{ currentUserTailgate.historicalMatchupRecords.games.at(-1).homeTeam }} ({{
          currentUserTailgate.historicalMatchupRecords.games.at(-1).homeScore
        }}) |
        {{ currentUserTailgate.historicalMatchupRecords.games.at(-1).season }}
      </p>
      <p v-if="currentUserTailgate.bets.lines[0].formattedSpread.length !== 0">
        {{ currentUserTailgate.bets.lines[0].formattedSpread }} | Total:
        {{ currentUserTailgate.bets.lines[0].overUnder }}
      </p>

      <h2>Stadium:</h2>
      <h3>{{ currentUserTailgate.game.stadium }}</h3>
      <p>{{ currentUserTailgate.game.address }}</p>
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
      currentUserTailgate: {
        awayTeamRecord: {
          team: {},
          conference: {},
          conferenceGames: { wins: {}, losses: {} },
          total: { wins: {}, losses: {} },
        },
        homeTeamRecord: {
          team: {},
          conference: {},
          conferenceGames: { wins: {}, losses: {} },
          total: { wins: {}, losses: {} },
        },
        historicalMatchupRecords: { team1: {}, team1Wins: {}, team2: {}, team2Wins: {}, games: [{}] },
        bets: { lines: [{ formattedSpread: {}, overUnder: {} }] },
        game: { stadium: {}, address: {} },
      },
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

                  // this.setupMap();

                  // // Stadium
                  // this.addMarkerFromAddress("Stadium", this.userTailgatesAttended.game.stadium);
                  // // My lodging
                  // this.addMarkerFromAddress("Lodging", this.userLodgings.address);
                  // // My Parking
                  // this.addMarkerFromAddress("Parking", this.userParkings.address);
                  // // My tailgate address
                  // this.addMarkerFromAddress("Tailgate", this.userTailgatesAttended.tailgate.address);
                });
            });
          });
        });
      });
    });
  },
  methods: {
    setCurrentUserTailgate: function (userTailgatesAttended) {
      this.currentUserTailgate = userTailgatesAttended;
      console.log("current user tailgate", this.currentUserTailgate);
    },
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

      // Changed these
      this.directions.setOrigin(this.currentUserTailgate.tailgate.address);
      this.directions.setDestination(this.currentUserTailgate.game.address);

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
