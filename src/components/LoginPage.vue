<!--Name: Boni Milinganyo
    stuNo: C00284515
    Info: This is the login page that lets a user login or signup
-->
<template>
   <!-- Main container for the login page -->
  <div class="login-container">
    <h1 v-if="mode === 'login'">Login</h1>
    <h1 v-else>Sign Up</h1>
     <!-- Form for login or registration -->
    <form @submit.prevent="mode === 'login' ? handleLogin() : handleRegister()">
      <div>
        <label>Email:</label>
        <input v-model="email" type="email" placeholder="Enter your email" required />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" placeholder="Enter your password" required />
      </div>
      <div v-if="mode === 'register'">
        <label>Username:</label>
        <input v-model="username" type="text" placeholder="Choose a username" required />
      </div>
      <button type="submit">{{ mode === 'login' ? "Login" : "Sign Up" }}</button>
    </form>
    <!-- Link to switch between Login and Sign Up modes -->
    <p>
      {{ mode === 'login' ? "Don't have an account?" : "Already have an account?" }} 
      <a href="#" @click="toggleMode">
        {{ mode === 'login' ? "Sign up" : "Login" }}
      </a>
    </p>
  </div>
</template>

<script>
// Import the Supabase client
import { supabase } from "../supabase";

export default {
  data() {
    return {
      mode: "login", // 'login' or 'register'
      email: "", // Stores the email input value
      password: "", // Stores the password input value
      username: "", // Stores the username input value (for registration)
    };
  },
  methods: {
    // Toggles between 'login' and 'register' modes
    toggleMode() {
      this.mode = this.mode === "login" ? "register" : "login";
    },
    // Handles user login
    async handleLogin() {
      // Use Supabase signInWithPassword method to log in the user
      const { error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });

      if (error) {
         // If login fails, log the error and display an alert
        console.error("Login failed:", error.message);
        alert("Login failed: " + error.message);
      } else {
        // If login succeeds, alert the user and should redirect to the home page not working atm
        alert("Login successful!");
        this.$router.push("/"); // redirects to the home router
      }
    },

    // Create user with email and password
    async handleRegister() {
      // Use Supabase signUp method to create a new user
      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
      });
      if (error) {
        // If registration fails, log the error and display an alert
        console.error("Registration failed:", error.message);
        alert("Registration failed: " + error.message);
      } else {
        // Save additional user data in 'profiles' table
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id, // Use the user's id from Supabase
            email: this.email, // Email address
            username: this.username, // satores chosen Username
          },
        ]);

        if (profileError) {
          // Log an error if saving the profile fails
          console.error("Error saving profile:", profileError.message);
        }
        alert("Registration successful! Please check your email to verify your account.");
        this.toggleMode(); // Switch to login mode
        this.$router.push("/"); // Redirect
      }
    },
  },
};
</script>

<style>
/* Container Styling */
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Title Styling */
h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  font-family: Arial, sans-serif;
}

/* Form Styling */
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Label Styling */
label {
  font-size: 0.9rem;
  color: #555;
  text-align: left;
  font-family: Arial, sans-serif;
}

/* Input Fields Styling */
input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

/* Button Styling */
button {
  padding: 10px;
  font-size: 1rem;
  background-color: #d00; /* Manchester United red */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #a00; /* Darker red */
}

/* Toggle Links Styling */
p {
  margin-top: 15px;
  font-size: 0.9rem;
}

a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}

/* Responsive Styling */
@media (max-width: 768px) {
  .login-container {
    padding: 15px;
  }

  h1 {
    font-size: 1.5rem;
  }

  button {
    font-size: 0.9rem;
    padding: 8px;
  }
}
</style>
