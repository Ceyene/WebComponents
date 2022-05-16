//extending Built-in Elements (in this case, the anchor tag, which will be specified in the define line)
class ConfirmLink extends HTMLAnchorElement {
	//you can add things inside the constructor, like in the completely custom element

	//manipulating the DOM
	connectedCallback() {
		//listening events
		this.addEventListener('click', (event) => {
			if (!confirm('Do you really want to leave?')) {
				event.preventDefault();
			}
		});
	}
}

//defining our created class to the new custom element, extended from the anchor tag
customElements.define('uc-confirm-link', ConfirmLink, { extends: 'a' });
