function calc_percent(calories, goal_calories) {
	console.log("calories: " + calories);
	console.log("goal_calories: " + goal_calories);
	let return_val = (calories / goal_calories) * 100;
	console.log("return_val: " + return_val);
	if (return_val > 100) {
		return_val = 100;
	} else if (return_val < 0) {
		return_val = 1;
	}
	return return_val;
}
