<template>
  <div id="app">
    <!-- ======= Header ======= -->
    <header id="header" class="fixed-top">
      <div class="container d-flex align-items-center justify-content-between">
        <h1 class="logo"><a href="/tailgates">Tailgate Hero</a></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

        <nav id="navbar" class="navbar">
          <ul>
            <!-- <li><a class="nav-link scrollto active" href="#hero">Home</a></li> -->
            <!-- <li><a class="nav-link scrollto" href="/about">About</a></li> -->
            <li><a class="nav-link scrollto" href="/tailgates">Tailgates</a></li>
            <li><a class="nav-link scrollto" href="/games">Games</a></li>
            <!-- <li><a class="nav-link scrollto" href="/signup">Signup</a></li>
            <li><a class="nav-link scrollto" href="/login">Login</a></li>
            <li><a class="nav-link scrollto" href="/logout">Logout</a></li> -->
            <li class="dropdown">
              <a href="#">
                <span v-if="user.user_name">
                  {{ user.user_name }}
                </span>
                <span v-if="!user.user_name">Signup / Login / Logout</span>
                <i class="bi bi-chevron-down"></i>
              </a>
              <ul>
                <li><a href="/signup">Signup</a></li>
                <!-- <li class="dropdown">
                  <a href="#">
                    <span>Deep Drop Down</span>
                    <i class="bi bi-chevron-right"></i>
                  </a>
                  <ul>
                    <li><a href="#">Deep Drop Down 1</a></li>
                    <li><a href="#">Deep Drop Down 2</a></li>
                    <li><a href="#">Deep Drop Down 3</a></li>
                    <li><a href="#">Deep Drop Down 4</a></li>
                    <li><a href="#">Deep Drop Down 5</a></li>
                  </ul>
                </li> -->
                <li><a href="/login">Login</a></li>
                <li><a href="/logout">Logout</a></li>
                <li><a :href="`/users/${user.id}`">Tailgates Attending</a></li>
              </ul>
            </li>
            <!-- <li><a class="nav-link scrollto" href="#contact">Contact</a></li> -->
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
        <!-- .navbar -->
      </div>
    </header>
    <!-- End Header -->

    <!-- ======= Hero Section ======= -->
    <section id="hero" class="d-flex align-items-center" style="margin: 0; padding: 0">
      <div id="map"></div>

      <!-- <div class="container position-relative"> -->
      <!-- <h1>Welcome to Baker</h1>
        <h2>We are team of talented designers making websites with Bootstrap</h2>
        <a href="#about" class="btn-get-started scrollto">Get Started</a> -->
      <!-- </div> -->
    </section>
    <!-- End Hero -->
    <router-view v-on:refreshUser="showUser" />

    <!-- ======= Footer ======= -->
    <footer id="footer">
      <!-- <div class="footer-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 footer-contact">
              <h3>Baker</h3>
              <p>
                A108 Adam Street
                <br />
                New York, NY 535022
                <br />
                United States
                <br />
                <br />
                <strong>Phone:</strong>
                +1 5589 55488 55
                <br />
                <strong>Email:</strong>
                info@example.com
                <br />
              </p>
            </div>

            <div class="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i class="bx bx-chevron-right"></i>
                  <a href="#">Home</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>
                  <a href="#">About us</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>
                  <a href="#">Services</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>
                  <a href="#">Terms of service</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>
                  <a href="#">Privacy policy</a>
                </li>
              </ul>
            </div>

            <div class="col-lg-3 col-md-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <i class="bx bx-chevron-right"></i>
                  <a href="#">Web Design</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>
                  <a href="#">Web Development</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>
                  <a href="#">Product Management</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>
                  <a href="#">Marketing</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>
                  <a href="#">Graphic Design</a>
                </li>
              </ul>
            </div>

            <div class="col-lg-4 col-md-6 footer-newsletter">
              <h4>Join Our Newsletter</h4>
              <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
              <form action="" method="post">
                <input type="email" name="email" />
                <input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div> -->

      <div class="container d-md-flex py-4">
        <div class="me-md-auto text-center text-md-start">
          <div class="copyright">
            &copy; Copyright
            <strong><span>Tailgate</span></strong>
            . All Rights Reserved
          </div>
          <div class="credits">
            <!-- All the links in the footer should remain intact. -->
            <!-- You can delete the links only if you purchased the pro version. -->
            <!-- Licensing information: https://bootstrapmade.com/license/ -->
            <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/baker-free-onepage-bootstrap-theme/ -->
            Designed by
            <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>
        <div class="social-links text-center text-md-right pt-3 pt-md-0">
          <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
          <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
          <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
          <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
          <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
        </div>
      </div>
    </footer>
    <!-- End Footer -->
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
#map {
  height: 100% !important;
  width: 100vw;
}
</style>

<script>
import axios from "axios";
/* global mapboxgl, mapboxSdk */

export default {
  data: function () {
    return {
      user: {},
      place: null,
      mapboxClient: null,
      map: null,
      feature: {},
      // directions: null,
    };
  },
  created: function () {
    // axios.get(`/users/${localStorage.getItem("user_id")}`).then((response) => {
    //   console.log("Show user", response);
    //   this.user = response.data;
    // });
    this.showUser();
  },
  mounted: function () {
    this.indexTailgates();
  },
  // mounted: function () {
  //   axios.get(`/users/${localStorage.getItem("user_id")}`).then((response) => {
  //     console.log("Show user", response);
  //     this.user = response.data;
  //   });
  // },

  methods: {
    showUser: function () {
      var userId = localStorage.getItem("user_id");
      if (userId) {
        axios.get(`/users/${userId}`).then((response) => {
          console.log("Show user", response);
          this.user = response.data;
        });
      } else {
        this.user = {};
      }
    },
    indexTailgates: function () {
      axios.get("/tailgates").then((response) => {
        console.log("Tailgate index", response);
        this.tailgates = response.data;
        this.setupMap();
      });
    },
    setupMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      this.mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      this.map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/satellite-streets-v11", // style URL
        center: [-98.35, 39.5], // starting position [lng, lat]
        zoom: 3.7, // starting zoom
      });

      console.log(this.map);

      this.tailgates.forEach((tailgate) => {
        this.addMarkerFromAddress(tailgate.id, tailgate.name, tailgate.game.name, tailgate.address);
      });
    },

    addMarkerFromAddress: function (id, description, game, address) {
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

          const popup = new mapboxgl.Popup({ offset: 10 }).setHTML(`<br><a href='/tailgates/${id}'>${description}</a>`);

          const feature = response.body.features[0];
          // Create a marker and add it to the map.
          new mapboxgl.Marker().setLngLat(feature.center).setPopup(popup).addTo(this.map);
          // this.map.flyTo({ center: feature.center, zoom: 12 });
        });
    },
  },
};
</script>
