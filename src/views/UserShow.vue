<template>
  <div class="user">
    <h1>{{ user }}</h1>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: {},
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      console.log("User show", response);
      this.user = response.data;
    });
  },
  methods: {},
};
</script>
