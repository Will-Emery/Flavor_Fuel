function check_local_storage() {
	//check if the user already has data in local storage
	let ff_user_data = localStorage.getItem("ff_user_data");

	//if the user has data in local storage, redirect to the home page
	if (ff_user_data) {
		//TODO: uncomment this code when the home page is ready
		// console.log("User data found in local storage");
		// console.log(ff_user_data);
		// window.location.href = "/home";

		//delete anything found in local storage
		localStorage.clear();
	} else {
		console.log("No user data found in local storage");
		console.log("redirecting to setup page");
		//send a post request to the server to get the setup page
		window.location.href = "/setup";
	}
}
