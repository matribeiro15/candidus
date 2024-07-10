import { CANDIDUS_BOOKMARK_EVENT } from '../consts';
import Control, { ControlStruct } from '../core/base/Control';

import UserDevice from '../core/device/UserDevice';
import * as Bookmark from '../util/Bookmark';

const MAX_LIST_HEIGHT = 400;

interface BookmarkListOptions {
	navbarContainerSelector: string;
	bookmarkListToggleSelector: string;
	bookmarkListSelector: string;
	bookmarkPlaceholderSelector: string;
}

export default class BookmarkListControl extends Control implements ControlStruct {
	navbarContainer: HTMLElement;
	bookmarkListToggle: HTMLElement;
	bookmarkList: HTMLElement;
	bookmarkPlaceholder: HTMLElement;
	device: UserDevice;

	constructor({
		navbarContainerSelector,
		bookmarkListSelector,
		bookmarkListToggleSelector,
		bookmarkPlaceholderSelector,
	}: BookmarkListOptions) {
		super(navbarContainerSelector, bookmarkListSelector, bookmarkListToggleSelector);
		this.navbarContainer = this.$query(navbarContainerSelector);
		this.bookmarkListToggle = this.$query(bookmarkListToggleSelector);
		this.bookmarkList = this.$query(bookmarkListSelector);
		this.bookmarkPlaceholder = this.$query(bookmarkPlaceholderSelector).cloneNode(
			true
		) as HTMLElement;
		this.device = new UserDevice();
	}

	init() {
		// Remove this feature on mobile devices
		const isSmallerDevice = this.device.getDeviceType() === 'mobile-sm' || this.device.getDeviceType() === 'mobile-md'
		if (this.valid && isSmallerDevice) {
			this.$log(
				`Device type: ${this.device.getDeviceType()} recognized. Removing bookmark controls`
			);
			this.bookmarkListToggle.remove();
			this.bookmarkList.remove();
			return;
		}

		if (this.valid) {
			this.registerBookmarkListToggle();
			this.renderBookmarkList(Bookmark.getLocalBookmarks());
			this.listenToNewBookmarkEvent();
			this.registerBookmarkPageScroll();
		}
	}

	private registerBookmarkListToggle() {
		this.bookmarkListToggle.addEventListener('click', () => this.toggleBookmarkList());
	}

	private toggleBookmarkList() {
		if (this.bookmarkList.tabIndex === -1) {
			return this.showBookmarkList();
		}
		this.hideBookmarkList();
	}

	private showBookmarkList() {
		this.bookmarkListToggle.classList.add('active');
		if (this.bookmarkList.scrollHeight > MAX_LIST_HEIGHT) {
			this.bookmarkList.style.maxHeight = MAX_LIST_HEIGHT + 'px';
			this.bookmarkList.style.overflowY = 'scroll';
		} else {
			this.bookmarkList.style.maxHeight = this.bookmarkList.scrollHeight + 'px';
			this.bookmarkList.style.overflowY = 'hidden';
		}
		this.bookmarkList.tabIndex = 1;
	}

	private hideBookmarkList() {
		this.bookmarkListToggle.classList.remove('active');
		this.bookmarkList.style.maxHeight = null;
		this.bookmarkList.tabIndex = -1;
	}

	private renderBookmarkList(localBookmarks: Bookmark.BookmarkStruct[]) {
		this.removeBookmarkChildNodes();

		if (localBookmarks.length > 0) {
			localBookmarks.forEach((localBookmark) => {
				const bookmarkElement = this.createBookmarkElement(localBookmark);
				this.bookmarkList.append(bookmarkElement);
			});
			return;
		}

		this.bookmarkList.append(this.bookmarkPlaceholder);
	}

	private createBookmarkElement({ path, node, title, text }: Bookmark.BookmarkStruct) {
		const linkElement = document.createElement('a');
		const listElement = document.createElement('li');
		const headingElement = document.createElement('h2');
		const textElement = document.createElement('p');

		listElement.classList.add('p-2');
		linkElement.href = `${path}#${node}`;
		linkElement.classList.add('dropdown__drawer__item');
		linkElement.addEventListener('click', (ev) => this.navigateToClickedBookmark(ev));

		headingElement.classList.add('dropdown__drawer__title', 'mb-1');
		headingElement.innerText = title;

		textElement.classList.add('dropdown__drawer__text');
		textElement.innerText = text;

		linkElement.append(headingElement);
		linkElement.append(textElement);
		listElement.append(linkElement);
		return listElement;
	}

	private removeBookmarkChildNodes() {
		while (this.bookmarkList.firstChild) {
			this.bookmarkList.removeChild(this.bookmarkList.firstChild);
		}
	}

	private navigateToClickedBookmark(ev: Event) {
		const clickedElement = ev.target as HTMLElement;
		const anchorElement =
			clickedElement.nodeName.toLowerCase() === 'li'
				? (clickedElement.firstChild as HTMLAnchorElement)
				: clickedElement.nodeName.toLowerCase() === 'a'
					? (clickedElement as HTMLAnchorElement)
					: (clickedElement.parentElement as HTMLAnchorElement);
		const [targetPath, targetHash] = anchorElement.href.split('#');
		const [windowPath] = window.location.href.split('#');
		if (targetPath === windowPath) {
			ev.preventDefault();
			this.scrollToElement(`#${targetHash}`);
			return;
		}
	}

	private registerBookmarkPageScroll() {
		window.addEventListener('load', (ev) => {
			if (window.location.hash) {
				this.scrollToElement(window.location.hash);
			}
		});
	}

	private scrollToElement(hash: string) {
		const navbarHeight = this.navbarContainer.getClientRects()[0].height;
		const element = this.$query(hash);
		window.scroll({
			top: element.getBoundingClientRect().top + window.scrollY - navbarHeight * 1.25,
			behavior: 'smooth',
		});
	}

	private listenToNewBookmarkEvent() {
		window.addEventListener(CANDIDUS_BOOKMARK_EVENT, (ev: Event) => {
			// @ts-ignore
			this.renderBookmarkList(ev.detail);
		});
	}
}
