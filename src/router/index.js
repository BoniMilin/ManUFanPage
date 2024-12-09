//Name: Boni Milinganyo
//stuNo: C00284515
//Info: This is the routing script giving directions when buttons are clicked

import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../supabase"; // Import supabase client
import LoginPage from "../components/LoginPage.vue";
import HomePage from "../components/HomePage.vue";
import CommentsPage from "../components/CommentsPage.vue";
import PremierLeagueTable from "../components/PremierLeagueTable.vue";

const routes = [
  { path: "/", component: LoginPage, name: "LoginPage" },
  {
    path: "/home",
    component: HomePage,
    name: "HomePage",
    meta: { requiresAuth: true },
  },
  {
    path: "/comments",
    component: CommentsPage,
    name: "CommentsPage",
    meta: { requiresAuth: true },
  },
  {
    path: "/premier-league",
    component: PremierLeagueTable,
    name: "PremierLeagueTable",
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      // Check if the user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Redirect to login if not authenticated
        next({ name: "LoginPage" });
      } else {
        next(); // Allow access
      }
    } catch (error) {
      console.error("Error checking authentication:", error.message);
      next({ name: "LoginPage" }); // Redirect to login on error
    }
  } else {
    next(); // Allow access to non-protected routes
  }
});

export default router;
