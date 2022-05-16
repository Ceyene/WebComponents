class Modal extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.isOpen = false;
		this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.75);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }
                #modal {
                    position: fixed;
                    top: 10vh;
                    left: 25%;
                    width: 50%;
                    z-index: 100;
                    background: #efefef;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.25);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 1rem;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.3s ease-out;
                }
                :host([opened]) #backdrop,
                :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }
                :host([opened]) #modal {
                    top: 15vh;
                }
                header {
                    padding: 1rem;
                }
                ::slotted(h1) {
                    font-size: 1.25rem;
                    margin: 0;
                }
                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                }
                #actions button {
                    margin: 0 0.5rem;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name='title'>Please confirm payment</slot>
                </header>
                <section id='main'>
                    <slot></slot>
                </section>
                <section id='actions'>
                    <button id='cancel-btn'>Cancel</button>
                    <button id='confirm-btn'>Okay</button>
                </section>
            </div>
        `;
		//getting access to the slot content
		const slots = this.shadowRoot.querySelectorAll('slot');
		//listening the "slotchange" event
		slots[1].addEventListener('slotchange', (event) => {
			//analize content from our slot
			console.dir(slots[1].assignedNodes()); //see the content projected into the slot
		});

		//adding listeners to our buttons (and the backdrop) in the shadow DOM
		const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
		const confirmButton = this.shadowRoot.querySelector('#confirm-btn');
		const backdrop = this.shadowRoot.querySelector('#backdrop');

		cancelButton.addEventListener('click', this._cancel.bind(this));
		confirmButton.addEventListener('click', this._confirm.bind(this));
		backdrop.addEventListener('click', this._cancel.bind(this));

		//listening custom events
		// cancelButton.addEventListener('cancel', () => {
		// 	console.log('Canceled inside the component');
		// });
	}

	//reacting to attribute changes
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'opened') {
			if (this.hasAttribute('opened')) {
				this.isOpen = true;
			} else {
				this.isOpen = false;
			}
		}
	}
	//listening attribute changes
	static get observedAttributes() {
		return ['opened'];
	}

	//showing modal
	open() {
		this.setAttribute('opened', '');
	}

	//hiding modal
	hide() {
		if (this.hasAttribute('opened')) {
			this.removeAttribute('opened');
			this.isOpen = false;
		}
	}

	//cancelling operation
	//we get the event object from the addEventListener function where this is going to be used
	_cancel(event) {
		this.hide();
		//creating and dispatching custom event -> longer version
		const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
		event.target.dispatchEvent(cancelEvent);
	}

	//confirming operation
	_confirm() {
		this.hide();
		//creating and dispatching custom event -> shorter version
		const confirmEvent = new Event('confirm');
		this.dispatchEvent(confirmEvent); //this points to the target element, not triggers inside the shadow DOM
	}
}

customElements.define('uc-modal', Modal);
