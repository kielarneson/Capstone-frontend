<template>
  <div class="tailgate-show">
    <h2>
      <input type="text" v-model="tailgate.name" />
    </h2>

    <p>{{ tailgate.game.name }} | {{ tailgate.game.stadium }}</p>

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

    <br />

    <router-link to="/tailgates">Back to tailgates</router-link>
    |
    <router-link to="/games">Back to games</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      current_user: { id: localStorage.getItem("user_id") },
      tailgate: { game: { tailgate_users: { user: {} } }, user: {} },
      newTailgateUserParams: {},
    };
  },
  created: function () {
    axios.get(`/tailgates/${this.$route.params.id}`).then((response) => {
      console.log("tailgate show", response);
      this.tailgate = response.data;
    });
  },
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
        // this.$router.push("/");
      });
    },
  },
};
</script>
