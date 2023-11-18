async function fetch_recipes() {
	try {
		const response = await fetch("/json/recipe_data.json");
		const data = await response.json();

		if (Array.isArray(data)) {
			const recipes = data;
			// Initial setup when the page loads
			document.addEventListener("DOMContentLoaded", () => {
				populateCategoryFilter(recipes);
				populateRecipeTable(recipes);
			});
			console.log(recipes);
			return recipes;
		} else {
			console.error("Invalid data format in recipes.json. Expected an array.");
			return null;
		}
	} catch (error) {
		console.error("Error fetching recipes.json:", error);
		return null;
	}
}

// Function to populate the category filter dropdown
function populateCategoryFilter(recipes) {
	let categories = [...new Set(recipes.map((recipe) => recipe.category))];
	let dropdown = document.getElementById("categoryFilter");

	categories.forEach((category) => {
		let option = document.createElement("option");
		option.value = category;
		option.text = category;
		dropdown.add(option);
	});
}

//Fuction to populate the Cuisine filter dropdown
function populateCuisineFilter(recipes) {
	let cuisines = [...new Set(recipes.map((recipe) => recipe.cuisine))];
	let dropdown = document.getElementById("cuisineFilter");

	cuisines.forEach((cuisine) => {
		let option = document.createElement("option");
		option.value = cuisine;
		option.text = cuisine;
		dropdown.add(option);
	});
}

// Function to filter recipes based on the selected category
function filterRecipesByCategory(event, recipes) {
	let selectedCategory = document.getElementById("categoryFilter").value;
	let filteredRecipes =
		selectedCategory === "All"
			? recipes
			: recipes.filter((recipe) => recipe.category === selectedCategory);

	populateRecipeTable(filteredRecipes);
}

// Function to filter recipes based on the selected cuisine
function filterRecipesByCuisine(event, recipes) {
	let selectedCuisine = document.getElementById("cuisineFilter").value;
	let filteredRecipes =
		selectedCuisine === "All"
			? recipes
			: recipes.filter((recipe) => recipe.cuisine === selectedCuisine);

	populateRecipeTable(filteredRecipes);
}

// Function to filter recipes based on the selected calories range
function filterRecipesByCalories(event, recipes) {
	console.log("filterRecipesByCalories");
	let minCalories = document.getElementById("minCalories").value;
	let maxCalories = document.getElementById("maxCalories").value;

	if (minCalories === "") minCalories = 0;
	if (maxCalories === "") maxCalories = 10000;

	console.log("minCalories: " + minCalories);
	console.log("maxCalories: " + maxCalories);

	let filteredRecipes = recipes.filter((recipe) => {
		const caloriesString = String(recipe.nutrients.calories);
		const calories =
			caloriesString !== "" ? parseFloat(caloriesString.slice(0, -4)) : null; //removing the " kcal" from the end of the string

		return (
			calories !== null && calories >= minCalories && calories <= maxCalories
		);
	});

	populateRecipeTable(filteredRecipes);
}

// Function to filter recipes based on the selected protein range
function filterRecipesByProtein(event, recipes) {
	console.log("filterRecipesByProtein");
	let minProtein = document.getElementById("minProtein").value;
	let maxProtein = document.getElementById("maxProtein").value;

	if (minProtein === "") minProtein = 0;
	if (maxProtein === "") maxProtein = 10000;

	console.log("minProtein: " + minProtein);
	console.log("maxProtein: " + maxProtein);

	let filteredRecipes = recipes.filter((recipe) => {
		const proteinString = String(recipe.nutrients.proteinContent);
		const protein =
			proteinString !== "" ? parseFloat(proteinString.slice(0, -2)) : null; //removing the " g" from the end of the string

		return protein !== null && protein >= minProtein && protein <= maxProtein;
	});

	populateRecipeTable(filteredRecipes);
}

// Function to filter recipes based on the selected fat range
function filterRecipesByFat(event, recipes) {
	console.log("filterRecipesByFat");
	let minFat = document.getElementById("minFat").value;
	let maxFat = document.getElementById("maxFat").value;

	if (minFat === "") minFat = 0;
	if (maxFat === "") maxFat = 10000;

	console.log("minFat: " + minFat);
	console.log("maxFat: " + maxFat);

	let filteredRecipes = recipes.filter((recipe) => {
		const fatString = String(recipe.nutrients.fatContent);
		const fat = fatString !== "" ? parseFloat(fatString.slice(0, -2)) : null; //removing the " g" from the end of the string

		return fat !== null && fat >= minFat && fat <= maxFat;
	});

	populateRecipeTable(filteredRecipes);
}

// Function to filter recipes based on the selected carbs range
function filterRecipesByCarbs(event, recipes) {
	console.log("filterRecipesByCarbs");
	let minCarbs = document.getElementById("minCarbs").value;
	let maxCarbs = document.getElementById("maxCarbs").value;

	if (minCarbs === "") minCarbs = 0;
	if (maxCarbs === "") maxCarbs = 10000;

	console.log("minCarbs: " + minCarbs);
	console.log("maxCarbs: " + maxCarbs);

	let filteredRecipes = recipes.filter((recipe) => {
		const carbsString = String(recipe.nutrients.carbohydrateContent);
		const carbs =
			carbsString !== "" ? parseFloat(carbsString.slice(0, -2)) : null; //removing the " g" from the end of the string

		return carbs !== null && carbs >= minCarbs && carbs <= maxCarbs;
	});

	populateRecipeTable(filteredRecipes);
}

