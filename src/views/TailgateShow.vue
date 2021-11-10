<template>
  <div class="tailgate">
    <div class="container">
      <div class="row">
        <section id="tailgate" class="team section-bg">
          <div class="container">
            <div class="section-title">
              <h2>{{ tailgate.name }}</h2>
              <h4>{{ tailgate.game.name }}</h4>

              <!-- <a :href="`/tailgates/${tailgate.id}`">
                <img class="tailgate-image" :src="`${tailgate.image_url}`" alt="" />
              </a> -->
              <!-- <h2>Upcoming Tailgates</h2> -->

              <br />
              <h6>{{ tailgate.description }}</h6>
              <br />
              <h5>
                <a :href="`/users/${tailgate.user.id}`">Host: {{ tailgate.user.user_name }}</a>
              </h5>
              <!-- <p>
                Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
                consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat
                sit in iste officiis commodi quidem hic quas.
              </p> -->
            </div>

            <div class="row">
              <div class="member">
                <div class="member-img">
                  <a :href="`/tailgates/${tailgate.id}`">
                    <img class="tailgate-image" :src="`${tailgate.image_url}`" alt="" />
                  </a>
                  <!-- <img
                      :src="game.performers[0].image"
                      class="img-fluid"
                      alt=""
                      style="object-fit: cover; width: 100%"
                    /> -->
                  <!-- <div class="social"> -->
                  <!-- <a href=""><i class="bi bi-twitter"></i></a>
                        <a href=""><i class="bi bi-facebook"></i></a>
                        <a href=""><i class="bi bi-instagram"></i></a>
                        <a href=""><i class="bi bi-linkedin"></i></a> -->
                  <!-- <a :href="`/tailgates/new?game_api_id=${game.id}`">Add New Tailgate</a> -->
                  <!-- </div> -->
                </div>

                <div class="member-info">
                  <div class="row">
                    <div class="col tailgate-info">
                      <h4>Tailgate Info</h4>
                      <h6>{{ tailgate.start_time_conversion }} - {{ tailgate.end_time_conversion }}</h6>
                      <h6>{{ tailgate.address }}</h6>
                    </div>

                    <div class="col tailgate-info">
                      <h4>Game Info</h4>
                      <h6>{{ tailgate.game.stadium }} | {{ tailgate.game.start_time_conversion }}</h6>
                      <h6>{{ tailgate.game.address }}</h6>
                      <!-- <h4>Tailgate Info</h4>
                      <h6>{{ tailgate.start_time_conversion }} - {{ tailgate.end_time_conversion }}</h6>
                      <h6>{{ tailgate.address }}</h6> -->
                    </div>
                  </div>
                </div>

                <div class="member-info">
                  <div class="row">
                    <span class="d-inline" v-if="tailgate.parking_available === true">
                      <i class="bi bi-check-circle-fill"></i>
                      Parking available
                    </span>
                    <span class="d-inline" v-if="tailgate.private_bathroom === true">
                      <i class="bi bi-check-circle-fill"></i>
                      Private bathroom
                    </span>
                    <span class="d-inline" v-if="tailgate.alcohol_allowed === true">
                      <i class="bi bi-check-circle-fill"></i>
                      Alcohol allowed
                    </span>
                    <span class="d-inline" v-if="tailgate.food_provided === true">
                      <i class="bi bi-check-circle-fill"></i>
                      Food provided
                    </span>
                    <span class="d-inline" v-if="tailgate.family_friendly === true">
                      <i class="bi bi-check-circle-fill"></i>
                      Family friendly
                    </span>
                    <span class="d-inline" v-if="tailgate.tv_available === true">
                      <i class="bi bi-check-circle-fill"></i>
                      Tv available
                    </span>
                  </div>
                </div>

                <div class="member-info">
                  <div class="row">
                    <div class="col tailgate-info">
                      <h4>Overall Records</h4>
                      <h6>
                        {{ awayTeamRecords.team }} ({{ awayTeamRecords.total.wins }}-{{ awayTeamRecords.total.losses }})
                        | {{ homeTeamRecords.team }} ({{ homeTeamRecords.total.wins }}-{{
                          homeTeamRecords.total.losses
                        }})
                      </h6>
                    </div>

                    <div class="col">
                      <h4>Conference Records</h4>
                      <h6>
                        {{ awayTeamRecords.team }}
                        {{ awayTeamRecords.conference }} record: ({{ awayTeamRecords.conferenceGames.wins }}-{{
                          awayTeamRecords.conferenceGames.losses
                        }})
                        <h6>
                          {{ homeTeamRecords.team }}
                          {{ homeTeamRecords.conference }} record: ({{ homeTeamRecords.conferenceGames.wins }}-{{
                            homeTeamRecords.conferenceGames.losses
                          }})
                        </h6>
                      </h6>
                    </div>

                    <div class="col">
                      <h4>Matchup wins since 1980</h4>
                      <h6>
                        {{ historicalMatchupRecords.team1 }}: {{ historicalMatchupRecords.team1Wins }} |
                        {{ historicalMatchupRecords.team2 }}:
                        {{ historicalMatchupRecords.team2Wins }}
                      </h6>
                    </div>

                    <div class="col">
                      <h4>Last matchup outcome</h4>
                      <h6>
                        {{ historicalMatchupRecords.games.at(-1).awayTeam }} ({{
                          historicalMatchupRecords.games.at(-1).awayScore
                        }}) at {{ historicalMatchupRecords.games.at(-1).homeTeam }} ({{
                          historicalMatchupRecords.games.at(-1).homeScore
                        }}) |
                        {{ historicalMatchupRecords.games.at(-1).season }}
                      </h6>
                    </div>
                  </div>

                  <!-- <h6>
                        {{ bets.lines[0].formattedSpread }} | Total:
                        {{ bets.lines[0].overUnder }}
                      </h6> -->
                </div>

                <div class="member-info">
                  <div class="row">
                    <div class="col tailgate-info">
                      <h4>Attending the Tailgate</h4>
                      <div v-for="tailgate_user in tailgate.tailgate_users" v-bind:key="tailgate_user.id">
                        <a :href="`/users/${tailgate_user.user.id}`">{{ tailgate_user.user.user_name }}</a>
                      </div>
                    </div>
                  </div>

                  <div class="col"></div>
                </div>
                <div class="member-info">
                  <div class="row">review placeholder</div>
                </div>

                <div class="row">
                  <div v-if="current_user.id != tailgate.user_id">
                    <button
                      class="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      @click="joinTailgate()"
                    >
                      Join Tailgate
                    </button>

                    <!-- Modal -->
                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Lodging and Parking</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <h1>Input Lodging</h1>

                            <ul>
                              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                            </ul>
                            Lodging type:
                            <select v-model="newLodgingParams.lodging_type">
                              <option disabled value="">Please select one</option>
                              <option>Hotel</option>
                              <option>Airbnb</option>
                              <option>Motel</option>
                              <option>Bed and Breakfast</option>
                              <option>Friends House</option>
                              <option>My House</option>
                            </select>
                            Lodging name:
                            <input type="text" v-model="newLodgingParams.lodging_name" />
                            Address:
                            <input type="text" v-model="newLodgingParams.address" />

                            <h1>Input Parking</h1>
                            Parking type:
                            <select v-model="newParkingParams.parking_type">
                              <option disabled value="">Please select one</option>
                              <option>Garage</option>
                              <option>Street</option>
                              <option>Lot</option>
                              <option>Other</option>
                            </select>
                            Address:
                            <input type="text" v-model="newParkingParams.address" />
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                              @click="createLocations()"
                              data-bs-dismiss="modal"
                              type="button"
                              class="btn btn-primary"
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- If current user created this tailgate allow them to update and delete it -->
                  <div v-if="this.current_user.id == tailgate.user_id">
                    <button class="btn btn-warning" @click="updateTailgate(tailgate)">Update Tailgate</button>
                    |
                    <button class="btn btn-warning" @click="deleteTailgate(tailgate)">Delete Tailgate</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tailgate-image {
  height: 100%;
  padding-top: 13px;
}
.tailgate-info {
  text-align: center;
}
</style>

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
      tailgateUserId: {},
      // awayTeamRecord: { total: { wins: {}, losses: {} }, conferenceGames: { wins: {} } },
      // homeTeamRecord: { total: { wins: {}, losses: {} }, conferenceGames: { wins: {} } },
      // historicalMatchupRecords: {},
      // bets: {},
      showNewTailgate: true,
      homeTeamRecords: { total: {}, conferenceGames: {} },
      awayTeamRecords: { total: {}, conferenceGames: {} },
      historicalMatchupRecords: { games: [{}] },
      bets: { lines: [{}] },
      errors: {},
    };
  },
  created: function () {
    // Good example of requests running in sequence and then in parallel
    axios.get(`/tailgates/${this.$route.params.id}`).then((response) => {
      console.log("tailgate show", response);
      this.tailgate = response.data;
      axios.get(`/records?q=${this.tailgate.game.home_team}`).then((response) => {
        console.log("Home team record", response.data);
        this.homeTeamRecords = response.data[0];
        axios.get(`/records?q=${this.tailgate.game.away_team}`).then((response) => {
          console.log("Away team record", response.data);
          this.awayTeamRecords = response.data[0];
          axios
            .get(
              `/historical_matchup_records?team1=${this.tailgate.game.away_team}&team2=${this.tailgate.game.home_team}`
            )
            .then((response) => {
              console.log("Historical matchup records index", response.data);
              this.historicalMatchupRecords = response.data;
              axios
                .get(`/bets?away=${this.tailgate.game.away_team}&home=${this.tailgate.game.home_team}`)
                .then((response) => {
                  console.log("Bets show", response.data);
                  this.bets = response.data[0];
                });
            });
        });
      });
    });
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
        this.tailgateUserId = response.data.tailgate_user.id;
        // this.$router.push(`/users/${this.current_user.id}`);
      });
    },
    createLocations: function () {
      this.newLodgingParams.tailgate_user_id = this.tailgateUserId;

      axios.post(`/lodgings`, this.newLodgingParams).then((response) => {
        console.log("Lodgings create", response);
      });
      this.newParkingParams.tailgate_user_id = this.tailgateUserId;

      axios.post(`/parkings`, this.newParkingParams).then((response) => {
        console.log("Parkings create", response);
      });
      this.$router.push(`/users/${this.current_user.id}`);
    },
  },
};
</script>
