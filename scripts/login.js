$document.ready(function () {
	//check if the user already has data in local storage
	let ff_user_data = localStorage.getItem("ff_user_data");

	//if the user has data in local storage, redirect to the home page
	if (ff_user_data) {
		console.log("User data found in local storage");
		console.log(ff_user_data);
		window.location.href = "/home";
	}
});
