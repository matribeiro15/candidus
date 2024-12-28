import Control, { ControlStruct } from '../../core/base/Control';

type SocialPostElement =
	| 'postTitle'
	| 'postAbstract'
	| 'shareButtonFacebook'
	| 'shareButtonTwitter'
	| 'shareButtonLinkedin'
	| 'shareButtonReddit'
	| 'shareButtonAny';

/**
 * A class representing a social media sharing control on a post.
 * @class
 */
export default class PostSocialControl extends Control implements ControlStruct {
	/**
	 * The window options for the share pop-up window.
	 */
	private windowOptions = 'menubar=no,status=no,height=750,width=500';

	/**
	 * The post title element.
	 */
	private postTitle: HTMLElement;

	/**
	 * The post abstract element.
	 */
	private postAbstract: HTMLElement | null;

	/**
	 * The share button for Facebook.
	 */
	private shareButtonFacebook: HTMLElement;

	/**
	 * The share button for Twitter.
	 */
	private shareButtonTwitter: HTMLElement;

	/**
	 * The share button for Reddit.
	 */
	private shareButtonReddit: HTMLElement;

	/**
	 * The share button for LinkedIn.
	 */
	private shareButtonLinkedin: HTMLElement;

	/**
	 * The share button for any other platform.
	 */
	private shareButtonAny: HTMLElement;

	/**
	 * The constructor for the social media sharing control on a post.
	 */
	constructor({
		postTitle,
		postAbstract,
		shareButtonFacebook,
		shareButtonTwitter,
		shareButtonLinkedin,
		shareButtonReddit,
		shareButtonAny,
	}: Record<SocialPostElement, string>) {
		super(
			postTitle,
			shareButtonAny,
			shareButtonFacebook,
			shareButtonLinkedin,
			shareButtonReddit,
			shareButtonLinkedin
		);
		this.postTitle = this.$query(postTitle);
		this.postAbstract = this.$query(postAbstract);
		this.shareButtonFacebook = this.$query(shareButtonFacebook);
		this.shareButtonTwitter = this.$query(shareButtonTwitter);
		this.shareButtonReddit = this.$query(shareButtonReddit);
		this.shareButtonLinkedin = this.$query(shareButtonLinkedin);
		this.shareButtonAny = this.$query(shareButtonAny);
	}

	/**
	 * Initializes the control by adding event listeners to the share buttons.
	 */
	async init() {
		if (this.valid) {
			this.initFacebookButton();
			this.initTwitterButton();
			this.initRedditButton();
			this.initLinkedinButton();
			this.initOrHideShareButtonAny();
		}
	}

	/**
	 * Initializes the Facebook share button.
	 */
	private initFacebookButton() {
		this.shareButtonFacebook.addEventListener('click', () => this.shareToFacebook());
	}

	/**
	 * Initializes the Twitter share button.
	 */
	private initTwitterButton() {
		this.shareButtonTwitter.addEventListener('click', () => this.shareToTwitter());
	}

	/**
	 * Initializes the Reddit share button.
	 */
	private initRedditButton() {
		this.shareButtonReddit.addEventListener('click', () => this.shareToReddit());
	}

	/**
	 * Initializes the LinkedIn share button.
	 */
	private initLinkedinButton() {
		this.shareButtonLinkedin.addEventListener('click', () => this.shareToLinkedin());
	}

	/**
	 * Initializes or hides the any other platform share button.
	 */
	private initOrHideShareButtonAny() {
		if (navigator.share) {
			this.shareButtonAny.addEventListener('click', () => this.shareToAny());
		} else {
			this.shareButtonAny.remove();
		}
	}

	/**
	 * Shares the post to Facebook.
	 */
	private shareToFacebook() {
		window.open(
			`https://www.facebook.com/sharer.php?u=${window.location.href}`,
			'_blank',
			this.windowOptions
		);
	}

	/**
	 * Shares the post to Twitter.
	 */
	private shareToTwitter() {
		window.open(
			`
			https://twitter.com/intent/tweet?text=Read "${this.postTitle?.innerHTML}" at&url=${window.location.href}&`,
			'_blank',
			this.windowOptions
		);
	}

	/**
	 * Shares the post to Reddit.
	 */
	private shareToReddit() {
		window.open(
			`https://www.reddit.com/submit?url=${window.location.href}&title=${this.postTitle?.innerHTML}`,
			'_blank',
			this.windowOptions
		);
	}

	/**
	 * Shares the post to LinkedIn.
	 */
	private shareToLinkedin() {
		window.open(
			`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
			'_blank',
			this.windowOptions
		);
	}

	/**
	 * Shares the post to any other platform.
	 */
	private shareToAny() {
		navigator.share({
			title: this.postTitle?.innerText,
			text: this.postAbstract?.innerText || '',
			url: window.location.href,
		});
	}
}

