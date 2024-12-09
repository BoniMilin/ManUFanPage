<!--Name: Boni Milinganyo
    stuNo: C00284515
    Info: This is the premier league table from 2022 because you have to pay 
    for the latest updates.
-->
<template>
  <div class="table-container">
    <h1>Premier League Table</h1>
    <!-- Table to display Premier League standings -->
    <table class="league-table" v-if="table.length">
      <thead>
        <tr>
          <th>Position</th>
          <th>Team</th>
          <th>Played</th>
          <th>Won</th>
          <th>Draw</th>
          <th>Lost</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through the table data to display rows -->
        <tr v-for="(team, index) in table" :key="index">
          <td>{{ team.rank }}</td>
          <td>{{ team.team.name }}</td>
          <td>{{ team.all.played }}</td>
          <td>{{ team.all.win }}</td>
          <td>{{ team.all.draw }}</td>
          <td>{{ team.all.lose }}</td>
          <td>{{ team.points }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Message displayed if nothing is available -->
    <p v-else>Loading Premier League Table...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PremierLeagueTable",
  data() {
    return {
      table: [], // Stores the Premier League standings data
    };
  },
  async created() {
    // Fetch the table data when the component is created
    await this.fetchPremierLeagueTable();
  },
  methods: {
    async fetchPremierLeagueTable() {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/standings`,
      {
        headers: {
          "x-rapidapi-key": process.env.VUE_APP_RAPIDAPI_KEY,
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
        params: {
          league: 39, // Premier League ID
          season: 2022, // 2022 season cant use latest because its behind a paywall
        },
      }
    );

    console.log("Premier League Table API Response:", response.data);
    this.table = response.data.response[0].league.standings[0];
  } catch (error) {
    // Log the full error object for debugging
    console.error("Error fetching Premier League table:", error.response?.data || error.message);
    alert("Failed to fetch Premier League standings. Please check the console for details.");
  }
},
  },
};
</script>

<style>
/* Container styling for the table */
.table-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Title styling */
h1 {
  color: #d00; /* Manchester United red */
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
}

/* League table styling */
.league-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  font-size: 1rem;
  text-align: left;
  border-radius: 8px;
  overflow: hidden;
}

/* Table headers and cells */
.league-table th,
.league-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

/* Header row styling */
.league-table th {
  background-color: #d00;
  color: #fff;
  font-weight: bold;
}

/* Alternate row styling */
.league-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Loading message */
p {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}
</style>

