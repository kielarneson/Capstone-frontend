<template>
  <div class="tailgate-show">
    <div v-if="showNewTailgate">
      <h2>
        <!-- Display tailgate name -->
        {{ tailgate.name }}
      </h2>

      <!-- Display team names and teams records if teams records are present -->
      <div v-if="awayTeamRecord.length !== 0 && homeTeamRecord.length !== 0">
        <p>
          {{ awayTeamRecord.team }} ({{ awayTeamRecord.total.wins }}-{{ awayTeamRecord.total.losses }}) at
          {{ homeTeamRecord.team }} ({{ homeTeamRecord.total.wins }}-{{ homeTeamRecord.total.losses }})
          <br />
          {{ awayTeamRecord.team }} {{ awayTeamRecord.conference }} record: ({{
            awayTeamRecord.conferenceGames.wins
          }}-{{ awayTeamRecord.conferenceGames.losses }}) | {{ homeTeamRecord.team }}
          {{ homeTeamRecord.conference }} record: ({{ homeTeamRecord.conferenceGames.wins }}-{{
            homeTeamRecord.conferenceGames.losses
          }})
          <br />
          {{ tailgate.game.stadium }}
        </p>
      </div>
      <!-- If not present, get game title from tailgate -->
      <div v-else>
        <p>{{ tailgate.game.name }} | {{ tailgate.game.stadium }}</p>
      </div>

      <!-- Display tailgate host and link to profile -->
      <a :href="`/users/${tailgate.user.id}`">
        <p>Host: {{ tailgate.user.user_name }}</p>
      </a>

      <!-- Display tailgate description -->
      Tailgate information:
      <p>{{ tailgate.description }}</p>

      <!-- Display amenities offered -->
      Amenities offered:
      <div class="tailgate-amenities">
        <p v-if="tailgate.parking_available === true">Parking available</p>
        <p v-if="tailgate.private_bathroom === true">Private bathroom</p>
        <p v-if="tailgate.alcohol_allowed === true">Alcohol allowed</p>
        <p v-if="tailgate.food_provided === true">Food provided</p>
        <p v-if="tailgate.family_friendly === true">Family friendly</p>
        <p v-if="tailgate.tv_available === true">Tv available</p>
      </div>

      <!-- Display who is attending this tailgate -->
      Attending the Tailgate:
      <div v-for="tailgate_user in tailgate.tailgate_users" v-bind:key="tailgate_user.id">
        <a :href="`/users/${tailgate_user.user.id}`">{{ tailgate_user.user.user_name }}</a>
      </div>
      <!-- If current user created this tailgate allow them to update and delete it -->
      <div v-if="this.current_user.id == tailgate.user_id">
        <button @click="updateTailgate(tailgate)">Update Tailgate</button>
        <button @click="deleteTailgate(tailgate)">Delete Tailgate</button>
      </div>
      <!-- If not allow the user to join the tailgate -->
      <div v-if="this.current_user.id != tailgate.user_id">
        <button @click="joinTailgate()">Join Tailgate</button>
      </div>
    </div>

    <!-- Add lodging and parking information if user has joined the tailgate -->
    <div class="locations-new" v-else>
      <h1>Input Lodging</h1>
      <form v-on:submit.prevent="createLocations()">
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        Lodging type:
        <input type="text" v-model="newLodgingParams.lodging_type" />
        Lodging name:
        <input type="text" v-model="newLodgingParams.lodging_name" />
        Address:
        <input type="text" v-model="newLodgingParams.address" />

        <h1>Input Parking</h1>
        Parking type:
        <input type="text" v-model="newParkingParams.parking_type" />
        Address:
        <input type="text" v-model="newParkingParams.address" />
        <input type="submit" value="Create" />
      </form>
    </div>

    <br />

    <!-- Go back to tailgates index or games index -->
    <router-link to="/tailgates">Back to tailgates</router-link>
    |
    <router-link to="/games">Back to games</router-link>
  </div>
</template>

<style scoped></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      current_user: { id: localStorage.getItem("user_id") },
      tailgate: { game: { away_team: {}, home_team: {}, tailgate_users: { user: {} } }, user: {} },
      newTailgateUserParams: {},
      newLodgingParams: {},
      newParkingParams: {},
      awayTeamRecord: { total: { wins: {} }, conferenceGames: { wins: {} } },
      homeTeamRecord: { total: { wins: {}, losses: {} }, conferenceGames: { wins: {} } },
      showNewTailgate: true,
      errors: {},
    };
  },
  created: function () {
    // Good example of requests running in sequence and then in parallel
    axios.get(`/tailgates/${this.$route.params.id}`).then((response) => {
      console.log("tailgate show", response);
      this.tailgate = response.data;
      axios.get(`/teams?q=${this.tailgate.game.home_team}`).then((response) => {
        console.log("Home team record show", response);
        this.homeTeamRecord = response.data[0];
      });
      axios.get(`/teams?q=${this.tailgate.game.away_team}`).then((response) => {
        console.log("Away team record show", response);
        this.awayTeamRecord = response.data[0];
      });
    });
    // Most readable way of making multiple get requests simultaneously
    // axios
    //   .get(`/tailgates/${this.$route.params.id}`)
    //   .then((response) => {
    //     console.log("tailgate show", response);
    //     this.tailgate = response.data;
    //     return this.tailgate;
    //   })
    //   .then((tailgate) => {
    //     return axios.get(`/teams?q=${tailgate.game.away_team}`);
    //   })
    //   .then((response) => {
    //     console.log("Away team record show", response);
    //     this.awayTeamRecord = response.data;
    //   });
  },
  mounted: function () {},
  methods: {
    updateTailgate: function (tailgate) {
      var editTailgateParams = tailgate;
      axios
        .patch(`/tailgates/${this.$route.params.id}`, editTailgateParams)
        .then((response) => {
          console.log("Tailgate update", response);
          this.tailgate = {};
        })
        .catch((error) => {
          console.log("Tailgate update error", error.response);
        });
    },
    deleteTailgate: function (tailgate) {
      axios.delete(`/tailgates/${this.$route.params.id}`).then((response) => {
        console.log("Tailgate delete", response);
        tailgate;
        this.$router.push("/games");
      });
    },
    joinTailgate: function () {
      this.newTailgateUserParams = {
        user_id: this.current_user.id,
        tailgate_id: this.tailgate.id,
        game_id: this.tailgate.game_id,
      };

      axios.post(`/tailgate_users`, this.newTailgateUserParams).then((response) => {
        console.log("Tailgate Users create", response);
        this.showNewTailgate = false;
      });
    },
    createLocations: function () {
      this.newLodgingParams.user_id = this.current_user.id;
      this.newLodgingParams.tailgate_id = this.tailgate.id;

      axios.post(`/lodgings`, this.newLodgingParams).then((response) => {
        console.log("Lodgings create", response);
      });
      this.newParkingParams.user_id = this.current_user.id;
      this.newParkingParams.tailgate_id = this.tailgate.id;

      axios.post(`/parkings`, this.newParkingParams).then((response) => {
        console.log("Parkings create", response);
        this.$router.push(`/users/${this.current_user.id}`);
      });
    },
  },
};
</script>
