<template>
  <div class="user">
    <div class="container">
      <div class="row">
        <!-- <h1>Upcoming {{ this.displaySearchQuery }} Games</h1> -->

        <!-- <div class="search">
              <input @keyup.enter="indexGames" type="text" v-model="searchQuery" placeholder="search games by team" />
            </div> -->

        <section id="user" class="team section-bg">
          <div class="container">
            <div class="section-title">
              <h2>Tailgates Attending</h2>
              <!-- <p>
                    Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
                    consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia
                    fugiat sit in iste officiis commodi quidem hic quas.
                  </p> -->
              <!-- <div>
                  <input type="text" v-model="gameFilter" placeholder="search tailgates" />
                </div> -->
            </div>

            <div class="row">
              <div v-for="userTailgate in user.tailgate_users" v-bind:key="userTailgate.id">
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
                  <div class="member-info">
                    <div class="row">
                      <a :href="`/tailgates/${userTailgate.tailgate.id}`">
                        <h2>{{ userTailgate.tailgate.name }}</h2>
                      </a>
                      <div class="col">
                        <h4>Tailgate Info:</h4>
                        <h6>
                          {{ userTailgate.tailgate.address }}
                          <br />
                          {{ userTailgate.tailgate.start_time_conversion }} -
                          {{ userTailgate.tailgate.end_time_conversion }}
                        </h6>
                      </div>

                      <div class="col">
                        <!-- Need to fix this start time conversion thing -->
                        <h4>Game Info:</h4>
                        <h6>{{ userTailgate.game.name }} | {{ userTailgate.game.start_time_conversion }}</h6>
                      </div>
                    </div>

                    <!-- I dont understand how this works and it is probably wrong -->
                    <button @click="setCurrentUserTailgate(userTailgate)" class="btn btn-info m-2">More info</button>

                    <div class="row">
                      <div v-if="currentUserTailgate.show && currentUserTailgate.id === userTailgate.id">
                        <div class="row">
                          <div class="col">
                            <h4>Stadium:</h4>
                            <h6>{{ currentUserTailgate.game.address }}</h6>
                          </div>

                          <div class="col">
                            <div class="lodgings-edit">
                              <h4>Lodging:</h4>
                              <h6>{{ currentUserTailgate.lodgings[0].address }}</h6>
                              <!-- <form v-on:submit.prevent="updateLodgings(currentUserTailgate.lodgings[0])">
                                    <select v-model="currentUserTailgate.lodgings[0].lodging_type">
                                      <option disabled value="">Please select one</option>
                                      <option>Hotel</option>
                                      <option>Airbnb</option>
                                      <option>Motel</option>
                                      <option>Bed and Breakfast</option>
                                      <option>Friends House</option>
                                      <option>My House</option>
                                    </select>
                                    Lodging name:
                                    <input type="text" v-model="currentUserTailgate.lodgings[0].lodging_name" />
                                    Address:
                                    <input type="text" v-model="currentUserTailgate.lodgings[0].address" />
                                    <input type="submit" value="Update" />
                                  </form> -->
                            </div>
                          </div>

                          <div class="col">
                            <div class="parkings-edit">
                              <h4>Parking:</h4>
                              <h6>{{ currentUserTailgate.parkings[0].address }}</h6>
                              <!-- <form v-on:submit.prevent="updateParkings(currentUserTailgate.parkings[0])">
                                    <select v-model="currentUserTailgate.parkings[0].parking_type">
                                      <option disabled value="">Please select one</option>
                                      <option>Garage</option>
                                      <option>Street</option>
                                      <option>Lot</option>
                                      <option>Other</option>
                                    </select>
                                    Address:
                                    <input type="text" v-model="currentUserTailgate.parkings[0].address" />
                                    <input type="submit" value="Update" />
                                  </form> -->
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div>
                              <button @click="showBars()" class="btn btn-restaurants m-2">Show Bars</button>
                            </div>
                          </div>
                          <div class="col">
                            <div>
                              <button @click="showRestaurants()" class="btn btn-restaurants m-2">
                                Show Restaurants
                              </button>
                            </div>
                          </div>
                          <div class="col">
                            <div>
                              <button @click="showCampus()" class="btn btn-restaurants m-2">
                                Show Campus Attractions
                              </button>
                            </div>
                          </div>
                        </div>
                        <button class="btn btn-restaurants m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                          Update Lodging and Parking
                        </button>
                        <!-- Modal -->
                        <div
                          class="modal fade"
                          id="exampleModal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Update Lodging and Parking</h5>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">
                                <!-- <form>
                                  <div class="form-group"></div>
                                </form> -->
                                <h2>Update Lodging</h2>

                                Lodging type:
                                <select v-model="currentUserTailgate.lodgings[0].lodging_type" class="form-select">
                                  <option disabled value="">Please select one</option>
                                  <option>Hotel</option>
                                  <option>Airbnb</option>
                                  <option>Motel</option>
                                  <option>Bed and Breakfast</option>
                                  <option>Friends House</option>
                                  <option>My House</option>
                                </select>
                                Lodging name:
                                <input
                                  type="text"
                                  v-model="currentUserTailgate.lodgings[0].lodging_name"
                                  class="form-control"
                                />
                                Address:
                                <input
                                  type="text"
                                  v-model="currentUserTailgate.lodgings[0].address"
                                  class="form-control"
                                />

                                <h2>Update Parking</h2>
                                Parking type:
                                <select v-model="currentUserTailgate.parkings[0].parking_type" class="form-select">
                                  <option disabled value="">Please select one</option>
                                  <option>Garage</option>
                                  <option>Street</option>
                                  <option>Lot</option>
                                  <option>Other</option>
                                </select>
                                Address:
                                <input
                                  type="text"
                                  v-model="currentUserTailgate.parkings[0].address"
                                  class="form-control"
                                />
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button
                                  @click="updateLodgings(currentUserTailgate)"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div id="map"></div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
