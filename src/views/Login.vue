<template>
  <div class="login">
    <div class="game">
      <div class="container">
        <div class="row">
          <!-- <h1>Upcoming {{ this.displaySearchQuery }} Games</h1> -->

          <!-- <div class="search">
              <input @keyup.enter="indexGames" type="text" v-model="searchQuery" placeholder="search games by team" />
            </div> -->

          <section id="login" class="team section-bg">
            <div class="container">
              <div class="section-title">
                <h2>Login</h2>
              </div>
              <div class="row">
                <form v-on:submit.prevent="submit()">
                  <div class="form-group">
                    <label for="exampleInputName1">Name</label>
                    <input type="email" class="form-control" v-model="newSessionParams.email" />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputImageURL1">Image URL</label>
                    <input type="password" class="form-control" v-model="newSessionParams.password" />
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

    <!-- <h2>Login</h2>
    <form v-on:submit.prevent="submit()">
      <div class="form-group-login">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          v-model="newSessionParams.email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group-login">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          v-model="newSessionParams.password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div> -->
    <!-- <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div> -->
    <!-- <button type="submit" class="btn btn-primary" value="Submit">Submit</button>
    </form> -->
  </div>
</template>

<style scoped>
.form-group-login {
  width: 300px;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {
        email: "kiel@test.com",
        password: "password",
      },
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          console.log(response.data);
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$emit("refreshUser");
          this.$router.push("/tailgates");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