//Function to filter based on the selected ingredient number range
function filterRecipesByIngredients(event, recipes) {
	console.log("filterRecipesByIngredients");
	let minIngredients = document.getElementById("minIngredients").value;
	let maxIngredients = document.getElementById("maxIngredients").value;

	if (minIngredients === "") minIngredients = 0;
	if (maxIngredients === "") maxIngredients = 10000;

	console.log("minIngredients: " + minIngredients);
	console.log("maxIngredients: " + maxIngredients);

	//the recipe ingredient list will be found at recipe.ingredients
	let filteredRecipes = recipes.filter((recipe) => {
		const ingredients = recipe.ingredients;
		return (
			ingredients.length >= minIngredients &&
			ingredients.length <= maxIngredients
		);
	});

	populateRecipeTable(filteredRecipes);
}

function openRecipeModal(recipe) {
	const modal = document.getElementById("recipeModal");
	const recipeDetails = document.getElementById("recipeDetails");

	// Customize this part to display the details you want
	recipeDetails.innerHTML = `
      <h1 class="title">${recipe.title}</h1>
      <p>Category: ${recipe.category}</p>
      <p>Calories: ${recipe.nutrients.calories}</p>
      <p>Protein: ${recipe.nutrients.proteinContent}</p>
      <p>Fat: ${recipe.nutrients.fatContent}</p>
      <p>Carbs: ${recipe.nutrients.carbohydrateContent}</p>
      <!-- Add more details as needed -->
    `;

	modal.classList.add("is-active");
}

function closeRecipeModal() {
	const modal = document.getElementById("recipeModal");
	modal.classList.remove("is-active");
}

// Update populateRecipeTable function to attach a click event to each recipe title
function populateRecipeTable(recipes) {
	const tableBody = document.getElementById("recipeTable");
	tableBody.innerHTML = ""; // Clear existing content

	recipes.forEach((recipe) => {
		let row = tableBody.insertRow();
		let titleCell = row.insertCell(0);
		let categoryCell = row.insertCell(1);
		let caloriesCell = row.insertCell(2);
		let proteinCell = row.insertCell(3);
		let fatCell = row.insertCell(4);
		let carbsCell = row.insertCell(5);

		titleCell.innerHTML = `<a href="javascript:void(0);" onclick="openRecipeModal(${JSON.stringify(
			recipe
		)})">${recipe.title}</a>`;

		//trim title text to only show 25 characters and add "..." to the end
		if (titleCell.textContent.length > 35) {
			titleCell.innerHTML = `<a href="javascript:void(0);" onclick="openRecipeModal(${JSON.stringify(
				recipe
			)})">${titleCell.textContent.substring(0, 35) + "..."}</a>`;
		}

		categoryCell.textContent = recipe.category;
		caloriesCell.textContent = recipe.nutrients.calories;
		proteinCell.textContent = recipe.nutrients.proteinContent;
		fatCell.textContent = recipe.nutrients.fatContent;
		carbsCell.textContent = recipe.nutrients.carbohydrateContent;

		// Add more cells based on your data
	});
}

// Initial setup when the page loads
document.addEventListener("DOMContentLoaded", async () => {
	const recipes = await fetch_recipes();
	if (recipes) {
		// populateCategoryFilter(recipes);
		populateRecipeTable(recipes);
		populateCuisineFilter(recipes);

		// Add event listeners for the filter controls
		// Cuisine filter
		document
			.getElementById("cuisineFilter")
			.addEventListener("change", (event) =>
				filterRecipesByCuisine(event, recipes)
			);

		// Range filters
		// Calories filter
		document
			.getElementById("minCalories")
			.addEventListener("change", (event) =>
				filterRecipesByCalories(event, recipes)
			);
		document
			.getElementById("maxCalories")
			.addEventListener("change", (event) =>
				filterRecipesByCalories(event, recipes)
			);
		// Protein filter
		document
			.getElementById("minProtein")
			.addEventListener("change", (event) =>
				filterRecipesByProtein(event, recipes)
			);
		document
			.getElementById("maxProtein")
			.addEventListener("change", (event) =>
				filterRecipesByProtein(event, recipes)
			);
		// Fat filter
		document
			.getElementById("minFat")
			.addEventListener("change", (event) =>
				filterRecipesByFat(event, recipes)
			);
		document
			.getElementById("maxFat")
			.addEventListener("change", (event) =>
				filterRecipesByFat(event, recipes)
			);
		// Carbs filter
		document
			.getElementById("minCarbs")
			.addEventListener("change", (event) =>
				filterRecipesByCarbs(event, recipes)
			);
		document
			.getElementById("maxCarbs")
			.addEventListener("change", (event) =>
				filterRecipesByCarbs(event, recipes)
			);
		// Ingredients filter
		document
			.getElementById("minIngredients")
			.addEventListener("change", (event) =>
				filterRecipesByIngredients(event, recipes)
			);
		document
			.getElementById("maxIngredients")
			.addEventListener("change", (event) =>
				filterRecipesByIngredients(event, recipes)
			);
	}
});
