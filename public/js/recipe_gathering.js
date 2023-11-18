const puppeteer = require("puppeteer");
const fs = require("fs");

async function get_children_links(url) {
	let links = [];

	const browser = await puppeteer.launch({ headless: true });
	console.log("browser launched");
	const page = await browser.newPage();
	console.log("new page created");

	await page.goto(url, { waitUntil: "domcontentloaded" });

	const elements = await page.$$eval(
		'div[data-test-id="recipe-image-card"] a',
		(links) => links.map((link) => link.href)
	);

	console.log("elements found");

	await browser.close();

	elements.splice(elements.length - 5, 5);

	return elements;
}

function get_recipe_links() {
	let links_to_get_recipes_from = [
		"https://www.hellofresh.com/recipes/american-recipes",
		"https://www.hellofresh.com/recipes/italian-recipes",
		"https://www.hellofresh.com/recipes/american-recipes",
		"https://www.hellofresh.com/recipes/italian-recipes",
		"https://www.hellofresh.com/recipes/asian-recipes",
		"https://www.hellofresh.com/recipes/mediterranean-recipes",
		"https://www.hellofresh.com/recipes/mexican-recipes",
		"https://www.hellofresh.com/recipes/korean-recipes",
		"https://www.hellofresh.com/recipes/indian-recipes",
		"https://www.hellofresh.com/recipes/latin-american-recipes",
		"https://www.hellofresh.com/recipes/chinese-recipes",
		"https://www.hellofresh.com/recipes/spanish-recipes",
		"https://www.hellofresh.com/recipes/japanese-recipes",
		"https://www.hellofresh.com/recipes/thai-recipes",
		"https://www.hellofresh.com/recipes/french-recipes",
		"https://www.hellofresh.com/recipes/cuban-recipes",
		"https://www.hellofresh.com/recipes/african-recipes",
		"https://www.hellofresh.com/recipes/cajun-recipes",
		"https://www.hellofresh.com/recipes/middle-eastern-recipes",
		"https://www.hellofresh.com/recipes/vietnamese-recipes",
		"https://www.hellofresh.com/recipes/hawaiian-recipes",
	];

	let recipe_links = [];

	return Promise.all(
		links_to_get_recipes_from.map(async (url) => {
			let temp = await get_children_links(url);
			recipe_links = recipe_links.concat(temp);
		})
	).then(() => {
		console.log(recipe_links);
		recipe_links = [...new Set(recipe_links)];
		return recipe_links;
	});
}

async function run() {
	console.log("This file should be run as a standalone script");
	try {
		const recipe_links_for_file = await get_recipe_links();

		// write the recipe links to a JSON file
		fs.writeFile(
			"public/json/recipe_links.json",
			JSON.stringify(recipe_links_for_file, null, 2), // Pretty-print with 2 spaces
			(err) => {
				if (err) throw err;
				console.log("The JSON file has been saved!");
			}
		);

		return recipe_links_for_file;
	} catch (error) {
		console.error(error);
	}

	// $.ajax({
	// 	type: "POST",
	// 	url: "./public/python/recipe_scraping.py",
	// 	data: { param: text },
	// }).done(function (o) {
	// 	//get the data from the file the python code created
	// 	var data = JSON.parse(
	// 		fs.readFileSync("public/json/recipe_data.json", "utf8")
	// 	);
	// 	//just write it to the console for now
	// 	//TODO: write it to a database
	// 	console.log(data);
	// });
}

// Call the async function run
run();
