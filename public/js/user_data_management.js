function init_user_data() {
	let ff_user_data = {
		age: document.getElementById("age").value,
		goal: "none",
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

	//write the user data to local storage
	localStorage.setItem("ff_user_data", JSON.stringify(ff_user_data));
}

function load_user_data() {
	let ff_user_data = localStorage.getItem("ff_user_data");
	ff_user_data = JSON.parse(ff_user_data);
	console.log(ff_user_data);
	return ff_user_data;
}
