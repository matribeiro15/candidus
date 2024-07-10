interface TextToolbarOptions {
	containerSelector: string;
	markableElementSelectors: string[];
	popoverSelector: string;
	bookmarkButtonSelector: string;
	twitterButtonSelector: string;
	clipboardButtonSelector: string;
}

import Control, { ControlStruct } from '../../core/base/Control';
import * as Bookmark from '../../util/Bookmark';

export default class TextToolbar extends Control implements ControlStruct {
	containerElement: HTMLElement;
	markableElements: Record<string, NodeList>;
	popover: HTMLElement;
	markableElementSelectors: string[];
	markedText: string;
	markedParagraph: HTMLElement;
	bookmarkButton: HTMLElement;
	twitterButton: HTMLElement;
	clipboardButton: HTMLElement;
	windowOptions: string;

	constructor({
		containerSelector,
		markableElementSelectors,
		popoverSelector,
		bookmarkButtonSelector,
		twitterButtonSelector,
		clipboardButtonSelector,
	}: TextToolbarOptions) {
		super(containerSelector, popoverSelector, twitterButtonSelector, clipboardButtonSelector);
		this.windowOptions = 'menubar=no,status=no,height=750,width=500';
		if (this.valid) {
			this.containerElement = this.$query(containerSelector);
			this.popover = this.$query(popoverSelector);
			this.bookmarkButton = this.$query(bookmarkButtonSelector);
			this.twitterButton = this.$query(twitterButtonSelector);
			this.clipboardButton = this.$query(clipboardButtonSelector);
			this.markableElementSelectors = markableElementSelectors;
			this.markableElements = {};
			markableElementSelectors.forEach((selector) => {
				this.markableElements[selector] = this.containerElement.querySelectorAll(selector);
			});
		}
	}

	public init() {
		this.registerMarkableNodes();
		this.registerTwitterButton();
		this.registerClipboardButton();
		if (this.bookmarkButton) {
			this.registerBookmarkButton();
			this.markSavedBookmarks();
		}
	}

	private registerMarkableNodes() {
		for (let selector in this.markableElements) {
			this.markableElements[selector].forEach((node, index) => {
				(node as HTMLElement).id = `${selector}-${index}`;
				(node as HTMLElement).style.position = "relative";
				window.addEventListener('mouseup', (ev: MouseEvent) => this.onMouseUp(ev));
			});
		}
	}

	private registerBookmarkButton() {
		this.bookmarkButton.addEventListener('click', () => this.bookmarkParagraph());
	}

	private registerTwitterButton() {
		this.twitterButton.addEventListener('click', () => this.shareToTwitter());
	}

	private registerClipboardButton() {
		this.clipboardButton.addEventListener('click', () => this.copyToClipboard());
	}

	private markSavedBookmarks() {
		for (let selector in this.markableElements) {
			this.markableElements[selector].forEach((node, index) => {
				this.prependSavedBookmarkButton(`${selector}-${index}`);
			});
		}
	}

	private onMouseUp(ev: MouseEvent) {
		if (window.getSelection().toString().length > 0) {
			this.handleTextSelected(ev);
		} else {
			this.handleNoTextSelected();
		}
	}

	private bookmarkParagraph() {
		this.markedParagraph.prepend(this.cloneBookmarkButton(this.markedParagraph.id));
		Bookmark.saveLocalBookmark({
			node: this.markedParagraph.id,
			path: window.location.pathname,
			title: this.$query('h1').innerText,
			text: this.markedText,
		});
		this.hidePopover();
		window.getSelection().empty();
	}

	private async shareToTwitter() {
		window.open(
			`
			https://twitter.com/intent/tweet?text="${this.markedText}"—&url=${window.location.href}`,
			'_blank',
			this.windowOptions
		);

		this.hidePopover();
		window.getSelection().empty();
	}

	private copyToClipboard() {
		navigator.clipboard.writeText(window.getSelection().toString());
		this.hidePopover();
		window.getSelection().empty();
	}

	private handleTextSelected(ev: MouseEvent) {
		ev.preventDefault();
		ev.stopPropagation();
		const currentlyMarkedElement = window.getSelection().anchorNode.parentNode as HTMLElement
		if (this.isMarkableElement(currentlyMarkedElement.id)) {
			this.showPopover(ev);
			this.markedText = window.getSelection().toString();
			this.markedParagraph = currentlyMarkedElement;
		}
	}

	private handleNoTextSelected() {
		this.hidePopover();
		this.markedText = null;
		this.markedParagraph = null;
	}

	private showPopover(ev: MouseEvent) {
		const popoverRect = this.popover.getBoundingClientRect();
		const popoverX = ev.pageX - popoverRect.width / 2;
		const popoverY = ev.pageY - popoverRect.height * 1.5;
		this.popover.style.zIndex = '50';
		this.popover.style.top = `${popoverY}px`;
		this.popover.style.left = `${popoverX}px`;
		this.popover.classList.remove('hidden')
	}

	private hidePopover() {
		this.popover.classList.add('hidden')
	}

	private cloneBookmarkButton(nodeId: string) {
		const bookmarkClone = this.bookmarkButton.cloneNode(true) as HTMLElement;
		bookmarkClone.id = `bm__${nodeId}`;
		bookmarkClone.style.position = 'absolute';
		bookmarkClone.style.top = '-5px';
		bookmarkClone.style.left = '-45px';
		bookmarkClone.title = 'Remove this bookmark';
		bookmarkClone.addEventListener('click', (ev) => this.removeLocalBookmark(ev));
		return bookmarkClone;
	}

	private prependSavedBookmarkButton(nodeId: string) {
		const bookmarkClone = this.cloneBookmarkButton(nodeId);
		const savedBookmarks = Bookmark.getLocalBookmarks();
		savedBookmarks.forEach((savedBookmark) => {
			if (savedBookmark.node === nodeId && savedBookmark.path === window.location.pathname) {
				this.$query(`#${nodeId}`).prepend(bookmarkClone);
			}
		});
	}

	/**
	 * @desc 	Removes this paragraph's BM entry. It checks whether the clicked element
	 * 				was the `svg` or it's child element `path`
	 * @param ev
	 */
	private removeLocalBookmark(ev: MouseEvent) {
		const clickedElement = ev.target as HTMLElement;
		const clickedButton =
			clickedElement.nodeName === 'path'
				? (clickedElement.parentNode.parentNode as HTMLElement)
				: clickedElement.nodeName === 'svg'
					? (clickedElement.parentNode as HTMLElement)
					: clickedElement;
		Bookmark.deleteLocalBookmark({
			node: clickedButton.id.split('bm__')[1],
			path: window.location.pathname,
		});
		this.removeBookmarkButton(clickedButton.id);
	}

	private removeBookmarkButton(clickedBookmarkId: string) {
		this.$query(`#${clickedBookmarkId}`).remove();
	}

	private isMarkableElement(markableElementId: string) {
		return this.getMarkableElementIds().includes(markableElementId)
	}

	private getMarkableElementIds(): string[] {
		let markableElementIds: string[] = [];
		for (let selector in this.markableElements) {
			this.markableElements[selector].forEach((node) => {
				markableElementIds.push((node as HTMLElement).id)
			});
		}
		return markableElementIds;
	}

}
