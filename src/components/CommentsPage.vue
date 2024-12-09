<!--Name: Boni Milinganyo
    stuNo: C00284515
    Info: Comment page for creating comments only goes to the database at the moment
          doesnt display under all comments must be fixed
-->
<template>
  <div class="comments-container">
    <h1>Comments Page</h1>
    <!-- show the email of the logged in user -->
    <p>Welcome, {{ user?.email }}!</p>

    <!-- textarea for users to type their comments -->
    <textarea v-model="comment" placeholder="Type your comment here"></textarea>
    <button @click="postComment">Post Comment</button>

    <!-- Display all comments -->
    <h2>All Comments</h2>
    <ul>
      <!-- Loop through the comments array and display each comment -->
      <li v-for="(c, index) in comments" :key="index">
        <strong>{{ c.username }}</strong>: {{ c.comment }}
      </li>
    </ul>
  </div>
</template>

<script>
import { supabase } from "../supabase"; // Import the Supabase client

export default {
  name: "CommentsPage",
  data() {
    return {
      user: null, 
      comment: "", // store text of the user's comment
      comments: [], // Store the list of all comments
    };
  },
  async created() {
    // get the user's session when component is created
    const session = await supabase.auth.getSession();
    this.user = session.data.session?.user; // Get logged in user's details

    // redirect to the login page if no user is logged in
    if (!this.user) {
      alert("Please log in to access the comments page.");
      this.$router.push("/");
    } else {
      // Fetch comments from the database if the user is logged in
      await this.fetchComments();
    }
  },
  methods: {
    // Fetch comments from the Supabase database
    async fetchComments() {
      const { data, error } = await supabase.from("comments").select();
      if (!error) {
        this.comments = data; // Update the comments array with fetched data
      } else {
        console.error("Error fetching comments:", error.message);
      }
    },

    // Post a new comment to the Supabase database
    async postComment() {
  if (!this.comment.trim()) {
    alert("Comment cannot be empty!");
    return;
  }

  try {
    const { data, error } = await supabase.from("comments").insert([
      { username: this.user.email, comment: this.comment },
    ]);

    if (!error) {
      if (data && data.length > 0) {
        this.comments.push(data[0]); // Immediately add the new comment to the array
        this.comment = ""; // Clear the comment input
        console.log("New Comment Added:", data[0]);
      } else {
        console.error("Unexpected response: data is null or empty");
      }
    } else {
      console.error("Error posting comment:", error.message);
      alert("Error posting comment. Please try again.");
    }
  } catch (error) {
    console.error("Unexpected error:", error.message);
  }
}
,
  },
};
</script>

<style>
/* Container for the comments page */
.comments-container {
  max-width: 600px; 
  margin: 50px auto; 
  padding: 20px; 
  background: #f9f9f9;
  border-radius: 10px; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  text-align: center;
}

/* Style for headings */
h1,
h2 {
  font-family: Arial, sans-serif;
  color: red; 
  margin-bottom: 10px;
}

/* Style for the welcome paragraph */
p {
  font-family: Arial, sans-serif;
  color: #333; 
}

/* Style for the comment input textarea */
textarea {
  width: 100%;
  height: 80px;
  margin: 10px 0;
  padding: 10px; 
  border: 1px solid #ddd; 
  border-radius: 5px; 
  font-size: 16px; 
}

/* Style for the post comment button */
button {
  background-color: #d00; 
  color: #fff; 
  padding: 10px 20px; 
  border: none; 
  border-radius: 5px; 
  font-size: 16px; 
  cursor: pointer; 
}

button:hover {
  background-color: #a00; 
}

/* Style for the comments list */
ul {
  list-style-type: none; 
  padding: 0; 
}

/* Style for individual comments */
li {
  background: #fff; 
  border: 1px solid #ddd;
  margin: 10px 0; 
  padding: 10px; 
  border-radius: 5px; 
  text-align: left; 
}
</style>
