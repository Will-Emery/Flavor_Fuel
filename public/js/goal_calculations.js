export function lbs_to_kg(lbs) {
	return lbs * 0.45359237;
}

export function inches_to_cm(inches) {
	return inches * 2.54;
}

export function calculate_bmr(gender, weight, height, age) {
	if (gender === "Woman") {
		return 10 * weight + 6.25 * height - 5 * age - 161;
	} else {
		return 10 * weight + 6.25 * height - 5 * age + 5;
	}
}

export function adjust_calories_for_activity(bmr, activity) {}
