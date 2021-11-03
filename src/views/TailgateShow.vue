<template>
  <div class="tailgate-show">
    <div v-if="showNewTailgate">
      <h2>
        <!-- <input type="text" v-model="tailgate.name" /> -->
        {{ tailgate.name }}
      </h2>

      <div v-if="awayTeamRecord.length !== 0 && homeTeamRecord.length !== 0">
        <p>
          {{ awayTeamRecord[0].team }} ({{ awayTeamRecord[0].total.wins }}-{{ awayTeamRecord[0].total.losses }}) at
          {{ homeTeamRecord[0].team }} ({{ homeTeamRecord[0].total.wins }}-{{ homeTeamRecord[0].total.losses }}) |
          {{ tailgate.game.stadium }}
        </p>
      </div>

      <div v-else>
        <p>{{ tailgate.game.name }} | {{ tailgate.game.stadium }}</p>
      </div>

      <a :href="`/users/${tailgate.user.id}`">
        <p>Host: {{ tailgate.user.user_name }}</p>
      </a>

      <p>{{ tailgate.description }}</p>

      Attending the Tailgate:
      <div v-for="tailgate_user in tailgate.tailgate_users" v-bind:key="tailgate_user.id">
        <a :href="`/users/${tailgate_user.user.id}`">{{ tailgate_user.user.user_name }}</a>
      </div>

      <div v-if="this.current_user.id == tailgate.user_id">
        <button @click="updateTailgate(tailgate)">Update Tailgate</button>
        <button @click="deleteTailgate(tailgate)">Delete Tailgate</button>
      </div>

      <div v-if="this.current_user.id != tailgate.user_id">
        <button @click="joinTailgate()">Join Tailgate</button>
      </div>
    </div>

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
      tailgate: { game: { away_team: {}, tailgate_users: { user: {} } }, user: {} },
      newTailgateUserParams: {},
      newLodgingParams: {},
      newParkingParams: {},
      awayTeamRecord: { team: {} },
      homeTeamRecord: {},
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
        this.homeTeamRecord = response.data;
      });
      axios.get(`/teams?q=${this.tailgate.game.away_team}`).then((response) => {
        console.log("Away team record show", response);
        this.awayTeamRecord = response.data;
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
