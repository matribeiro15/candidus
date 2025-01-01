import Control, { ControlStruct } from '../../core/base/Control';

interface SidebarControlSelectors {
	toggleButton: string;
	sidebarElement: string;
}

/**
 * Class managing the sidebar and its toggle button.
 *
 * @class SidebarControl
 */
export default class SidebarControl extends Control implements ControlStruct {
	/**
	 * The toggle button.
	 *
	 * @type {HTMLButtonElement}
	 */
	toggleButton: HTMLButtonElement;

	/**
	 * The sidebar element.
	 *
	 * @type {HTMLElement}
	 */
	sidebarElement: HTMLElement;

	/**
	 * Constructor.
	 *
	 * @param {SidebarControlSelectors} [selectors] - Object containing the selectors for the toggle button and sidebar element.
	 */
	constructor({ toggleButton, sidebarElement }: SidebarControlSelectors) {
		super(toggleButton, sidebarElement);
		this.toggleButton = this.$query(toggleButton) as HTMLButtonElement;
		this.sidebarElement = this.$query(sidebarElement);
	}

	/**
	 * Initializes the class.
	 */
	public init() {
		if (this.valid) {
			this.toggleButton.addEventListener('click', () => this.toggleSidebarElement());
			document.addEventListener('keydown', (ev) => this.registerEscKeyToCloseSidebar(ev));

		}
	}

	/**
	 * Toggles the sidebar element.
	 */
	private toggleSidebarElement() {
		const isSidebarHidden = this.sidebarElement.classList.contains('sidebar--hidden');
		if (isSidebarHidden) {
			this.showSidebarElement();
			return this.focusFirstSidebarNavigationElement();
		}
		this.hideSidebarElement();
		return this.focusSidebarToggleButton();
	}

	/**
	 * Shows the sidebar element.
	 */
	private showSidebarElement() {
		this.sidebarElement.ariaHidden = 'false';
		this.toggleButton.classList.add('active');
		this.sidebarElement.querySelectorAll('a').forEach((node) => node.setAttribute('tabindex', '1'));
		return this.sidebarElement.classList.remove('sidebar--hidden');
	}

	/**
	 * Focuses the first sidebar navigation element.
	 */
	private focusFirstSidebarNavigationElement() {
		(document.querySelector('.sidebar__navigation__item a') as HTMLAnchorElement).focus();
	}

	private registerEscKeyToCloseSidebar(event: KeyboardEvent) {
		if (event.key === 'Escape' && !this.sidebarElement.classList.contains('sidebar--hidden')) {
			event.preventDefault();
			this.hideSidebarElement();
			this.focusSidebarToggleButton();
		}
	}

	/**
	 * Focuses the sidebar toggle button.
	 */
	private focusSidebarToggleButton() {
		this.toggleButton.focus();
	}

	/**
	 * Hides the sidebar element by adding 'sidebar--hidden'.
	 */
	private hideSidebarElement() {
		this.sidebarElement.ariaHidden = 'true';
		this.toggleButton.classList.remove('active');
		this.sidebarElement
			.querySelectorAll('a')
			.forEach((node) => node.setAttribute('tabindex', '-1'));
		this.sidebarElement.classList.add('sidebar--hidden');
	}
}

