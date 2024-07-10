import { ENABLE_DEBUGGING } from "../../consts";

export interface ControlStruct {
	init(): void;
}

export default class Control {
	private debug: boolean = ENABLE_DEBUGGING;
	public valid: boolean;

	constructor(...htmlElements: string[]) {
		this.valid = this.$verify(...htmlElements);
	}

	public $verify(...htmlElements: string[]): boolean {
		let allElementsExist = true;
		htmlElements.forEach((selector) => {
			if (!this.$query(selector)) {
				allElementsExist = false;
				this.$log(`Control could not find element for ${selector}`);
			}
		});
		return allElementsExist;
	}

	/**
	 *
	 * @param selector A valid query selector string
	 */
	public $query(selector: string): HTMLElement {
		return document.querySelector(selector);
	}

	public $queryAll(selector: string): NodeList {
		return document.querySelectorAll(selector);
	}

	public $log(message: string) {
		if (this.debug) {
			console.warn(message);
		}
	}
}
