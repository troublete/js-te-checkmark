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
	}

	set checked(checked) {
		if (checked) {
			this.setAttribute('checked', '');
		} else {
			this.removeAttribute('checked');
		}
	}

	get checked() {
		return this.hasAttribute('checked');
	}

	static get observedAttributes() {
		return ['checked'];
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
