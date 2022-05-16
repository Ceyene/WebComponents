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
                :host([opened]) #backdrop {
                    opacity: 1;
                    pointer-events: all;
                }
                #modal {
                    position: fixed;
                    top: 15vh;
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
                }
                :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }
                header {
                    padding: 1rem;
                }
                ::slotted(h1) {
                    font-size: 1.25rem;
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

		//adding listeners to our buttons in the shadow DOM
		const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
		const confirmButton = this.shadowRoot.querySelector('#confirm-btn');

		cancelButton.addEventListener('click', this._cancel.bind(this));
		confirmButton.addEventListener('click', this._confirm.bind(this));
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
	_cancel() {
		this.hide();
	}

	//confirming operation
	_confirm() {
		this.hide();
	}
}

customElements.define('uc-modal', Modal);
