<template>
  <div class="tailgates">
    <div v-for="tailgate in tailgates" v-bind:key="tailgate.id">
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
    <div v-for="game in games" v-bind:key="game.id">
      {{ game.venue }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      tailgates: [],
      games: [],
      // currentTailgate: {},
    };
  },
  created: function () {
    this.indexTailgates();
    this.indexGames();
  },
  methods: {
    indexTailgates: function () {
      axios.get("/tailgates").then((response) => {
        console.log("Tailgate index", response);
        this.tailgates = response.data;
      });
    },
    indexGames: function () {
      axios.get("/games").then((response) => {
        console.log("Games index", response);
        this.games = response.data;
      });
    },
  },
};
</script>
