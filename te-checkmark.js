class TeCheckmark extends HTMLElement {
	constructor() {
		super();
		const shadowDom = this.attachShadow({mode: 'open'});
		shadowDom.appendChild(this.template);
		
		this.addEventListener('click', () => {
			if (this.checked) {
				this.checked = false;
			} else {
				this.checked = true;
			}
		});

		this.addEventListener('keydown', e => {
			if (e.keyCode !== 32 && e.keyCode !== 13) {
				return;
			}
			if (this.checked) {
				this.checked = false;
			} else {
				this.checked = true;
			}
		});
	}

	connectedCallback() {
		this.setAttribute('tabindex', '0');
		this.setAttribute('role', 'button');
		
		if (this.checked) {
			this.setAttribute('aria-pressed', 'true');
		} else {
			this.setAttribute('aria-pressed', 'false');
		}
	}

	set checked(checked) {
		if (checked) {
			this.setAttribute('checked', '');
			this.setAttribute('aria-pressed', 'true');
		} else {
			this.removeAttribute('checked');
			this.setAttribute('aria-pressed', 'false');
		}
	}

	get checked() {
		return this.hasAttribute('checked');
	}

	get template() {
		const template = document.createElement('template');
		template.innerHTML = `
		<style>
		:host {
			display:inline-block;
			font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;
			font-size:1rem;
			line-height:1rem;
			height:1rem;
			padding:var(--te-checkmark-padding, .35rem);
			min-width:1rem;
			border:1px solid black;
			text-align:center;
			border-radius:calc(2rem + var(--te-checkmark-padding, .35rem));
			font-weight:lighter;
			cursor:pointer;
			user-select:none;
		}
		:host([checked]) {
			color:var(--te-checkmark-checked-color, #4CC552);
			border-color:var(--te-checkmark-checked-color, #4CC552);
		}
		</style>
		<slot></slot>
		<span>✓</span>`;

		return template.content.cloneNode(true);
	}
}

if (window.customElements) {
	window.customElements.define('te-checkmark', TeCheckmark);
} else {
	throw new Error(`te-checkmark could not be registered`);
}
