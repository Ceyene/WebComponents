class Modal extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
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
                header {
                    padding: 1rem;
                }
                header h1 {
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
                    <h1>Please confirm</h1>
                </header>
                <section id='main'>
                    <slot></slot>
                </section>
                <section id='actions'>
                    <button>Cancel</button>
                    <button>Okay</button>
                </section>
            </div>
        `;
	}

	//listening changes in attributes
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'opened') {
			if (this.hasAttribute('opened')) {
				this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
				this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
				this.shadowRoot.querySelector('#modal').style.opacity = 1;
				this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
			}
		}
	}

	//listening attribute changes
	static get observedAttributes() {
		return ['opened'];
	}
}

customElements.define('uc-modal', Modal);
