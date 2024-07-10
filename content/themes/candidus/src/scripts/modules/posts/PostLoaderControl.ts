import Control, { ControlStruct } from '../../core/base/Control';
import TextClipper from '../text/TextClipper';

interface PostLoaderControlSelectors {
	loadMoreButton: string;
	postContainer: string;
	feedContainer: string;
}
export default class PostLoaderControl extends Control implements ControlStruct {
	loadMoreButton: HTMLButtonElement;
	postContainer: HTMLElement;
	feedContainer: HTMLElement;
	nextElement: HTMLLinkElement;

	constructor({ loadMoreButton, postContainer, feedContainer }: PostLoaderControlSelectors) {
		super(loadMoreButton);
		this.loadMoreButton = this.$query(loadMoreButton) as HTMLButtonElement;
		this.postContainer = this.$query(postContainer);
		this.feedContainer = this.$query(feedContainer);
		this.nextElement = document.querySelector('link[rel=next]');
	}

	public init() {
		if (this.valid && !this.nextElement) {
			this.loadMoreButton.remove();
		}
		if (this.valid) {
			this.loadMoreButton.addEventListener('click', () => this.loadMorePosts());
		}
	}

	private async loadMorePosts() {
		if (this.nextElement) {
			return this.loadAndAppendPosts();
		}
		this.loadMoreButton.remove();
	}

	private fetchNextPage(): Promise<Document> {
		return new Promise((resolve, reject) => {
			const xhr = new window.XMLHttpRequest();
			xhr.responseType = 'document';
			// @ts-ignore
			xhr.addEventListener('load', (event) => resolve(event.target.response));
			xhr.open('GET', this.nextElement.href);
			xhr.send(null);
		});
	}

	private async loadAndAppendPosts() {
		this.loadMoreButton.setAttribute('disabled', '');
		const nextPage = await this.fetchNextPage();
		const postCards = nextPage.querySelectorAll('.postcard');
		const postFeeds = nextPage.querySelectorAll('.postfeed');
		const postExcerptClipper = new TextClipper(nextPage.querySelectorAll('.postcard__body'), 25);
		postExcerptClipper.truncate();

		postCards.forEach((card) => this.postContainer.appendChild(document.importNode(card, true)));
		postFeeds.forEach((feed) => this.feedContainer.appendChild(document.importNode(feed, true)));
		this.nextElement = nextPage.querySelector('link[rel=next]');
		this.loadMoreButton.removeAttribute('disabled');
	}
}
