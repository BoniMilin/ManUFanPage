<!--Name: Boni Milinganyo
    stuNo: C00284515
    Info: This is the app.vue page and display the navigation
    bar with the route links conected to them
-->

<template>
  <div id="app">
    <!-- Navigation Bar -->
  <nav class="horizontal-sidebar">
  <router-link to="/" class="nav-link">Login</router-link>
  <router-link to="/home" class="nav-link">Home</router-link>
  <router-link to="/comments" class="nav-link">Comments</router-link>
  <router-link to="/premier-league" class="nav-link">League Table</router-link>
  </nav>


    <!-- Display the content of the current route -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
nav {
  display: flex;
  justify-content: center;
  background-color: #d00; 
  padding: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin: 0 1rem;
  font-weight: bold;
  font-size: 1.2rem;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
