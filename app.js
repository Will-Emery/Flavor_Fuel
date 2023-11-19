const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

// express set up
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// server set up for local development
app.listen(3000, () => {
	console.log("Server started on port 3000");
});

/********************
 * ROUTES
 *********************/
//default route
app.get("/", (req, res) => {
	res.render("login");
});
//login route
app.get("/login", (req, res) => {
	res.render("login");
});
//setup route
app.get("/setup", (req, res) => {
	res.render("setup");
});
//home route
app.get("/home", (req, res) => {
	res.render("home");
});
//food route
app.get("/food", (req, res) => {
	res.render("food");
});
//recipes route
app.get("/recipes", (req, res) => {
	res.render("recipes");
});
//specific recipe route
app.get("/recipes/:recipeId", (req, res) => {
	const recipeId = req.params.recipeId;
	const recipeDetails = getRecipeDataById(recipeId);

	// Render the recipe details page with the retrieved data
	res.render("recipe_details", { recipeDetails });
});

app.post("/login", (req, res) => {
	// Implement login logic here
	// Check if the credentials are valid and redirect as needed

	//assume that the user doesn't have an account because the code in login.js didn't redirect
	res.redirect("/setup");
});

app.post("/sumbit_setup", (req, res) => {
	//sleep for 10 seconds
	//this simulates a slow server
	//this is for testing purposes only
	//remove this code when the server is ready for production
	res.redirect("/home");
});

app.post("/submit_food", (req, res) => {
	//sleep for 10 seconds
	//this simulates a slow server
	//this is for testing purposes only
	//remove this code when the server is ready for production
	res.redirect("/home");
});

// Function to grab the recipe data from the JSON file
function getRecipeDataById(recipe_id) {
	// Read the JSON file
	let rawdata = fs.readFileSync(
		path.resolve(__dirname, "public/json/recipe_data.json")
	);
	// Parse the JSON data into an object
	let recipes = JSON.parse(rawdata);
	// Find the recipe with the matching recipe_id
	let recipe = recipes.find((recipe) => recipe.recipe_id == recipe_id);
	// Return the recipe data
	return recipe;
}
