<template>
  <div class="user">
    <div v-for="userTailgate in user.tailgate_users" v-bind:key="userTailgate.id">
      <h1>{{ userTailgate.tailgate.name }}</h1>
      <h4>
        Tailgate: {{ userTailgate.tailgate.address }} | {{ userTailgate.tailgate.start_time_conversion }} -
        {{ userTailgate.tailgate.end_time_conversion }}
      </h4>
      <h4>Game: {{ userTailgate.game.name }} | {{ userTailgate.game.start_time_conversion }}</h4>

      <!-- I dont understand how this works and it is probably wrong -->
      <button @click="setCurrentUserTailgate(userTailgate)">More info</button>
    </div>

    <div v-if="currentUserTailgate.show">
      <h1>{{ currentUserTailgate.game.name }}</h1>
      <h2>
        {{ currentUserTailgate.awayTeamRecord.team }} ({{ currentUserTailgate.awayTeamRecord.total.wins }}-{{
          currentUserTailgate.awayTeamRecord.total.losses
        }}) | {{ currentUserTailgate.homeTeamRecord.team }} ({{ currentUserTailgate.homeTeamRecord.total.wins }}-{{
          currentUserTailgate.homeTeamRecord.total.losses
        }})
      </h2>
      <h3>
        {{ currentUserTailgate.awayTeamRecord.team }} {{ currentUserTailgate.awayTeamRecord.conference }} record: ({{
          currentUserTailgate.awayTeamRecord.conferenceGames.wins
        }}-{{ currentUserTailgate.awayTeamRecord.conferenceGames.losses }}) |
        {{ currentUserTailgate.homeTeamRecord.team }} {{ currentUserTailgate.homeTeamRecord.conference }} record: ({{
          currentUserTailgate.homeTeamRecord.conferenceGames.wins
        }}-{{ currentUserTailgate.homeTeamRecord.conferenceGames.losses }})
      </h3>
      <h4>
        Matchup wins since 1980:
        {{ currentUserTailgate.historicalMatchupRecords.team1 }}:
        {{ currentUserTailgate.historicalMatchupRecords.team1Wins }} |
        {{ currentUserTailgate.historicalMatchupRecords.team2 }}:
        {{ currentUserTailgate.historicalMatchupRecords.team2Wins }}
      </h4>
      <h4>
        Last matchup outcome:
        {{ currentUserTailgate.historicalMatchupRecords.games.at(-1).awayTeam }} ({{
          currentUserTailgate.historicalMatchupRecords.games.at(-1).awayScore
        }}) at {{ currentUserTailgate.historicalMatchupRecords.games.at(-1).homeTeam }} ({{
          currentUserTailgate.historicalMatchupRecords.games.at(-1).homeScore
        }}) |
        {{ currentUserTailgate.historicalMatchupRecords.games.at(-1).season }}
      </h4>
      <!-- TODO -->
      <!-- Console is yelling at me because the second tailgate doesn't have betting information yet -->
      <!-- <div v-if="currentUserTailgate.bets.lines[0].formattedSpread.length !== 0">
        <h4>
          {{ currentUserTailgate.bets.lines[0].formattedSpread }} | Total:
          {{ currentUserTailgate.bets.lines[0].overUnder }}
        </h4>
      </div> -->

      <!-- TODO -->
      <!-- FIRST THING TO CHECK OUT IN THE MORNING -->
      <!-- <div v-else-if="currentUserTailgate.bets.lines[0].formattedSpread === undefined">
        <h4>No betting data available at this time</h4>
      </div> -->

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
.mapboxgl-ctrl-top-left {
  top: 78px !important;
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
      // userLodgings: {},
      // userParkings: {},
      currentUserTailgate: {
        show: false,
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
        // TODO
        // // Adding .length to the end of bets made ERROR formattedSpread undefined go away
        // Check out new ERROR
        bets: { lines: [{}] },
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
      this.user = {
        ...response.data,
        tailgate_users: response.data.tailgate_users.map((userTailgate) => {
          return {
            ...userTailgate,
            awayTeamRecord: { total: {}, conferenceGames: {} },
            homeTeamRecord: { total: {}, conferenceGames: {} },
            historicalMatchupRecords: { games: [{}] },
            bets: { lines: [{}] },
          };
        }),
      };
      console.log("FDJSFDFDS", this.user);
      // this.user = response.data;

      // Attaching all of the following web responses to userTailgateAttended
      this.user.tailgate_users.forEach((userTailgate) => {
        axios.get(`/records?q=${userTailgate.game.home_team}`).then((response) => {
          console.log("Home team record index", response);
          userTailgate.homeTeamRecord = response.data[0];
        });
        axios.get(`/records?q=${userTailgate.game.away_team}`).then((response) => {
          console.log("Away team record index", response);
          userTailgate.awayTeamRecord = response.data[0];
        });
        axios
          .get(`/historical_matchup_records?team1=${userTailgate.game.away_team}&team2=${userTailgate.game.home_team}`)
          .then((response) => {
            console.log("Historical matchup records index", response);
            userTailgate.historicalMatchupRecords = response.data;
          });
        axios.get(`/bets?away=${userTailgate.game.away_team}&home=${userTailgate.game.home_team}`).then((response) => {
          console.log("Bets show", response.data);
          userTailgate.bets = response.data[0];
        });
      });
    });
  },
  methods: {
    setCurrentUserTailgate: function (userTailgate) {
      this.currentUserTailgate = userTailgate;
      this.currentUserTailgate.show = true;

      this.setupMap();

      this.addMarkerFromAddress("Stadium", this.currentUserTailgate.game.address);
      this.addMarkerFromAddress("Tailgate", this.currentUserTailgate.tailgate.address);
      this.addMarkerFromAddress("Lodging", this.currentUserTailgate.lodgings[0].address);
      this.addMarkerFromAddress("Parking", this.currentUserTailgate.parkings[0].address);

      console.log("current user tailgate", this.currentUserTailgate);
    },
    setupMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      this.mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      this.map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/satellite-streets-v11", // style URL
        // Center is set to Chicago
        center: [-87.62, 41.88], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });

      this.directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      });
      this.map.addControl(this.directions, "top-left");

      // Changed these
      this.directions.setOrigin(this.currentUserTailgate.lodgings[0].address);
      this.directions.setDestination(this.currentUserTailgate.parkings[0].address);

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
          this.map.flyTo({ center: feature.center, zoom: 12.5 });
        });
    },
  },
};
</script>
