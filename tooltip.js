//creating my custom HTML Element
// extending (inheriting) from HTMLElement browser built-in class to make it usable as a custom element
class Tooltip extends HTMLElement {
	//method executed by JS whenever this class is instantiated
	constructor() {
		super(); // accessing HTMLElement methods and properties
		this._tooltipContainer; //initializing as undefined
	}

	//manipulating DOM
	connectedCallback() {
		const tooltipIcon = document.createElement('span');
		tooltipIcon.textContent = ' (?)';
		//adding event listeners
		tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
		tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
		//adding the span as a child of the element where is inserted
		this.appendChild(tooltipIcon);
	}

	//methods to be executed when event occurs
	// name -> starts with _ as a convention for methods only used from inside the class ('private' in other languages)
	//they can be used from the outside, technically, but as a convention you shouldn't
	_showTooltip() {
		this._tooltipContainer = document.createElement('div');
		this._tooltipContainer.textContent = 'This is the tooltip text';
		this.appendChild(this._tooltipContainer); //this points to the tooltip element
	}

	_hideTooltip() {
		this.removeChild(this._tooltipContainer);
	}
}

//defining your html tag's name, and the class that is going to be instantiated when using it
customElements.define('uc-tooltip', Tooltip);
