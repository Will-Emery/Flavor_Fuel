function calc_percent(calories, goal_calories) {
	let return_val = (calories / goal_calories) * 100;
	if (return_val > 100) {
		return_val = 100;
	} else if (return_val < 0) {
		return_val = 1;
	}
	return return_val;
}
