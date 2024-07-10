import Control, { ControlStruct } from '../../core/base/Control';

interface SidebarControlSelectors {
	toggleButton: string;
	sidebarElement: string;
}

export default class SidebarControl extends Control implements ControlStruct {
	toggleButton: HTMLButtonElement;
	sidebarElement: HTMLElement;

	constructor({ toggleButton, sidebarElement }: SidebarControlSelectors) {
		super(toggleButton, sidebarElement);
		this.toggleButton = this.$query(toggleButton) as HTMLButtonElement;
		this.sidebarElement = this.$query(sidebarElement);
	}

	public init() {
		if (this.valid) {
			this.toggleButton.addEventListener('click', () => this.toggleSidebarElement());
		}
	}

	private toggleSidebarElement() {
		const isSidebarHidden = this.sidebarElement.classList.contains('sidebar--hidden');
		if (isSidebarHidden) {
			this.showSidebarElement();
			return this.focusFirstSidebarNavigationElement();
		}
		this.hideSidebarElement();
		return this.focusSidebarToggleButton();
	}

	private showSidebarElement() {
		this.sidebarElement.ariaHidden = 'false';
		this.toggleButton.classList.add('active');
		this.sidebarElement.querySelectorAll('a').forEach((node) => node.setAttribute('tabindex', '1'));
		return this.sidebarElement.classList.remove('sidebar--hidden');
	}

	private focusFirstSidebarNavigationElement() {
		(document.querySelector('.sidebar__navigation__item a') as HTMLAnchorElement).focus();
	}

	private focusSidebarToggleButton() {
		this.toggleButton.focus();
	}

	private hideSidebarElement() {
		this.sidebarElement.ariaHidden = 'true';
		this.toggleButton.classList.remove('active');
		this.sidebarElement
			.querySelectorAll('a')
			.forEach((node) => node.setAttribute('tabindex', '-1'));
		this.sidebarElement.classList.add('sidebar--hidden');
	}
}
