/**	CONTACT FORM
*************************************************** **/
var _hash = window.location.hash;

/**
	BROWSER HASH - from php/contact.php redirect!

	#alert_success 		= email sent
	#alert_failed		= email not sent - internal server error (404 error or SMTP problem)
	#alert_mandatory	= email not sent - required fields empty
**/	jQuery(_hash).show();
// All below is the function to post the contact for to the API
const formEl = document.getElementById("contact-form");

formEl.addEventListener("submit", (event) => {
	event.preventDefault(); //stop the page reloading

// Code below grabs the information from the form
const formData = new FormData(formEl);
const obj = Object.fromEntries(formData);

console.log(JSON.stringify(obj));
// The below sends the info to the URL that we were given
fetch("http://localhost:3015/contact", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify(obj),
	
})
.then((response) => response.json())
.then((obj) => {
    console.log('Success:', obj);
})
.catch((error) => {
    console.error('Error:', error);
})
});
