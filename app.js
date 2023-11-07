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
//home route
app.get("/", (req, res) => {
	res.render("index");
});
