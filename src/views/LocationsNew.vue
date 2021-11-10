<template>
  <div class="locations">
    <div class="team section-bg">
      <div class="row">
        <div class="col">
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
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      errors: {},
      newLodgingParams: {},
      newParkingParams: {},
      current_user: { id: localStorage.getItem("user_id") },
    };
  },
  created: function () {},
  methods: {
    createLocations: function () {
      this.newLodgingParams.tailgate_user_id = this.current_user.id;

      axios.post(`/lodgings`, this.newLodgingParams).then((response) => {
        console.log("Lodgings create", response);
      });
      this.newParkingParams.tailgate_user_id = this.current_user.id;

      axios.post(`/parkings`, this.newParkingParams).then((response) => {
        console.log("Parkings create", response);
        this.$router.push(`/users/${this.current_user.id}`);
      });
    },
  },
};
</script>
