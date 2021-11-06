<template>
  <div class="signup">
    <!-- <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>First Name:</label>
        <input type="text" v-model="newUserParams.first_name" placeholder="example: Peter" />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" v-model="newUserParams.last_name" placeholder="example: Jang" />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" v-model="newUserParams.user_name" placeholder="example: peter_jang" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newUserParams.email" placeholder="example: peter@test.com" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newUserParams.password" />
      </div>
      <div>
        <label>Password confirmation:</label>
        <input type="password" v-model="newUserParams.password_confirmation" />
      </div>
      <input type="submit" value="Submit" />
    </form> -->

    <h2>Signup</h2>
    <form v-on:submit.prevent="submit()">
      <div class="form-group">
        <label for="exampleInputFirstName1">First Name</label>
        <input
          type="text"
          v-model="newUserParams.first_name"
          placeholder="example: Peter"
          class="form-control"
          id="exampleInputFirstName1"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputLastName1">Last Name</label>
        <input
          type="text"
          v-model="newUserParams.last_name"
          placeholder="example: Jang"
          class="form-control"
          id="exampleInputLastName1"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputUserName1">Username</label>
        <input
          type="text"
          v-model="newUserParams.user_name"
          placeholder="example: peter_jang"
          class="form-control"
          id="exampleInputUsername1"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          v-model="newUserParams.email"
          placeholder="example: peter@test.com"
          class="form-control"
          id="exampleInputEmail1"
        />
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" v-model="newUserParams.password" class="form-control" id="exampleInputPassword1" />
      </div>
      <div class="form-group">
        <label for="exampleInputPasswordConfirmation1">Password Confirmation</label>
        <input
          type="password"
          v-model="newUserParams.password_confirmation"
          class="form-control"
          id="exampleInputPasswordConfirmation1"
        />
      </div>

      <!-- <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div> -->
      <button type="submit" class="btn btn-primary" value="Submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.newUserParams = {};
        });
    },
  },
};
</script>
