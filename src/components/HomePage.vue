<!--Name: Boni Milinganyo
    stuNo: C00284515
    Info: This is the home page and displays manchester united related news 
    from newsapi.org, and also shows united next games
-->
<template>
  <div class="home-container">
    <!-- Logo -->
    <div class="logo-container">
      <img src="@/assets/manchester-united-logo.png" alt="Manchester United Logo" class="manu-logo" />
    </div>

    <!-- Logout Button -->
    <div class="logout-container">
      <button @click="handleLogout" class="logout-button">Logout</button>
    </div>

    <!-- Content -->
    <div class="home-content">
      <h1>We are United</h1>

      <!-- News Section -->
      <section class="news-section">
        <h2>Latest News</h2>
        <div v-for="(article, index) in news" :key="index" class="news-widget">
          <a :href="article.url" target="_blank">{{ article.title }}</a>
          <p>{{ article.description }}</p>
        </div>
      </section>

      <!-- Next Games Section -->
      <section class="games-section">
        <h2>Upcoming Games</h2>
        <div v-for="(game, index) in games" :key="index" class="games-widget">
          <p><strong>{{ game.homeTeam.name }}</strong> vs <strong>{{ game.awayTeam.name }}</strong></p>
          <p>Venue: {{ game.venue.name }}</p>
          <p>Date: {{ game.date }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { supabase } from "../supabase"; // Import Supabase client

export default {
  name: "HomePage",
  data() {
    return {
      news: [], // Store news articles
      games: [], // Store upcoming games
    };
  },
  async created() {
     // Fetch news and upcoming games when the component loads.
    await this.fetchNews();
    await this.fetchUpcomingGames();
  },
  methods: {
    // Method to fetch the latest Manchester United news
    async fetchNews() {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=Manchester United&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`
        );
        // gets the first 10 articles from API response and store them in the 'news' array.
        this.news = response.data.articles.slice(0, 10);
      } catch (error) {
        console.error("Error fetching news:", error.message);
      }
    },
    // Method to fetch upcoming games for Manchester United
    async fetchUpcomingGames() {
      try {
        // Send GET request to the Football API to get fixtures for the 2021 season.
        const response = await axios.get(
          `https://v3.football.api-sports.io/fixtures?season=2021&team=${process.env.VUE_APP_TEAM_ID}`,
          {
            headers: {
              "x-rapidapi-key": process.env.VUE_APP_RAPIDAPI_KEY,
              "x-rapidapi-host": "v3.football.api-sports.io",
            },
          }
        );
        this.games = response.data.response.map((game) => ({
          homeTeam: game.teams.home,
          awayTeam: game.teams.away,
          venue: game.fixture.venue,
          date: new Date(game.fixture.date).toLocaleString(),
        }));
      } catch (error) {
        console.error("Error fetching games:", error.message);
      }
    },
    // Method to handle user logout
    async handleLogout() {
      try {
        // Call Supabase's signOut method to log out the user.
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("Error logging out:", error.message);
          alert("Failed to log out. Please try again.");
        } else {
          // tell the user successful logout and redirect to the login page.
          alert("Logged out successfully.");
          this.$router.push("/"); // Redirect to login page
        }
      } catch (error) {
        console.error("Unexpected error during logout:", error.message);
        alert("An unexpected error occurred during logout.");
      }
    },
  },
};
</script>

<style>
/* Container for the entire home page */
.home-container {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background-color: #f9f9f9;
  height: 100vh; /* Full viewport height */
}

/* Logo styling */
.logo-container {
  flex-shrink: 0;
  margin-right: 20px;
}

.manu-logo {
  width: 150px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Logout container */
.logout-container {
  position: absolute;
  top: 20px;
  right: 20px;
}

.logout-button {
  background-color: #d00; /* Manchester United red */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #a00; /* Darker red */
}

/* Home content styling */
.home-content {
  flex: 1;
  overflow-y: auto;
}

h1 {
  color: #d00; /* Manchester United red */
  font-size: 2rem;
  margin-bottom: 20px;
}

/* Section Styling */
section {
  margin-bottom: 30px;
}

section h2 {
  color: #d00; /* Manchester United red */
  font-size: 1.5rem;
  margin-bottom: 15px;
}

/* Widget Styling */
.news-widget,
.games-widget {
  background: #fff; 
  border: 1px solid #ddd; 
  border-radius: 10px; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  padding: 15px;
  margin-bottom: 15px; 
  transition: transform 0.2s ease, box-shadow 0.2s ease; 
}

.news-widget:hover,
.games-widget:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); 
}

.news-widget a,
.games-widget p {
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
}

.news-widget a {
  font-weight: bold;
  text-decoration: none;
  margin-bottom: 5px;
}

.news-widget a:hover {
  color: #d00;
}
</style>
