import Control, { ControlStruct } from '../../core/base/Control';
import UserDevice from '../../core/device/UserDevice';

interface PostPageControlSelectors {
	navbarContainer: string;
	postContainer: string;
	tableOfContentsContainer: string;
	tableOfContentsToggle: string;
	tableOfContentsHeader: string;
}

export default class PostPageControl extends Control implements ControlStruct {
	navbarContainer: HTMLElement;
	postContainer: HTMLElement;
	tableOfContentsContainer: HTMLElement;
	tableOfContentsToggle: HTMLElement;
	tableOfContentsList: HTMLElement;
	tableOfContentsHeader: HTMLElement;

	postHeadings: NodeListOf<Element>;
	device: UserDevice;

	constructor({
		navbarContainer,
		postContainer,
		tableOfContentsContainer,
		tableOfContentsToggle,
		tableOfContentsHeader
	}: PostPageControlSelectors) {
		super(navbarContainer, postContainer);
		this.navbarContainer = this.$query(navbarContainer);
		this.postContainer = this.$query(postContainer);
		this.tableOfContentsContainer = this.$query(tableOfContentsContainer);
		this.tableOfContentsList = this.$query(`${tableOfContentsContainer} ol`);
		this.tableOfContentsToggle = this.$query(tableOfContentsToggle);
		this.tableOfContentsHeader = this.$query(tableOfContentsHeader);

		this.postHeadings = this.queryPostHeadings();
		this.device = new UserDevice();
	}

	public init() {
		if (this.valid) {
			window.addEventListener('hashchange', (ev) => {
				ev.preventDefault();
				ev.stopPropagation();
			});
			this.attachScrollToPostHeadings();
			this.registerTocToggle();
			this.renderTableOfContents();
		}
	}

	private attachScrollToPostHeadings() {
		this.postHeadings.forEach((headingElement) => {
			headingElement.addEventListener('click', () => {
				this.scrollToElement(headingElement);
			});

			if (this.device.deviceType === 'desktop') {
				this.prependLinkIcon(headingElement);
			}
		});
	}

	private registerTocToggle() {
		this.tableOfContentsHeader.style.cursor = 'pointer';
		
		// Handle click
		this.tableOfContentsHeader.addEventListener('click', (event) => {
			event.stopPropagation();
			this.toggleTableOfContents();
		});

		// Handle keyboard
		this.tableOfContentsHeader.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				this.toggleTableOfContents();
			}
		});
	}

	private renderTableOfContents() {
		if (this.postHeadings.length === 0) {
			this.tableOfContentsContainer.style.display = 'none';
			return;
		}
		const headings: HTMLElement[] = [];
		let innerList: HTMLElement[] = [];

		const renderInnerList = () => {
			if (innerList.length > 0) {
				const list = document.createElement('ol');
				innerList.forEach((item) => list.append(item));
				this.tableOfContentsList.append(list);
				innerList = [];
			}
		};

		this.postHeadings.forEach((heading: HTMLElement) => {
			headings.push(this.rederTocItem(heading));
		});
		headings.forEach((heading, index) => {
			if (heading?.dataset.level === '2') {
				renderInnerList();
				this.tableOfContentsList.append(heading);
			}

			if (heading?.dataset.level === '3') {
				innerList.push(heading);
			}
		});
		renderInnerList();
	}

	private scrollToElement(element: Element) {
		const navbarHeight = this.navbarContainer.getClientRects()[0].height;
		window.scroll({
			top: element.getBoundingClientRect().top + window.scrollY - navbarHeight,
			behavior: 'smooth',
		});
		history.pushState(null, null, `#${element.id}`);
	}

	private prependLinkIcon(element: Element) {
		const icon = this.renderLinkIcon();
		element.prepend(icon);
		element.addEventListener('mouseenter', () => {
			icon.style.opacity = '1';
		});
		element.addEventListener('mouseleave', () => {
			icon.style.opacity = '0';
		});
	}

	private queryPostHeadings() {
		return this.postContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
	}

	private toggleTableOfContents() {
		if (this.tableOfContentsList.tabIndex === -1) {
			this.showTableOfContents();
		} else {
			this.hideTableOfContents();
		}
	}

	private showTableOfContents() {
		let maxListHeight = 0;
		this.tableOfContentsList.childNodes.forEach((item: HTMLElement) => {
			maxListHeight += item.clientHeight;
		});
		this.tableOfContentsList.style.maxHeight = `${maxListHeight * 2}px`;
		this.tableOfContentsList.tabIndex = 1;
		this.tableOfContentsToggle.style.rotate = '90deg';
		this.tableOfContentsHeader.setAttribute('aria-expanded', 'true');
	}

	private hideTableOfContents() {
		this.tableOfContentsList.style.maxHeight = null;
		this.tableOfContentsList.tabIndex = -1;
		this.tableOfContentsToggle.style.rotate = '0deg';
		this.tableOfContentsHeader.setAttribute('aria-expanded', 'false');
	}

	private renderLinkIcon() {
		const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

		iconSvg.setAttribute('fill', 'none');
		iconSvg.setAttribute('viewBox', '0 0 24 24');
		iconSvg.classList.add('icon', 'icon--post-heading');

		iconPath.setAttribute(
			'd',
			'M8 4V8H4V10H8V14H4V16H8V20H10V16H14V20H16V16H20V14H16V10H20V8H16V4H14V8H10V4H8ZM14 14V10H10V14H14Z'
		);

		iconPath.setAttribute('fill-rule', 'evenodd');
		iconPath.setAttribute('clip-rule', 'evenodd');

		iconPath.setAttribute('fill', 'currentColor');

		iconSvg.appendChild(iconPath);

		return iconSvg;
	}

	private rederTocItem(heading: HTMLElement) {
		const headingLevel = heading?.nodeName.toLowerCase().replace('h', '');

		if (+headingLevel > 3) {
			return null;
		}
		const item = document.createElement('li');
		item.classList.add(
			'page__toc__item',
			`mr-${+headingLevel * 2}`,
			`ml-${+headingLevel * 3}`,
			'my-1'
		);
		item.innerText = heading?.innerText;
		item.tabIndex = 1;
		item.dataset.level = headingLevel;
		item.addEventListener('click', () => this.scrollToElement(heading));
		item.addEventListener('keypress', (ev: KeyboardEvent) => {
			ev.preventDefault();
			if (ev.key.toLowerCase() === 'enter') {
				this.scrollToElement(heading);
			}
		});
		return item;
	}
}
