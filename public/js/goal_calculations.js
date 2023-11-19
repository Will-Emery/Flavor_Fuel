function lbs_to_kg(lbs) {
	console.log("lbs to kg");
	console.log(lbs);
	return Number((lbs * 0.45359237).toFixed(2));
}

function inches_to_cm(inches) {
	return Number((inches * 2.54).toFixed(2));
}

function calculate_bmr(gender, weight, height, age) {
	weight = lbs_to_kg(weight);
	console.log("weight in kg");
	console.log(weight);
	height = inches_to_cm(height);
	console.log("height in cm");
	console.log(height);
	if (gender === "Female") {
		// print the BMR
		console.log(10 * weight + 6.25 * height - 5 * age - 161);
		return Number((10 * weight + 6.25 * height - 5 * age - 161).toFixed(2));
	} else {
		// print the BMR
		console.log(10 * weight + 6.25 * height - 5 * age + 5);
		return Number((10 * weight + 6.25 * height - 5 * age + 5).toFixed(2));
	}
}

function adjust_calories_for_activity(bmr, activity) {
	console.log("adjust calories for activity");
	console.log("activity" + activity);
	switch (activity) {
		case "Sedentary":
			console.log("sedentary");
			return Number((bmr * 1).toFixed(2));
		case "Lightly Active":
			return Number((bmr * 1.25).toFixed(2));
		case "Moderately Active":
			return Number((bmr * 1.5).toFixed(2));
		case "Very Active":
			return Number((bmr * 1.75).toFixed(2));
		case "Extremely Active":
			console.log("extremely active");
			console.log(bmr * 2);
			return Number((bmr * 2).toFixed(2));
		default:
			return Number(bmr.toFixed(2));
	}
}

function calculate_calorie_goal(bmr, goal) {
	console.log("calculate calorie goal");
	switch (goal) {
		case "Lose Weight":
			return Number((bmr - 500).toFixed(2));
		case "Maintain Weight":
			return Number(bmr.toFixed(2));
		case "Gain Weight":
			return Number((bmr + 500).toFixed(2));
		default:
			return Number(bmr.toFixed(2));
	}
}

function calculate_macros(calories, protein_preference, weight) {
	let protein = 0;
	if (protein_preference === "Low") {
		protein = Number((lbs_to_kg(weight) * 0.8).toFixed(2));
	} else if (protein_preference === "Medium") {
		protein = Number((lbs_to_kg(weight) * 1.4).toFixed(2));
	} else {
		protein = Number((lbs_to_kg(weight) * 2.2).toFixed(2));
	}
	let protein_cal = Number((protein * 4).toFixed(2));
	let fat_cal = Number((calories * 0.25).toFixed(2));
	let carbs_cal = Number((calories - protein_cal - fat_cal).toFixed(2));

	let macros = {
		protein: protein,
		fat: Number((fat_cal / 9).toFixed(2)),
		carbs: Number((carbs_cal / 4).toFixed(2)),
	};
	return macros;
}
