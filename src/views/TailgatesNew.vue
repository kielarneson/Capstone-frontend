<template>
  <div>
    <div class="game">
      <h2>{{ game.title }}</h2>
      <p>{{ game.venue.name }} | {{ game.datetime_local }}</p>
    </div>
    <div class="tailgates-new">
      <h1>Add Tailgate</h1>
      <form v-on:submit.prevent="createGameAndTailgate()">
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        Name:
        <input type="text" v-model="newTailgateParams.name" />
        Description:
        <input type="text" v-model="newTailgateParams.description" />
        Address:
        <input type="text" v-model="newTailgateParams.address" />
        Start time:
        <input type="datetime-local" v-model="newTailgateParams.start_time" />
        End time:
        <input type="datetime-local" v-model="newTailgateParams.end_time" />
        <input type="submit" value="Create" />
      </form>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      game: { venue: {} },
      newTailgateParams: {},
      errors: [],
    };
  },
  created: function () {
    console.log("Game api id", this.$route.query.game_api_id);
    axios.get(`/games/${this.$route.query.game_api_id}`).then((response) => {
      console.log("Game show", response);
      this.game = response.data;
    });
  },
  methods: {
    createGameAndTailgate: function () {
      var newGameParams = {
        api_id: this.game.id,
        name: this.game.title,
        away_team: this.game.performers[1].short_name,
        away_team_conference: this.game.performers[1].divisions[1].display_name,
        home_team: this.game.performers[0].short_name,
        home_team_conference: this.game.performers[0].divisions[1].display_name,
        stadium: this.game.venue.name,
        address: `${this.game.venue.address}, ${this.game.venue.extended_address}`,
        start_time: this.game.datetime_local,
      };
      axios
        .post("/games", newGameParams)
        .then((response) => {
          console.log("Game create", response);
          this.newTailgateParams.game_id = response.data.game.id;
          console.log("newTailgateParams!!!", this.newTailgateParams);
          axios
            .post("/tailgates", this.newTailgateParams)
            .then((response) => {
              console.log("Tailgate create", response);
              this.$router.push("/tailgates");
            })
            .catch((error) => {
              console.log("Tailgate create error", error.response);
              this.errors = error.response.data.errors;
            });
        })
        .catch((error) => {
          console.log("Game create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
