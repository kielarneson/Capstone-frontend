<template>
  <div class="tailgate-show">
    <h2>{{ tailgate.name }}</h2>
    <p>{{ tailgate.game.name }} | {{ tailgate.game.stadium }}</p>
    <p>{{ tailgate.user.user_name }}</p>
    <p>{{ tailgate.description }}</p>
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
      tailgate: { game: {}, user: {} },
    };
  },
  created: function () {
    axios.get(`/tailgates/${this.$route.params.id}`).then((response) => {
      console.log("tailgate show", response);
      this.tailgate = response.data;
    });
  },
  methods: {},
};
</script>
