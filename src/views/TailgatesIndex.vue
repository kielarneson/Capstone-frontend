<template>
  <div class="tailgates">
    <div>
      <input type="text" v-model="gameFilter" placeholder="search tailgates by game" />
    </div>
    <div v-for="tailgate in filterBy(tailgates, gameFilter, 'game')" v-bind:key="tailgate.id">
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
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      tailgates: [],
      gameFilter: "",
    };
  },
  created: function () {
    this.indexTailgates();
  },
  methods: {
    indexTailgates: function () {
      axios.get("/tailgates").then((response) => {
        console.log("Tailgate index", response);
        this.tailgates = response.data;
      });
    },
  },
};
</script>
