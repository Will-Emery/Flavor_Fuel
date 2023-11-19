function logFoodEntry() {
	user_data = load_user_data();

	const food_name = document.getElementById("foodName").value;
	const food_calories = document.getElementById("calories").value;
	const food_protein = document.getElementById("protein").value;
	const food_carbs = document.getElementById("carbs").value;
	const food_fat = document.getElementById("fat").value;

	console.log(food_name);
	console.log(food_calories);
	console.log(food_protein);
	console.log(food_carbs);
	console.log(food_fat);

	// Add the food entry to the user data
	user_data.day_cal += food_calories;
	user_data.day_protein += food_protein;
	user_data.day_carbs += food_carbs;
	user_data.day_fat += food_fat;
	user_data.food.push(food_name);

	console.log(user_data);

	// Update the local storage with the new user data
	localStorage.setItem("ff_user_data", JSON.stringify(user_data));
}

function load_user_data() {
	let ff_user_data = localStorage.getItem("ff_user_data");
	ff_user_data = JSON.parse(ff_user_data);
	return ff_user_data;
}
