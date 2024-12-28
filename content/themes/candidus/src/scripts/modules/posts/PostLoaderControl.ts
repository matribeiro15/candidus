import Control, { ControlStruct } from '../../core/base/Control';
import TextClipper from '../text/TextClipper';

interface PostLoaderControlSelectors {
	loadMoreButton: string;
	postContainer: string;
	feedContainer: string;
}
export default class PostLoaderControl extends Control implements ControlStruct {
	/**
	 * The button element for loading more posts.
	 */
	loadMoreButton: HTMLButtonElement;

	/**
	 * The container element for the grid view of the posts.
	 */
	postContainer: HTMLElement;

	/**
	 * The container element for the feed view of the posts.
	 */
	feedContainer: HTMLElement;

	/**
	 * The link element pointing to the next page.
	 */
	nextElement: HTMLLinkElement;

	/**
	 * Creates an instance of PostLoaderControl.
	 */
	constructor({ loadMoreButton, postContainer, feedContainer }: PostLoaderControlSelectors) {
		super(loadMoreButton);
		this.loadMoreButton = this.$query(loadMoreButton) as HTMLButtonElement;
		this.postContainer = this.$query(postContainer);
		this.feedContainer = this.$query(feedContainer);
		this.nextElement = document.querySelector('link[rel=next]');
	}

	/**
	 * Initializes the control by adding an event listener to the load more button
	 * and removing it if there is no next page.
	 */
	public init() {
		if (this.valid && !this.nextElement) {
			this.loadMoreButton.remove();
		}
		if (this.valid) {
			this.loadMoreButton.addEventListener('click', () => this.loadMorePosts());
		}
	}

	/**
	 * Loads the next page of posts and appends them to the container.
	 */
	private async loadMorePosts() {
		if (this.nextElement) {
			return this.loadAndAppendPosts();
		}
		this.loadMoreButton.remove();
	}

	/**
	 * Fetches the next page of posts.
	 * @returns {Promise<Document>} The document of the next page.
	 */
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

	/**
	 * Loads the next page of posts and appends them to the container.
	 */
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

