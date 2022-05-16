//creating my custom HTML Element
// extending (inheriting) from HTMLElement browser built-in class to make it usable as a custom element
class Tooltip extends HTMLElement {
	//method executed by JS whenever this class is instantiated
	constructor() {
		super(); // accessing HTMLElement methods and properties
		this._tooltipIcon; //initializing as undefined
		this._tooltipVisible = false;
		this._tooltipText = 'This is some plain text'; //initializing as plain text;
		this.attachShadow({ mode: 'open' }); //attaching shadow DOM to this element
		this.shadowRoot.innerHTML = `
    <style>
			div {
				background-color: black;
        		color: white;
        		position: absolute;
				top: 1rem;
				left: 0.75rem;
        		z-index: 10;
				border-radius: 3px;
				box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.26);
			}

			::slotted(.highlight) {
				background-color: gold;
			}

			:host(.important) {
				padding: 1rem;
				background-color: var(--color-primary, #ccc);
			}

			:host-context(p) {
				font-weight: 600;
			}

			.icon {
				background: black;
				color: white;
				font-weight: 600;
				padding: 0.35rem 0.25rem;
				text-align: center;
				border-radius: 50%;
			}
		</style>
      <slot>Some default</slot> 
      <span class="icon"> (?)</span>
    `; //adding HTML template to our shadowRoot
	}

	//manipulating DOM
	connectedCallback() {
		//using attributes
		if (this.hasAttribute('text')) {
			//getting the 'text' html element's attribute and assigning it to tooltipText
			this._tooltipText = this.getAttribute('text');
		}
		//getting the span inside our template
		this._tooltipIcon = this.shadowRoot.querySelector('span');
		//adding event listeners
		this._tooltipIcon.addEventListener(
			'mouseenter',
			this._showTooltip.bind(this)
		);
		this._tooltipIcon.addEventListener(
			'mouseleave',
			this._hideTooltip.bind(this)
		);
		//adding the span as a child of the element where is inserted
		//first, access the shadow root
		this.shadowRoot.appendChild(tooltipIcon);
		//adding some styles
		this.style.position = 'relative';
	}

	//observing attribute changes
	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}
		if (name === 'text') {
			this._tooltipText = newValue;
		}
	}

	//listening attribute changes
	static get observedAttributes() {
		return ['text']; //return an array of attributes you are going to be listening for changes
	}

	//clearing up (event listeners, requests, etc)
	disconnectedCallback() {
		this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
		this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
	}

	//logic to update the DOM (adding, removing elements)
	_render() {
		let tooltipContainer;
		if (this._tooltipVisible) {
			tooltipContainer = document.createElement('div');
			tooltipContainer.textContent = this._tooltipText;
			//first, access the shadow root
			this.shadowRoot.appendChild(this._tooltipContainer); //this points to the tooltip element
		} else {
			//first, access the shadow root
			this.shadowRoot.removeChild(this._tooltipContainer);
		}
	}

	//methods to be executed when event occurs
	// name -> starts with _ as a convention for methods only used from inside the class ('private' in other languages)
	//they can be used from the outside, technically, but as a convention you shouldn't
	_showTooltip() {
		this._tooltipVisible = true;
		this._render();
	}

	_hideTooltip() {
		this._tooltipVisible = false;
		this._render();
	}
}

//defining your html tag's name, and the class that is going to be instantiated when using it
customElements.define('uc-tooltip', Tooltip);