.mapboxgl-ctrl-top-left {
  top: 60px !important;
}
.btn-bars {
  background-color: #c70039 !important;
}
.btn-restaurants {
  background-color: #ffc300 !important;
}
.btn-campus {
  background-color: #ff5733 !important;
}
</style>

<script>
/* global mapboxgl, mapboxSdk, MapboxDirections */

import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      userTailgatesAttended: {},
      // userLodgings: {},
      // userParkings: {},
      currentUserTailgate: {
        show: false,
        awayTeamRecord: {
          team: {},
          conference: {},
          conferenceGames: { wins: {}, losses: {} },
          total: { wins: {}, losses: {} },
        },
        homeTeamRecord: {
          team: {},
          conference: {},
          conferenceGames: { wins: {}, losses: {} },
          total: { wins: {}, losses: {} },
        },
        historicalMatchupRecords: { team1: {}, team1Wins: {}, team2: {}, team2Wins: {}, games: [{}] },
        // TODO
        // // Adding .length to the end of bets made ERROR formattedSpread undefined go away
        // Check out new ERROR
        bets: { lines: [{}] },
        game: { stadium: {}, address: {} },
      },
      editLodgingsParams: { lodging_type: {}, lodging_name: {}, address: {} },
      editParkingsParams: { parking_type: {}, address: {} },
      place: null,
      mapboxClient: null,
      map: null,
      directions: null,
      restaurantMarkers: [],
      barMarkers: [],
      campusMarkers: [],
    };
  },
  created: function () {},
  mounted: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      console.log("User show", response);
      this.user = {
        ...response.data,
        tailgate_users: response.data.tailgate_users.map((userTailgate) => {
          return {
            ...userTailgate,
            awayTeamRecord: { total: {}, conferenceGames: {} },
            homeTeamRecord: { total: {}, conferenceGames: {} },
            historicalMatchupRecords: { games: [{}] },
            bets: { lines: [{}] },
          };
        }),
      };
      console.log("FDJSFDFDS", this.user);
      // this.user = response.data;

      // Attaching all of the following web responses to userTailgateAttended
      this.user.tailgate_users.forEach((userTailgate) => {
        axios.get(`/records?q=${userTailgate.game.home_team}`).then((response) => {
          console.log("Home team record index", response);
          userTailgate.homeTeamRecord = response.data[0];
        });
        axios.get(`/records?q=${userTailgate.game.away_team}`).then((response) => {
          console.log("Away team record index", response);
          userTailgate.awayTeamRecord = response.data[0];
        });
        axios
          .get(`/historical_matchup_records?team1=${userTailgate.game.away_team}&team2=${userTailgate.game.home_team}`)
          .then((response) => {
            console.log("Historical matchup records index", response);
            userTailgate.historicalMatchupRecords = response.data;
          });
        axios.get(`/bets?away=${userTailgate.game.away_team}&home=${userTailgate.game.home_team}`).then((response) => {
          console.log("Bets show", response.data);
          userTailgate.bets = response.data[0];
        });
      });
    });
  },
  methods: {
    setCurrentUserTailgate: function (userTailgate) {
      this.currentUserTailgate = userTailgate;
      this.currentUserTailgate.show = true;

      this.setupMap();

      this.addMarkerFromAddress("Stadium", this.currentUserTailgate.game.address);
      this.addMarkerFromAddress("Lodging", this.currentUserTailgate.lodgings[0].address);
      this.addMarkerFromAddress("Parking", this.currentUserTailgate.parkings[0].address);
      this.addMarkerFromAddress("Tailgate", this.currentUserTailgate.tailgate.address);

      console.log("current user tailgate", this.currentUserTailgate);
    },
    setupMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      this.mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      this.map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/satellite-streets-v11", // style URL
        // Center is set to Chicago
        center: [-87.62, 41.88], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });

      this.directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      });
      this.map.addControl(this.directions, "top-left");

      // Changed these
      this.directions.setOrigin(this.currentUserTailgate.lodgings[0].address);
      this.directions.setDestination(this.currentUserTailgate.parkings[0].address);

      console.log(this.map);
    },

    addMarkerFromAddress: function (description, address) {
      window.scrollTo(0, 0);
      this.mapboxClient.geocoding
        .forwardGeocode({
          query: address,
          autocomplete: false,
          limit: 1,
        })
        .send()
        .then((response) => {
          if (!response || !response.body || !response.body.features || !response.body.features.length) {
            console.error("Invalid response:");
            console.error(response);
            return;
          }

          const feature = response.body.features[0];
          // Create a marker and add it to the map.
          new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
            .setLngLat(feature.center)
            .setHTML(description)
            .addTo(this.map);
          // added offset / kinda wonky
          this.map.flyTo({ center: feature.center, zoom: 13.5 });
        });
    },
    addBarMarkerFromAddress: function (name, description, address) {
      window.scrollTo(0, 0);
      this.restaurantMarkers.forEach((marker) => {
        marker.remove();
      });
      this.restaurantMarkers = [];

      this.campusMarkers.forEach((marker) => {
        marker.remove();
      });
      this.campusMarkers = [];

      this.mapboxClient.geocoding
        .forwardGeocode({
          query: address,
          autocomplete: false,
          limit: 1,
        })
        .send()
        .then((response) => {
          if (!response || !response.body || !response.body.features || !response.body.features.length) {
            console.error("Invalid response:");
            console.error(response);
            return;
          }

          const popup = new mapboxgl.Popup({ offset: 10 }).setHTML(`<p>Bar: ${name}</p><p>${description}</p>`);

          const feature = response.body.features[0];
          // Create a marker and add it to the map.
          const marker = new mapboxgl.Marker({ color: "#C70039 " })
            .setLngLat(feature.center)
            .setPopup(popup)
            .addTo(this.map);
          this.barMarkers.push(marker);
          this.map.flyTo({ center: feature.center, zoom: 14 });
        });
    },
    addRestaurantMarkerFromAddress: function (name, description, address) {
      window.scrollTo(0, 0);
      this.barMarkers.forEach((marker) => {
        marker.remove();
      });
      this.barMarkers = [];

      this.campusMarkers.forEach((marker) => {
        marker.remove();
      });
      this.campusMarkers = [];

      this.mapboxClient.geocoding
        .forwardGeocode({
          query: address,
          autocomplete: false,
          limit: 1,
        })
        .send()
        .then((response) => {
          if (!response || !response.body || !response.body.features || !response.body.features.length) {
            console.error("Invalid response:");
            console.error(response);
            return;
          }

          const popup = new mapboxgl.Popup({ offset: 10 }).setHTML(`<p>Restaurant: ${name}</p><p>${description}</p>`);

          const feature = response.body.features[0];
          // Create a marker and add it to the map.
          const marker = new mapboxgl.Marker({ color: "#FFC300" })
            .setLngLat(feature.center)
            .setPopup(popup)
            .addTo(this.map);
          this.restaurantMarkers.push(marker);
          this.map.flyTo({ center: feature.center, zoom: 13.5 });
        });
    },
    addCampusMarkerFromAddress: function (name, description, address) {
      window.scrollTo(0, 0);
      this.barMarkers.forEach((marker) => {
        marker.remove();
      });
      this.barMarkers = [];

      this.restaurantMarkers.forEach((marker) => {
        marker.remove();
      });
      this.restaurantMarkers = [];

      this.mapboxClient.geocoding
        .forwardGeocode({
          query: address,
          autocomplete: false,
          limit: 1,
        })
        .send()
        .then((response) => {
          if (!response || !response.body || !response.body.features || !response.body.features.length) {
            console.error("Invalid response:");
            console.error(response);
            return;
          }

          const popup = new mapboxgl.Popup({ offset: 10 }).setHTML(
            `<p>Campus Attraction: ${name}</p><p>${description}</p>`
          );

          const feature = response.body.features[0];
          // Create a marker and add it to the map.
          const marker = new mapboxgl.Marker({ color: "#FF5733" })
            .setLngLat(feature.center)
            .setPopup(popup)
            .addTo(this.map);
          this.campusMarkers.push(marker);
          this.map.flyTo({ center: feature.center, zoom: 13.5 });
        });
    },
    showBars: function () {
      this.addBarMarkerFromAddress(
        "Innisfree",
        "A favorite bar for students, alumni, and out-of-towners alike.",
        "1925 University Blvd, Tuscaloosa, AL 35401"
      );
      this.addBarMarkerFromAddress(
        "Druid City Brewing",
        "The best brewery in Tuscaloosa by a long shot. Be sure to check out the famous chalkboard wall and snap a picture with whatever the featured art happens to be.",
        "607 14th St, Tuscaloosa, AL 35401"
      );
      this.addBarMarkerFromAddress(
        "Nocturnal Tavern",
        "Swanky cocktail spot located in the heart of downtown Tuscaloosa. Perfect for those who are looking for a more refined drinking experience.",
        "2209 4th St #11, Tuscaloosa, AL 35401"
      );
      this.addBarMarkerFromAddress(
        "Gallette's",
        "Birthplace of the famous “Yellowhammer”. Get here early on game days to avoid the long lines. ",
        "1021 University Blvd, Tuscaloosa, AL 35401"
      );
    },
    showRestaurants: function () {
      this.addRestaurantMarkerFromAddress(
        "Waysider",
        "The quintessential, old-school, Tuscaloosa breakfast spot. “Bear” Bryant ate here every morning for nearly 30 years. His order: 2 eggs over-easy, country ham, and biscuits with red-eye-gravy.",
        "1512 Greensboro Ave, Tuscaloosa, AL 35401"
      );
      this.addRestaurantMarkerFromAddress(
        "FIVE",
        "For those looking for a casual, yet modern dining experience, FIVE pairs the best of both worlds.",
        "2324 6th St, Tuscaloosa, AL 35401"
      );
      this.addRestaurantMarkerFromAddress(
        "City Cafe",
        "Classic meat and three with counter seating. Get here early to make sure the daily special is still available.",
        "408 Main Ave, Northport, AL 35476"
      );
      this.addRestaurantMarkerFromAddress(
        "Archibald's",
        "The king of Tuscaloosa BBQ. Don’t be intimidated by its humble exterior, many foodies claim that Archibald’s has the best ribs in America!",
        "1211 Martin Luther King Jr Blvd, Northport, AL 35476"
      );
      this.addRestaurantMarkerFromAddress(
        "Dreamland BBQ",
        "If you’re looking for great BBQ and want something that’s a bit more accessible than Archibald’s, Dreamland is for you. Be sure to try the “smoker sampler” as pretty much everything they make here is delicious.",
        "101 Bridge Ave, Northport, AL 35476"
      );
      this.addRestaurantMarkerFromAddress(
        "Full Moon BBQ",
        "Another solid option if you can’t make it across the Black Warrior for either Archibald’s or Dreamland.",
        "1434 McFarland Blvd E, Tuscaloosa, AL 35404"
      );
      this.addRestaurantMarkerFromAddress(
        "Rama Jama's",
        "Go-to spot for breakfast on game days. Lines are to be expected, but they tend to turn over tables pretty quickly.",
        "1000 Paul W Bryant Dr, Tuscaloosa, AL 35401"
      );
    },
    showCampus: function () {
      this.addCampusMarkerFromAddress(
        "President's Mansion",
        "Built between 1839 and 1841, and one of the few campus buildings to survive the Civil War, this Greek Revival-style home with its sweeping front staircase has been on the National Register of Historic Places since 1972. It has served as home to University presidents and their families for nearly two centuries.",
        "727 Magnolia Dr, Tuscaloosa, AL 35401"
      );
      this.addCampusMarkerFromAddress(
        "Walk of Champions",
        "In all of college football, few gladiatorial arenas top the list of legendary locations where the best-of-the-best gridiron warriors clash. Bryant-Denny Stadium is one of them.",
        "950 University Blvd, Tuscaloosa, AL 35401"
      );
      this.addCampusMarkerFromAddress(
        "Denny Chimes",
        "Standing on the center edge of the Quad directly across from the President’s Mansion is a 115-foot-tall tower that has been the iconic symbol of the University since it was dedicated in 1929 in honor of Dr. George H. Denny, president of the Capstone from 1912 to 1936, and again in 1941. On UA football game days, popular melodies can be heard as select students or faculty play the modified organ inside the tower.",
        "denny chimes"
      );
      this.addCampusMarkerFromAddress(
        `Paul "Bear" Bryant Museum`,
        "The Paul W. Bryant Museum is every Alabama football fan’s dream. It takes visitors through the history of Alabama football. The museum specifically highlights Paul “Bear” Bryant’s life and achievements as UA’s award-winning head football coach. It also showcases trophies and rings the football team has won.",
        "300 Paul W Bryant Dr, Tuscaloosa, AL 35401"
      );
      this.addCampusMarkerFromAddress(
        "Manderson Landing",
        "Located on the Black Warrior River, the 4 acres that make up the Park at Manderson Landing were transferred to the University from the federal government in 2009 – the first time the Federal Lands to Parks Program transferred property to an institute of higher learning.",
        "501 Jack Warner Pkwy, Tuscaloosa, AL 35404"
      );
      this.addCampusMarkerFromAddress(
        "Gorgas House",
        "University of Alabama's oldest structure, built in 1829, featuring period furnishings & artifacts.",
        "810 Capstone Dr, Tuscaloosa, AL 35401"
      );
    },
    updateLodgings: function (currentUserTailgate) {
      // this.editLodgingsParams = { lodging_type: {}, lodging_name: {}, address: {} };

      axios
        .patch(`/lodgings/${this.currentUserTailgate.lodgings[0].id}`, currentUserTailgate.lodgings[0])
        .then((response) => {
          console.log("Update Lodgings", response);
          // this.editParkingsParams = { parking_type: {}, address: {} };
          axios
            .patch(`/parkings/${this.currentUserTailgate.parkings[0].id}`, currentUserTailgate.parkings[0])
            .then((response) => {
              console.log("Update Parkings", response);
            });
        });
    },
    // updateParkings: function (currentUserTailgate) {
    //   this.editParkingsParams = currentUserTailgate;
    //   axios.patch(`/parkings/${this.currentUserTailgate.parkings[0].id}`, this.editParkingsParams).then((response) => {
    //     console.log("Update Parkings", response);
    //   });
    // },
  },
};
</script>
