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
