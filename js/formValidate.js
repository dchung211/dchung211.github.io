/********f************
    
	Project 4 Javascript
	Name: Doanh Chung
	Date: December 12, 2023
	Description: The JavaScript file for form validation of contact.html.

*********************/
// Add document load event listener
document.addEventListener("DOMContentLoaded", load);

/*
 * Handles the load event of the document.
 */
function load() {
	document.getElementById("contactForm").addEventListener("submit", validate);
	document.getElementById("contactForm").addEventListener("reset", resetForm);

	setInitialState();
}

/*
 * Sets the initial state of the form.
 */
function setInitialState() {
	document.getElementById("thankYouMessage").style.display = "none";
	hideErrors();
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");
	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	hideErrors();

	if (formHasErrors()) {
		e.preventDefault();
		return false;
	}
	return true;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
	let thereIsAnError = false;

	let name = trim(document.getElementById("name").value);
	let phone = document.getElementById("phone").value;
	let email = trim(document.getElementById("email").value);
	let comments = trim(document.getElementById("comments").value);
	let agree = document.getElementById("agree");

	const phoneRegEx = new RegExp(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i);
	const emailRegEx = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i);


	if (name === "") {
		document.getElementById("name_error").style.display = "block";
		thereIsAnError = true;
	}

	if (phone === "") {
		document.getElementById("phone_error").style.display = "block";
		thereIsAnError = true;
	}
	else if (!phoneRegEx.test(phone)) {
		document.getElementById("phoneFormat_error").style.display = "block";
		thereIsAnError = true;
	}
	
	if (email === "") {
		document.getElementById("email_error").style.display = "block";
		thereIsAnError = true;
	}
	else if (!emailRegEx.test(email)) {
		document.getElementById("emailformat_error").style.display = "block";
		thereIsAnError = true;
	}

	if (comments === "") {
		document.getElementById("comments_error").style.display = "block";
		thereIsAnError = true;
	}

	if (agree.checked == false) {
		document.getElementById("agree_error").style.display = "block";
		thereIsAnError = true;
	}
	else {
		document.getElementById("thankYouMessage").style.display = "block";
	}

	return thereIsAnError;
}


/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
	if (confirm('Throw everything into the void?')) {
		hideErrors();
		document.getElementById("name").focus();
		return true;
	}
	e.preventDefault();
	setInitialState();
	return false;
}

/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str) 
{
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}