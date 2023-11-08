const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

// express set up
app.set("view engine", "ejs");
app.use(express.static("images"));
app.use(express.urlencoded({ extended: true }));

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

app.post("/login", (req, res) => {
	// Implement your login logic here
	// Check if the credentials are valid and redirect as needed

	res.redirect("/home");

	//create the user object
	let ff_user_data = {
		username: req.body.username,
		//password: req.body.password,
		goal: "none",
		goal_cal: 0,
		goal_protein: 0,
		goal_carbs: 0,
		goal_fat: 0,
	};

	//save the user object to local storage
	localStorage.setItem("ff_user_data", JSON.stringify(ff_user_data));
});
