function init_user_data() {
	let ff_user_data = {
		age: document.getElementById("age").value,
		gender: document.getElementById("gender").value,
		weight: document.getElementById("weight").value,
		height: document.getElementById("height").value,
		weight_goal: document.getElementById("weight_goal").value,
		protein_plan: document.getElementById("protein_plan").value,
		activity: document.getElementById("activity_level").value,
		goal_cal: 0,
		goal_protein: 0,
		goal_carbs: 0,
		goal_fat: 0,
		food: [],
		date: new Date().toLocaleDateString(),
		day_cal: 0,
		day_protein: 0,
		day_carbs: 0,
		day_fat: 0,
		day_food: [],
		historical_cal: [],
		historical_protein: [],
		historical_carbs: [],
		historical_fat: [],
		historical_food: [],
	};
	console.log(document.getElementById("gender").value);
	console.log(ff_user_data);

	//write the user data to local storage
	localStorage.setItem("ff_user_data", JSON.stringify(ff_user_data));
}

function add_init_calculations_to_user_data(calorie_goal, macros) {
	let ff_user_data = load_user_data();
	ff_user_data.goal_cal = calorie_goal;
	ff_user_data.goal_protein = macros.protein;
	ff_user_data.goal_carbs = macros.carbs;
	ff_user_data.goal_fat = macros.fat;
	console.log(ff_user_data);
	localStorage.setItem("ff_user_data", JSON.stringify(ff_user_data));
}

function load_user_data() {
	let ff_user_data = localStorage.getItem("ff_user_data");
	ff_user_data = JSON.parse(ff_user_data);
	console.log(ff_user_data);
	return ff_user_data;
}
