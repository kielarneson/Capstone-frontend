<template>
  <div>
    <div class="game">
      <div class="container">
        <div class="row">
          <!-- <h1>Upcoming {{ this.displaySearchQuery }} Games</h1> -->

          <!-- <div class="search">
              <input @keyup.enter="indexGames" type="text" v-model="searchQuery" placeholder="search games by team" />
            </div> -->

          <section id="user" class="team section-bg">
            <div class="container">
              <div class="section-title">
                <h2>Create New Tailgate</h2>
                <h4>{{ game.title }}</h4>
                <h6>{{ game.venue.name }} | {{ game.start_time_conversion }}</h6>
              </div>
              <div class="row">
                <form v-on:submit.prevent="createGameAndTailgate()">
                  <div class="form-group">
                    <label for="exampleInputName1">Name</label>
                    <input type="text" class="form-control" v-model="newTailgateParams.name" />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputImageURL1">Image URL</label>
                    <input type="text" class="form-control" v-model="newTailgateParams.image_url" />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputDescription1">Description</label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      v-model="newTailgateParams.description"
                      rows="3"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputAddress1">Address</label>
                    <input type="text" class="form-control" v-model="newTailgateParams.address" />
                  </div>

                  <div class="row">
                    <div class="col">
                      <div class="form-group">
                        <label for="exampleInputStartTime1">Start Time</label>
                        <input type="datetime-local" class="form-control" v-model="newTailgateParams.start_time" />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <label for="exampleInputEndTime1">End Time</label>
                        <input type="datetime-local" class="form-control" v-model="newTailgateParams.end_time" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <input type="checkbox" id="checkbox" v-model="newTailgateParams.parking_available" />
                      <label for="checkbox">{{ "Parking available?" }}</label>
                    </div>
                    <div class="col">
                      <input type="checkbox" id="checkbox" v-model="newTailgateParams.private_bathroom" />
                      <label for="checkbox">{{ "Private bathroom?" }}</label>
                    </div>
                    <div class="col">
                      <input type="checkbox" id="checkbox" v-model="newTailgateParams.alcohol_allowed" />
                      <label for="checkbox">{{ "Alcohol allowed?" }}</label>
                    </div>
                    <div class="col">
                      <input type="checkbox" id="checkbox" v-model="newTailgateParams.food_provided" />
                      <label for="checkbox">{{ "Food provided?" }}</label>
                    </div>
                    <div class="col">
                      <input type="checkbox" id="checkbox" v-model="newTailgateParams.family_friendly" />
                      <label for="checkbox">{{ "Family friendly?" }}</label>
                    </div>
                    <div class="col">
                      <input type="checkbox" id="checkbox" v-model="newTailgateParams.tv_available" />
                      <label for="checkbox">{{ "Tv available?" }}</label>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary">Create</button>
                </form>
                <div class="member">
                  <div class="member-img">
                    <div class="social">
                      <!-- <a href=""><i class="bi bi-twitter"></i></a>
                          <a href=""><i class="bi bi-facebook"></i></a>
                          <a href=""><i class="bi bi-instagram"></i></a>
                          <a href=""><i class="bi bi-linkedin"></i></a> -->
                      <!-- <a :href="`/tailgates/new?game_api_id=${game.id}`">Add New Tailgate</a> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <!-- <div class="tailgates-new">
      <h1>Add Tailgate</h1>
      <form v-on:submit.prevent="createGameAndTailgate()">
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        Name:
        <input type="text" v-model="newTailgateParams.name" />
        Image:
        <input type="text" v-model="newTailgateParams.image_url" />
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
    </div> -->
  </div>
</template>

<style>
.form-group {
  width: flex;
}
</style>

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
