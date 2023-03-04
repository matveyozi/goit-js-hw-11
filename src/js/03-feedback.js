const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(saveInputValue, 500));
form.addEventListener('submit', clearStorage)
getDataLocal()
function getDataLocal() {
	try {
		const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));


		for (let key in form.elements) {
			if (savedData[key]) {
				form.elements[key].value = savedData[key];
			}

		}
	} catch (error) {
		console.log(error.message)
	}
	
}
function saveInputValue(e) {
	
	const {
		elements: { email, message }
	} = e.currentTarget;
	let result = { email: email.value, message: message.value };
	localStorage.setItem('feedback-form-state', JSON.stringify(result))
	// console.log(localStorage.getItem('feedback-form-state'))
}
function clearStorage(e) {
	e.preventDefault();
	
	localStorage.clear();
	form.reset()
}
